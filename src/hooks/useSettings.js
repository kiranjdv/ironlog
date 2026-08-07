import { useState, useEffect } from "react";
import { dbGet, dbPut } from "../utils/db";

export function useSettings(db) {
  const [settings, setSettings] = useState({ unit: "kg", theme: "dark" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadSettings() {
      try {
        const settingsVal = await dbGet(db, "kv", "settings");
        if (settingsVal) setSettings(settingsVal);
      } catch (err) {
        console.error("Failed to load settings state", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [db]);

  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    if (db) await dbPut(db, "kv", newSettings, "settings");
  };

  return { settings, saveSettings, loading };
}
