import { useState, useEffect } from "react";
import { dbGetAll, dbPut, dbDelete } from "../utils/db";
import { uid, todayStr } from "../utils/helpers";

export function useGoals(db, currentUser) {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadGoals() {
      try {
        const goalsArray = await dbGetAll(db, "goals");
        setGoals(goalsArray);
      } catch (err) {
        console.error("Failed to load goals state", err);
      } finally {
        setLoading(false);
      }
    }
    loadGoals();
  }, [db]);

  const addGoal = async (goal) => {
    const newGoal = { ...goal, user: currentUser, id: uid(), created: todayStr(), completed: false, updatedAt: Date.now() };
    const updated = [...goals, newGoal];
    setGoals(updated);
    if (db) await dbPut(db, "goals", newGoal);
  };

  const deleteGoal = async (id) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    if (db) await dbDelete(db, "goals", id);
  };

  return { goals, loading, addGoal, deleteGoal };
}
