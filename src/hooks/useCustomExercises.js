import { useState, useEffect } from "react";
import { dbGet, dbPut } from "../utils/db";

export function useCustomExercises(db, currentUser) {
  const [customExercises, setCustomExercises] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadCustomEx() {
      try {
        const customExVal = await dbGet(db, "kv", "customExercises");
        setCustomExercises(customExVal || {});
      } catch (err) {
        console.error("Failed to load custom exercises state", err);
      } finally {
        setLoading(false);
      }
    }
    loadCustomEx();
  }, [db]);

  const addCustomExercise = async (muscle, name) => {
    const userEx = { ...(customExercises[currentUser] || {}) };
    if (!userEx[muscle]) userEx[muscle] = [];
    if (!userEx[muscle].includes(name)) userEx[muscle] = [...userEx[muscle], name];
    const newCustomEx = { ...customExercises, [currentUser]: userEx };
    setCustomExercises(newCustomEx);
    if (db) await dbPut(db, "kv", newCustomEx, "customExercises");
  };

  return { customExercises, loading, addCustomExercise };
}
