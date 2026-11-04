import { useState, useEffect } from "react";
import { Icon } from "./Icons";
import {
  requestGoogleAccessToken,
  uploadToGoogleDrive,
  downloadFromGoogleDrive,
  uploadToWebDAV,
  downloadFromWebDAV,
  createDatabaseSnapshot,
  restoreDatabaseSnapshot,
  encryptPayload,
  decryptPayload,
  DEFAULT_GOOGLE_CLIENT_ID,
  sanitizeClientId,
} from "../utils/cloudSync";

export default function CloudSyncCard({ store }) {
  const { db, settings, saveSettings } = store;

  // Persistent settings state
  const provider = settings?.cloudSyncProvider || "gdrive";
  const clientId = settings?.googleClientId || DEFAULT_GOOGLE_CLIENT_ID;
  const autoSync = settings?.autoCloudSync || false;
  const lastSync = settings?.lastCloudSync || null;
  const webdavUrl = settings?.webdavUrl || "";
  const webdavUser = settings?.webdavUser || "";

  // Component local state
  const [googleToken, setGoogleToken] = useState(null);
  const [passphrase, setPassphrase] = useState(settings?.cloudPassphrase || "");
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error' | 'info', message: '' }
  const [tempClientId, setTempClientId] = useState(clientId || DEFAULT_GOOGLE_CLIENT_ID);
  const [tempWebdavUrl, setTempWebdavUrl] = useState(webdavUrl);
  const [tempWebdavUser, setTempWebdavUser] = useState(webdavUser);
  const [tempWebdavPass, setTempWebdavPass] = useState("");

  useEffect(() => {
    setTempClientId(settings?.googleClientId || DEFAULT_GOOGLE_CLIENT_ID);
  }, [settings?.googleClientId]);

  const showStatus = (type, message, timeout = 5000) => {
    setStatus({ type, message });
    if (timeout > 0) {
      setTimeout(() => {
        setStatus((prev) => (prev?.message === message ? null : prev));
      }, timeout);
    }
  };

  const setProvider = (p) => {
    saveSettings({ ...settings, cloudSyncProvider: p });
  };

  const handleSaveClientId = () => {
    const cleaned = sanitizeClientId(tempClientId || DEFAULT_GOOGLE_CLIENT_ID);
    setTempClientId(cleaned);
    saveSettings({
      ...settings,
      googleClientId: cleaned,
    });
    showStatus("success", "Google Client ID saved locally.");
  };

  const handleSavePassphrase = (val) => {
    setPassphrase(val);
    saveSettings({
      ...settings,
      cloudPassphrase: val,
    });
  };

  const handleConnectGoogle = async () => {
    try {
      const targetId = sanitizeClientId(tempClientId || DEFAULT_GOOGLE_CLIENT_ID);
      if (!targetId) {
        showStatus("error", "Please provide a Google OAuth Client ID first.");
        return;
      }
      setIsSyncing(true);
      showStatus("info", "Opening Google sign-in window...");
      const authResult = await requestGoogleAccessToken(targetId);
      setGoogleToken(authResult.accessToken);
      saveSettings({
        ...settings,
        googleClientId: targetId,
      });
      showStatus("success", "Connected to Google Drive! You can now Sync or Restore.");
    } catch (err) {
      console.error(err);
      showStatus("error", err.message || "Failed to authenticate with Google.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnectGoogle = () => {
    setGoogleToken(null);
    showStatus("info", "Disconnected Google Drive session.");
  };

  // Push / Upload to Cloud
  const handleSyncToCloud = async () => {
    if (!db) {
      showStatus("error", "Database is not ready.");
      return;
    }

    try {
      setIsSyncing(true);
      showStatus("info", "Preparing local database snapshot...");
      const rawSnapshot = await createDatabaseSnapshot(db);
      const snapshotString = JSON.stringify(rawSnapshot, null, 2);

      showStatus("info", passphrase ? "Applying AES-GCM-256 Zero-Knowledge Encryption..." : "Packing sync payload...");
      const payloadToUpload = await encryptPayload(snapshotString, passphrase);

      if (provider === "gdrive") {
        let token = googleToken;
        if (!token) {
          showStatus("info", "Requesting Google authorization...");
          const auth = await requestGoogleAccessToken(tempClientId.trim());
          token = auth.accessToken;
          setGoogleToken(token);
        }

        showStatus("info", "Uploading encrypted backup to Google Drive AppData...");
        await uploadToGoogleDrive(token, payloadToUpload);
      } else if (provider === "webdav") {
        if (!tempWebdavUrl.trim()) {
          throw new Error("WebDAV Server URL is required.");
        }
        showStatus("info", "Uploading to WebDAV server...");
        await uploadToWebDAV(
          {
            url: tempWebdavUrl.trim(),
            username: tempWebdavUser.trim(),
            password: tempWebdavPass,
          },
          payloadToUpload
        );
      }

      const syncTime = new Date().toISOString();
      saveSettings({
        ...settings,
        lastCloudSync: syncTime,
        webdavUrl: tempWebdavUrl.trim(),
        webdavUser: tempWebdavUser.trim(),
      });

      showStatus("success", `Cloud Sync complete! (${passphrase ? "🔒 AES-256 Encrypted" : "Plaintext"})`);
    } catch (err) {
      console.error(err);
      showStatus("error", err.message || "Cloud sync failed.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Pull / Restore from Cloud
  const handleRestoreFromCloud = async () => {
    if (!db) {
      showStatus("error", "Database is not ready.");
      return;
    }

    const confirmRestore = window.confirm(
      "⚠️ Warning: Restoring from cloud will replace your local workouts, PRs, and settings with the cloud backup. Do you want to proceed?"
    );
    if (!confirmRestore) return;

    try {
      setIsRestoring(true);
      let downloadedContent = "";

      if (provider === "gdrive") {
        let token = googleToken;
        if (!token) {
          showStatus("info", "Requesting Google authorization...");
          const auth = await requestGoogleAccessToken(tempClientId.trim());
          token = auth.accessToken;
          setGoogleToken(token);
        }

        showStatus("info", "Downloading sync file from Google Drive AppData...");
        const result = await downloadFromGoogleDrive(token);
        downloadedContent = result.content;
      } else if (provider === "webdav") {
        if (!tempWebdavUrl.trim()) {
          throw new Error("WebDAV Server URL is required.");
        }
        showStatus("info", "Downloading from WebDAV server...");
        const result = await downloadFromWebDAV({
          url: tempWebdavUrl.trim(),
          username: tempWebdavUser.trim(),
          password: tempWebdavPass,
        });
        downloadedContent = result.content;
      }

      showStatus("info", "Decrypting cloud payload...");
      const decryptedString = await decryptPayload(downloadedContent, passphrase);
      const parsedBackup = JSON.parse(decryptedString);

      showStatus("info", "Restoring database tables...");
      await restoreDatabaseSnapshot(db, parsedBackup);

      showStatus("success", "Database restored successfully! Reloading in 2 seconds...");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error(err);
      showStatus("error", err.message || "Cloud restore failed.");
    } finally {
      setIsRestoring(false);
    }
  };

  const formatLastSync = (iso) => {
    if (!iso) return "Never synced";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="panel mb20">
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="sec-lbl" style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="cloud" size={16} />
            <span>USER-OWNED CLOUD SYNC (ZERO-BACKEND)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {googleToken ? (
              <span className="badge-pill" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22C55E", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                🟢 Connected
              </span>
            ) : (
              <span className="badge-pill" style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>
                ⚪ Not Connected
              </span>
            )}
          </div>
        </div>

        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5, marginBottom: 16 }}>
          Sync your training logs and PRs across phones, laptops, and tablets using <strong>your own personal cloud storage</strong>. No remote servers, no central database, and zero telemetry.
        </p>

        {/* Provider Segmented Switcher */}
        <div className="toggle mb16" style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <button
            type="button"
            className={`toggle-btn ${provider === "gdrive" ? "active" : ""}`}
            onClick={() => setProvider("gdrive")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <span>Google Drive (AppData)</span>
          </button>
          <button
            type="button"
            className={`toggle-btn ${provider === "webdav" ? "active" : ""}`}
            onClick={() => setProvider("webdav")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
          >
            <span>WebDAV (Nextcloud)</span>
          </button>
        </div>

        {/* Status Message Notification */}
        {status && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              fontSize: 12,
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background:
                status.type === "success"
                  ? "rgba(34, 197, 94, 0.12)"
                  : status.type === "error"
                  ? "rgba(239, 68, 68, 0.12)"
                  : "var(--accent-subtle)",
              color:
                status.type === "success"
                  ? "#22C55E"
                  : status.type === "error"
                  ? "#EF4444"
                  : "var(--accent)",
              border: `1px solid ${
                status.type === "success"
                  ? "rgba(34, 197, 94, 0.3)"
                  : status.type === "error"
                  ? "rgba(239, 68, 68, 0.3)"
                  : "var(--accent-border)"
              }`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {status.type === "success" ? "✓" : status.type === "error" ? "⚠" : "ℹ"}
              <span>{status.message}</span>
            </div>
            <button
              className="btn-ghost"
              style={{ fontSize: 13, padding: "2px 6px" }}
              onClick={() => setStatus(null)}
            >
              ✕
            </button>
          </div>
        )}

        {/* Google Drive Configuration Form */}
        {provider === "gdrive" && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                Google OAuth Client ID
              </label>
              <button
                type="button"
                className="btn-ghost"
                style={{ fontSize: 11, color: "var(--accent)", textDecoration: "underline", padding: 0 }}
                onClick={() => setShowGuideModal(true)}
              >
                How to get a Client ID (2-min guide)
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input
                type="text"
                className="inp"
                placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                value={tempClientId}
                onChange={(e) => setTempClientId(e.target.value)}
                style={{ fontSize: 12, flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-out"
                style={{ padding: "8px 12px", fontSize: 12 }}
                onClick={handleSaveClientId}
              >
                Save
              </button>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {!googleToken ? (
                <button
                  type="button"
                  className="btn btn-acc"
                  style={{ flex: 1, padding: 10, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={handleConnectGoogle}
                  disabled={isSyncing}
                >
                  <Icon name="cloud" size={15} />
                  <span>Connect Google Account</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ flex: 1, padding: 10, fontSize: 13 }}
                  onClick={handleDisconnectGoogle}
                >
                  Disconnect Google
                </button>
              )}
            </div>
          </div>
        )}

        {/* WebDAV Configuration Form */}
        {provider === "webdav" && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div className="mb10">
              <label style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 4 }}>
                WebDAV Server URL
              </label>
              <input
                type="text"
                className="inp"
                placeholder="https://nextcloud.example.com/remote.php/dav/files/user/ironlog/"
                value={tempWebdavUrl}
                onChange={(e) => setTempWebdavUrl(e.target.value)}
                style={{ fontSize: 12 }}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 4 }}>
                  Username
                </label>
                <input
                  type="text"
                  className="inp"
                  placeholder="Username"
                  value={tempWebdavUser}
                  onChange={(e) => setTempWebdavUser(e.target.value)}
                  style={{ fontSize: 12 }}
                />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: 4 }}>
                  App Password
                </label>
                <input
                  type="password"
                  className="inp"
                  placeholder="App Password"
                  value={tempWebdavPass}
                  onChange={(e) => setTempWebdavPass(e.target.value)}
                  style={{ fontSize: 12 }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Zero-Knowledge Encryption Passphrase Input */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="lock" size={14} />
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
                Zero-Knowledge Encryption Passphrase (Optional)
              </label>
            </div>
            <span style={{ fontSize: 11, color: passphrase ? "var(--accent)" : "var(--muted)", fontWeight: 600 }}>
              {passphrase ? "🔒 AES-256 Enabled" : "Plaintext Mode"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type={showPassphrase ? "text" : "password"}
              className="inp"
              placeholder="Enter a secret passphrase to encrypt cloud backups..."
              value={passphrase}
              onChange={(e) => handleSavePassphrase(e.target.value)}
              style={{ fontSize: 12, flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-out"
              style={{ padding: "8px 12px", fontSize: 12 }}
              onClick={() => setShowPassphrase(!showPassphrase)}
            >
              {showPassphrase ? "Hide" : "Show"}
            </button>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, lineHeight: 1.4 }}>
            If set, your entire database is encrypted in your browser using <strong>AES-GCM-256</strong> before uploading. Even your cloud provider cannot read your workouts.
          </div>
        </div>

        {/* Cloud Actions Buttons (Push / Pull) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <button
            type="button"
            className="btn btn-acc"
            style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            onClick={handleSyncToCloud}
            disabled={isSyncing || isRestoring}
          >
            <Icon name="cloud-upload" size={16} />
            <span>{isSyncing ? "Syncing..." : "Sync to Cloud (Push)"}</span>
          </button>
          <button
            type="button"
            className="btn btn-out"
            style={{ padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            onClick={handleRestoreFromCloud}
            disabled={isSyncing || isRestoring}
          >
            <Icon name="cloud-download" size={16} />
            <span>{isRestoring ? "Restoring..." : "Restore (Pull)"}</span>
          </button>
        </div>

        {/* Auto-Sync Toggle & Last Synced Timestamp */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--text)", cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => saveSettings({ ...settings, autoCloudSync: e.target.checked })}
              style={{ cursor: "pointer" }}
            />
            <span>Auto-sync when finishing workouts</span>
          </label>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>
            Last synced: <strong>{formatLastSync(lastSync)}</strong>
          </div>
        </div>
      </div>

      {/* Google Cloud Client ID Setup Guide Modal */}
      {showGuideModal && (
        <div className="modal-ov" onClick={() => setShowGuideModal(false)}>
          <div className="modal" style={{ maxWidth: 500 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-title">GET A FREE GOOGLE CLIENT ID</div>
              <button className="btn-ghost" onClick={() => setShowGuideModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>
              <p className="mb12">
                Because IronLog is <strong>100% serverless</strong> with zero corporate backends, you authenticate directly with Google using your own OAuth App credential. It is 100% free and takes 2 minutes:
              </p>
              <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
                <li className="mb8">
                  Go to <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>Google Cloud Console</a> and create a new project (e.g. <em>IronLog Sync</em>).
                </li>
                <li className="mb8">
                  Navigate to <strong>APIs & Services → Library</strong> and enable <strong>Google Drive API</strong>.
                </li>
                <li className="mb8">
                  In <strong>APIs & Services → Credentials</strong>, click <strong>Create Credentials → OAuth client ID</strong>.
                </li>
                <li className="mb8">
                  Select <strong>Application type: Web application</strong>.
                </li>
                <li className="mb8">
                  Under <strong>Authorized JavaScript origins</strong>, add:
                  <div style={{ background: "var(--surface2)", padding: "4px 8px", borderRadius: 4, fontFamily: "monospace", fontSize: 11, margin: "4px 0" }}>
                    {window.location.origin}
                  </div>
                </li>
                <li>
                  Click <strong>Create</strong>, copy the generated <strong>Client ID</strong>, and paste it into IronLog!
                </li>
              </ol>
              <button
                type="button"
                className="btn btn-acc"
                style={{ width: "100%", padding: 10 }}
                onClick={() => setShowGuideModal(false)}
              >
                Got It!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

