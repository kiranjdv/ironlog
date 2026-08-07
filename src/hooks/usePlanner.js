import { useState, useEffect } from "react";
import { dbGet, dbPut } from "../utils/db";
import { getMuscleForExercise } from "../utils/helpers";
import { MUSCLE_GROUPS } from "../constants/workoutData";

export function usePlanner(db, currentUser) {
  const [scheduledWorkouts, setScheduledWorkouts] = useState({});
  const [customTemplates, setCustomTemplates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadPlanner() {
      try {
        const scheduleVal = await dbGet(db, "kv", "scheduledWorkouts");
        setScheduledWorkouts(scheduleVal || {});

        const customTemplatesVal = await dbGet(db, "kv", "customTemplates");
        setCustomTemplates(customTemplatesVal || {});
      } catch (err) {
        console.error("Failed to load planner state", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlanner();
  }, [db]);

  const scheduleWorkout = async (date, templateName) => {
    const userSched = { ...(scheduledWorkouts[currentUser] || {}) };
    userSched[date] = templateName;
    const newSched = { ...scheduledWorkouts, [currentUser]: userSched };
    setScheduledWorkouts(newSched);
    if (db) await dbPut(db, "kv", newSched, "scheduledWorkouts");
  };

  const addCustomTemplate = async (name, exercises) => {
    const userTmpls = { ...(customTemplates[currentUser] || {}) };
    const muscles = [...new Set(exercises.map(ex => getMuscleForExercise(ex, MUSCLE_GROUPS)))];
    userTmpls[name] = { muscles, exercises };
    const newTmpls = { ...customTemplates, [currentUser]: userTmpls };
    setCustomTemplates(newTmpls);
    if (db) await dbPut(db, "kv", newTmpls, "customTemplates");
  };

  const deleteCustomTemplate = async (name) => {
    const userTmpls = { ...(customTemplates[currentUser] || {}) };
    delete userTmpls[name];
    const newTmpls = { ...customTemplates, [currentUser]: userTmpls };
    setCustomTemplates(newTmpls);
    if (db) await dbPut(db, "kv", newTmpls, "customTemplates");
  };

  return { scheduledWorkouts, customTemplates, loading, scheduleWorkout, addCustomTemplate, deleteCustomTemplate };
}
