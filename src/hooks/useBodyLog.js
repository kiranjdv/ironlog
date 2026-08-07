import { useState, useEffect } from "react";
import { dbGetAll, dbPut } from "../utils/db";
import { uid, todayStr } from "../utils/helpers";

export function useBodyLog(db, currentUser) {
  const [bodyLog, setBodyLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadBodyLog() {
      try {
        const bodyArray = await dbGetAll(db, "bodyLog");
        setBodyLog(bodyArray);
      } catch (err) {
        console.error("Failed to load body log state", err);
      } finally {
        setLoading(false);
      }
    }
    loadBodyLog();
  }, [db]);

  const addBodyEntry = async (entry) => {
    const newEntry = { ...entry, user: currentUser, id: uid(), date: todayStr(), updatedAt: Date.now() };
    const updated = [...bodyLog, newEntry];
    setBodyLog(updated);
    if (db) await dbPut(db, "bodyLog", newEntry);
  };

  return { bodyLog, loading, addBodyEntry };
}
