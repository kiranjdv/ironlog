import { useState, useEffect, useRef } from "react";
import { fmtDate } from "../utils/helpers";

export default function SettingsPage({ store }) {
  const { settings, saveSettings } = store;
  const [exportDone, setExportDone] = useState(false);
  const [backupDone, setBackupDone] = useState(false);
  const [persistent, setPersistent] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (navigator.storage && navigator.storage.persisted) {
      navigator.storage.persisted().then(isPersisted => {
        setPersistent(isPersisted);
      });
    }
  }, []);

  const requestPersistence = async () => {
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      setPersistent(isPersisted);
      if (isPersisted) {
        alert("Persistent storage enabled! Your data is protected by the browser.");
      } else {
        alert("Permission denied or not supported by this browser. Tip: Installing the app as a home-screen PWA often auto-grants persistent status.");
      }
    } else {
      alert("Storage persistence API is not supported by this browser.");
    }
  };

  const exportCSV = () => {
    const rows = [["Date", "Exercise", "Muscle", "Set Type", "Weight", "Reps", "Sets", "Done"]];
    store.workouts.forEach(w => w.exercises.forEach(ex => ex.sets.forEach(s => rows.push([w.date, ex.name, ex.muscle, s.type, s.weight, s.reps, s.sets, s.done ? "Yes" : "No"]))));
    const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "ironlog.csv"; a.click(); URL.revokeObjectURL(url);
    setExportDone(true); setTimeout(() => setExportDone(false), 2000);
  };

  const exportJSON = () => {
    try {
      const backup = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("il_")) {
          backup[key] = localStorage.getItem(key);
        }
      }
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ironlog_backup_${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupDone(true);
      setTimeout(() => setBackupDone(false), 2000);
    } catch (err) {
      alert("Failed to export backup: " + err.message);
    }
  };

  const importJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const backup = JSON.parse(evt.target.result);
        if (typeof backup !== "object" || backup === null) {
          alert("Invalid backup file format.");
          return;
        }

        const keys = Object.keys(backup);
        const hasIronlogData = keys.some(key => key.startsWith("il_"));
        if (!hasIronlogData) {
          alert("No valid Ironlog data found in the backup file.");
          return;
        }

        const confirmRestore = window.confirm(
          "Warning: Restoring this backup will overwrite all current logs, PRs, templates, and settings. Do you want to proceed?"
        );
        if (!confirmRestore) return;

        Object.entries(backup).forEach(([key, val]) => {
          if (key.startsWith("il_")) {
            localStorage.setItem(key, val);
          }
        });

        alert("Backup restored successfully! The app will reload now.");
        window.location.reload();
      } catch (err) {
        alert("Failed to parse backup file: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="page">
      <div className="page-title">SETTINGS</div>
      <div className="page-sub">Customize your experience</div>
      <div className="panel mb20">
        <div style={{ padding: 18 }}>
          <div className="sec-lbl">PROFILE</div>
          <div className="flex gap12 mb16">
            <div className="avatar" style={{ width: 52, height: 52, fontSize: 20 }}>{store.user?.name?.[0]?.toUpperCase() || "A"}</div>
            <div><div style={{ fontWeight: 700, fontSize: 15 }}>{store.user?.name}</div><div style={{ color: "var(--muted)", fontSize: 12 }}>{store.currentUser}</div><div style={{ color: "var(--muted)", fontSize: 11, marginTop: 2 }}>{store.workouts.length} workouts</div></div>
          </div>
          {[
            { l: "Weight Unit", s: "Used everywhere", el: <div className="toggle"><button className={`toggle-btn ${settings.unit === "kg" ? "active" : ""}`} onClick={() => saveSettings({ ...settings, unit: "kg" })}>kg</button><button className={`toggle-btn ${settings.unit === "lbs" ? "active" : ""}`} onClick={() => saveSettings({ ...settings, unit: "lbs" })}>lbs</button></div> },
            { l: "Theme", s: "App appearance", el: <div className="toggle"><button className={`toggle-btn ${settings.theme === "dark" ? "active" : ""}`} onClick={() => saveSettings({ ...settings, theme: "dark" })}>🌙 Dark</button><button className={`toggle-btn ${settings.theme === "light" ? "active" : ""}`} onClick={() => saveSettings({ ...settings, theme: "light" })}>☀️ Light</button></div> },
            { l: "Storage Persistence", s: persistent ? "✓ Secured (Browser won't auto-clear)" : "Standard (Request persistence protection)", el: <button className={`btn ${persistent ? "btn-out" : "btn-purple"}`} onClick={requestPersistence} disabled={persistent}>{persistent ? "Secured" : "Request"}</button> },
            { l: "Backup JSON", s: "Save all your logs to a JSON file", el: <button className="btn btn-acc" onClick={exportJSON}>{backupDone ? "✓ Saved!" : "Backup (.json)"}</button> },
            { l: "Restore JSON", s: "Import a saved JSON backup file", el: <div><input type="file" ref={fileInputRef} onChange={importJSON} accept=".json" style={{ display: "none" }} /><button className="btn btn-out" onClick={() => fileInputRef.current?.click()}>Restore</button></div> },
            { l: "Export CSV", s: "Download workouts for Excel/Spreadsheets", el: <button className="btn btn-out" onClick={exportCSV}>{exportDone ? "✓ Done!" : "Export CSV"}</button> },
            { l: "Sign Out", s: "Log out", el: <button className="btn btn-danger" onClick={store.logout}>Logout</button> },
          ].map((r, i) => (
            <div key={r.l} className="setting-row" style={i === 6 ? { borderBottom: "none" } : {}}>
              <div><div className="setting-lbl">{r.l}</div><div className="setting-sub">{r.s}</div></div>
              {r.el}
            </div>
          ))}
        </div>
      </div>
      {Object.keys(store.prs).length > 0 && (
        <div className="panel">
          <div style={{ padding: 18 }}>
            <div className="sec-lbl">PERSONAL RECORDS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 9 }}>
              {Object.entries(store.prs).sort((a, b) => b[1].weight - a[1].weight).map(([ex, pr]) => (
                <div key={ex} style={{ background: "var(--surface)", borderRadius: 10, padding: "11px 13px", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{ex}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: "var(--accent)" }}>{pr.weight}{store.settings.unit} × {pr.reps}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{fmtDate(pr.date)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
