const DB_NAME = "ironlog_db";
const DB_VERSION = 1;

let dbInstance = null;

// Mock database for environments where indexedDB is not available (like JSDOM/Jest tests)
class MockRequest {
  constructor(result = null) {
    this.result = result;
    setTimeout(() => {
      if (this.onsuccess) this.onsuccess();
    }, 0);
  }
}

class MockStore {
  constructor() {
    this.data = new Map();
  }
  get(key) {
    return new MockRequest(this.data.get(key));
  }
  put(value, key) {
    const k = key !== undefined ? key : (value?.id || value?.email);
    this.data.set(k, value);
    return new MockRequest(k);
  }
  delete(key) {
    this.data.delete(key);
    return new MockRequest();
  }
  getAll() {
    return new MockRequest(Array.from(this.data.values()));
  }
  clear() {
    this.data.clear();
    return new MockRequest();
  }
}

class MockTransaction {
  constructor(store) {
    this.store = store;
    setTimeout(() => {
      if (this.oncomplete) this.oncomplete();
    }, 0);
  }
  objectStore() {
    return this.store;
  }
}

class MockDb {
  constructor() {
    this.stores = {
      users: new MockStore(),
      workouts: new MockStore(),
      bodyLog: new MockStore(),
      goals: new MockStore(),
      kv: new MockStore(),
    };
  }
  transaction(storeNames) {
    const name = Array.isArray(storeNames) ? storeNames[0] : storeNames;
    const store = this.stores[name] || new MockStore();
    return new MockTransaction(store);
  }
}

export function getDb() {
  if (typeof indexedDB === "undefined") {
    if (!dbInstance) {
      dbInstance = new MockDb();
    }
    return Promise.resolve(dbInstance);
  }
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }
      if (!db.objectStoreNames.contains("workouts")) {
        db.createObjectStore("workouts", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("bodyLog")) {
        db.createObjectStore("bodyLog", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("goals")) {
        db.createObjectStore("goals", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("kv")) {
        db.createObjectStore("kv");
      }
    };

    request.onsuccess = (e) => {
      dbInstance = e.target.result;
      resolve(dbInstance);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

export function dbGet(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function dbPut(db, storeName, value, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = key !== undefined ? store.put(value, key) : store.put(value);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export function dbDelete(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export function dbGetAll(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

export function dbClear(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function performMigration(db) {
  const isMigrated = await dbGet(db, "kv", "migrated_from_localstorage");
  if (isMigrated) return;

  const loadLocal = (k) => {
    try {
      if (typeof localStorage === "undefined") return null;
      const item = localStorage.getItem(k);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  // Migrate users
  const localUsers = loadLocal("il_users");
  if (localUsers) {
    const tx = db.transaction("users", "readwrite");
    const store = tx.objectStore("users");
    for (const [email, u] of Object.entries(localUsers)) {
      store.put({ email, name: u.name, pass: u.pass });
    }
    await new Promise((resolve) => { tx.oncomplete = resolve; tx.onerror = resolve; });
  }

  // Migrate workouts
  const localWorkouts = loadLocal("il_workouts");
  if (Array.isArray(localWorkouts)) {
    const tx = db.transaction("workouts", "readwrite");
    const store = tx.objectStore("workouts");
    for (const w of localWorkouts) {
      if (w && w.id) store.put(w);
    }
    await new Promise((resolve) => { tx.oncomplete = resolve; tx.onerror = resolve; });
  }

  // Migrate bodyLog
  const localBody = loadLocal("il_body");
  if (Array.isArray(localBody)) {
    const tx = db.transaction("bodyLog", "readwrite");
    const store = tx.objectStore("bodyLog");
    for (const b of localBody) {
      if (b && b.id) store.put(b);
    }
    await new Promise((resolve) => { tx.oncomplete = resolve; tx.onerror = resolve; });
  }

  // Migrate goals
  const localGoals = loadLocal("il_goals");
  if (Array.isArray(localGoals)) {
    const tx = db.transaction("goals", "readwrite");
    const store = tx.objectStore("goals");
    for (const g of localGoals) {
      if (g && g.id) store.put(g);
    }
    await new Promise((resolve) => { tx.oncomplete = resolve; tx.onerror = resolve; });
  }

  // Migrate kv pairs
  const kvKeys = {
    "il_prs": "prs",
    "il_custom_ex": "customExercises",
    "il_schedule": "scheduledWorkouts",
    "il_settings": "settings",
    "il_custom_templates": "customTemplates",
    "il_active": "active",
    "il_start_time": "startTime",
    "il_timer_on": "timerOn",
    "il_current": "currentUser"
  };

  const txKv = db.transaction("kv", "readwrite");
  const storeKv = txKv.objectStore("kv");
  for (const [localKey, dbKey] of Object.entries(kvKeys)) {
    const val = loadLocal(localKey);
    if (val !== null && val !== undefined) {
      storeKv.put(val, dbKey);
    }
  }
  storeKv.put(true, "migrated_from_localstorage");
  await new Promise((resolve) => { txKv.oncomplete = resolve; txKv.onerror = resolve; });

  // Clean up localStorage keys
  const keysToRemove = [
    "il_users", "il_workouts", "il_prs", "il_body", "il_goals", "il_custom_ex", 
    "il_schedule", "il_settings", "il_custom_templates", "il_active", 
    "il_start_time", "il_timer_on", "il_current"
  ];
  for (const k of keysToRemove) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.removeItem(k);
      }
    } catch (e) {}
  }
}

export async function initDb() {
  const db = await getDb();
  await performMigration(db);
  return db;
}
