import { dbGetAll, dbGet, dbPut, dbClear } from "./db";

export const CLOUD_SYNC_FILENAME = "ironlog_cloud_sync.enc";
export const CLOUD_SYNC_PLAINTEXT_FILENAME = "ironlog_cloud_sync.json";

// ==========================================
// 1. Web Crypto API: Zero-Knowledge AES-GCM-256
// ==========================================

export async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptPayload(plainText, passphrase) {
  if (!passphrase) {
    // If no passphrase is set, return serialized plaintext
    return plainText;
  }

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);

  const enc = new TextEncoder();
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plainText)
  );

  const envelope = {
    version: 1,
    algo: "AES-GCM-256",
    salt: Array.from(salt),
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(cipherBuffer)),
  };

  return JSON.stringify(envelope);
}

export async function decryptPayload(content, passphrase) {
  // If not encrypted as envelope, return as raw text
  let parsed = null;
  try {
    parsed = typeof content === "string" ? JSON.parse(content) : content;
  } catch {
    return content;
  }

  if (!parsed || parsed.algo !== "AES-GCM-256" || !parsed.data) {
    // Content is plain JSON
    return typeof content === "string" ? content : JSON.stringify(content);
  }

  if (!passphrase) {
    throw new Error("This cloud backup is encrypted with a passphrase. Please enter your encryption passphrase.");
  }

  try {
    const salt = new Uint8Array(parsed.salt);
    const iv = new Uint8Array(parsed.iv);
    const data = new Uint8Array(parsed.data);
    const key = await deriveKey(passphrase, salt);

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (err) {
    throw new Error("Decryption failed. Please verify your encryption passphrase.");
  }
}

// ==========================================
// 2. Database Snapshot & Restore Engine
// ==========================================

export async function createDatabaseSnapshot(db) {
  if (!db) throw new Error("Database not initialized.");

  const backup = {
    ironlog_version: "2.0",
    created_at: new Date().toISOString(),
  };

  // 1. Users
  const usersArray = await dbGetAll(db, "users");
  const usersObj = {};
  usersArray.forEach((u) => {
    usersObj[u.email] = { name: u.name, pass: u.pass };
  });
  backup["il_users"] = JSON.stringify(usersObj);

  // 2. Workouts
  const workoutsArray = await dbGetAll(db, "workouts");
  backup["il_workouts"] = JSON.stringify(workoutsArray);

  // 3. Body Log
  const bodyArray = await dbGetAll(db, "bodyLog");
  backup["il_body"] = JSON.stringify(bodyArray);

  // 4. Goals
  const goalsArray = await dbGetAll(db, "goals");
  backup["il_goals"] = JSON.stringify(goalsArray);

  // 5. Singletons from kv store
  const kvKeys = {
    prs: "il_prs",
    customExercises: "il_custom_ex",
    scheduledWorkouts: "il_schedule",
    settings: "il_settings",
    customTemplates: "il_custom_templates",
    active: "il_active",
    startTime: "il_start_time",
    timerOn: "il_timer_on",
    currentUser: "il_current",
  };

  for (const [dbKey, localKey] of Object.entries(kvKeys)) {
    const val = await dbGet(db, "kv", dbKey);
    if (val !== undefined && val !== null) {
      backup[localKey] = JSON.stringify(val);
    }
  }

  return backup;
}

export async function restoreDatabaseSnapshot(db, backup) {
  if (!db) throw new Error("Database not initialized.");
  if (typeof backup !== "object" || backup === null) {
    throw new Error("Invalid backup data format.");
  }

  const keys = Object.keys(backup);
  const hasIronlogData = keys.some((k) => k.startsWith("il_"));
  if (!hasIronlogData) {
    throw new Error("No valid IronLog records found in cloud backup.");
  }

  // Clear existing tables
  await dbClear(db, "users");
  await dbClear(db, "workouts");
  await dbClear(db, "bodyLog");
  await dbClear(db, "goals");
  await dbClear(db, "kv");

  const safeParse = (str, def) => {
    try {
      return str ? JSON.parse(str) : def;
    } catch {
      return def;
    }
  };

  // Restore users
  const backupUsers = safeParse(backup["il_users"], {});
  for (const [email, u] of Object.entries(backupUsers)) {
    await dbPut(db, "users", { email, name: u.name, pass: u.pass });
  }

  // Restore workouts
  const backupWorkouts = safeParse(backup["il_workouts"], []);
  for (const w of backupWorkouts) {
    if (w && w.id) await dbPut(db, "workouts", w);
  }

  // Restore body
  const backupBody = safeParse(backup["il_body"], []);
  for (const b of backupBody) {
    if (b && b.id) await dbPut(db, "bodyLog", b);
  }

  // Restore goals
  const backupGoals = safeParse(backup["il_goals"], []);
  for (const g of backupGoals) {
    if (g && g.id) await dbPut(db, "goals", g);
  }

  // Restore kv store
  const kvKeys = {
    il_prs: "prs",
    il_custom_ex: "customExercises",
    il_schedule: "scheduledWorkouts",
    il_settings: "settings",
    il_custom_templates: "customTemplates",
    il_active: "active",
    il_start_time: "startTime",
    il_timer_on: "timerOn",
    il_current: "currentUser",
  };

  for (const [localKey, dbKey] of Object.entries(kvKeys)) {
    if (backup[localKey] !== undefined) {
      const val = safeParse(backup[localKey], null);
      if (val !== null && val !== undefined) {
        await dbPut(db, "kv", val, dbKey);
      }
    }
  }

  await dbPut(db, "kv", true, "migrated_from_localstorage");
  return true;
}

// ==========================================
// 3. Google Identity Services & Drive REST API
// ==========================================

export function loadGoogleIdentityServices() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve(null);
    if (window.google?.accounts?.oauth2) return resolve(window.google);

    const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", (e) => reject(new Error("Failed to load Google Identity Services.")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Network error loading Google Identity script."));
    document.head.appendChild(script);
  });
}

export const DEFAULT_GOOGLE_CLIENT_ID =
  "186337090416-rveb2mgcs8et10io3q7221ubtinolb9c.apps.googleusercontent.com";

export function sanitizeClientId(rawId = "") {
  return rawId
    .replace(/[\u2010\u2012\u2013\u2014\u2015]/g, "-") // replace unicode hyphens/en-dashes/em-dashes
    .replace(/\s+/g, "") // remove accidental spaces/newlines
    .trim();
}

export async function requestGoogleAccessToken(clientId) {
  const activeClientId = sanitizeClientId(clientId || DEFAULT_GOOGLE_CLIENT_ID);
  if (!activeClientId) {
    throw new Error("Please enter your Google OAuth Client ID.");
  }

  await loadGoogleIdentityServices();

  if (!window.google?.accounts?.oauth2) {
    throw new Error("Google Identity Services not available in this environment.");
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: activeClientId,
        scope: "https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file",
        callback: (resp) => {
          if (resp.error) {
            if (resp.error === "access_denied") {
              reject(
                new Error(
                  "Access Denied (403): Google Cloud Console me 'OAuth consent screen' par scroll karke apna email 'Test Users' list me ADD karein."
                )
              );
            } else {
              reject(new Error(resp.error_description || resp.error || "Google authentication failed."));
            }
          } else if (resp.access_token) {
            resolve({
              accessToken: resp.access_token,
              expiresIn: resp.expires_in,
            });
          } else {
            reject(new Error("No access token returned from Google."));
          }
        },
      });
      tokenClient.requestAccessToken();
    } catch (err) {
      reject(err);
    }
  });
}

export async function findDriveFile(accessToken, filename = CLOUD_SYNC_FILENAME) {
  const query = encodeURIComponent(`name = '${filename}' and 'appDataFolder' in parents and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}&fields=files(id,name,modifiedTime,size)`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Drive API search failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.files && data.files.length > 0 ? data.files[0] : null;
}

export async function uploadToGoogleDrive(accessToken, content, filename = CLOUD_SYNC_FILENAME) {
  const existingFile = await findDriveFile(accessToken, filename);

  if (existingFile && existingFile.id) {
    // Update existing file
    const updateUrl = `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=media`;
    const res = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
      },
      body: content,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Google Drive upload update failed (${res.status}): ${errorText}`);
    }

    const updated = await res.json();
    return { ...updated, modifiedTime: new Date().toISOString() };
  } else {
    // Create new file inside appDataFolder using multipart upload
    const metadata = {
      name: filename,
      parents: ["appDataFolder"],
    };

    const boundary = "ironlog_boundary_" + Math.random().toString(36).substring(2);
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const multipartRequestBody =
      delimiter +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      JSON.stringify(metadata) +
      delimiter +
      "Content-Type: application/octet-stream\r\n\r\n" +
      content +
      closeDelimiter;

    const createUrl = "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart";
    const res = await fetch(createUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Google Drive create file failed (${res.status}): ${errorText}`);
    }

    const created = await res.json();
    return { ...created, modifiedTime: new Date().toISOString() };
  }
}

export async function downloadFromGoogleDrive(accessToken, filename = CLOUD_SYNC_FILENAME) {
  const file = await findDriveFile(accessToken, filename);
  if (!file || !file.id) {
    throw new Error(`No sync backup file found in your Google Drive AppData folder.`);
  }

  const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
  const res = await fetch(downloadUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Drive download failed (${res.status}): ${errorText}`);
  }

  const content = await res.text();
  return { content, fileInfo: file };
}

// ==========================================
// 4. WebDAV Provider (Nextcloud / Self-Hosted)
// ==========================================

export async function uploadToWebDAV({ url, username, password }, content, filename = CLOUD_SYNC_FILENAME) {
  if (!url) throw new Error("Please specify WebDAV server URL.");
  const cleanUrl = url.endsWith("/") ? url : url + "/";
  const targetUrl = cleanUrl + filename;

  const headers = {
    "Content-Type": "application/octet-stream",
  };
  if (username && password) {
    headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
  }

  const res = await fetch(targetUrl, {
    method: "PUT",
    headers,
    body: content,
  });

  if (!res.ok) {
    throw new Error(`WebDAV upload failed with status ${res.status} (${res.statusText})`);
  }

  return { success: true, modifiedTime: new Date().toISOString() };
}

export async function downloadFromWebDAV({ url, username, password }, filename = CLOUD_SYNC_FILENAME) {
  if (!url) throw new Error("Please specify WebDAV server URL.");
  const cleanUrl = url.endsWith("/") ? url : url + "/";
  const targetUrl = cleanUrl + filename;

  const headers = {};
  if (username && password) {
    headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
  }

  const res = await fetch(targetUrl, {
    method: "GET",
    headers,
  });

  if (!res.ok) {
    throw new Error(`WebDAV download failed with status ${res.status} (${res.statusText})`);
  }

  const content = await res.text();
  return { content };
}

