import { useState, useEffect } from "react";
import { dbGetAll, dbGet, dbPut } from "../utils/db";
import { uid, todayStr, getMuscleForExercise } from "../utils/helpers";
import { MUSCLE_GROUPS } from "../constants/workoutData";

export function useWorkouts(db, currentUser) {
  const [workouts, setWorkouts] = useState([]);
  const [prs, setPrs] = useState({});
  const [active, setActive] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [timerOn, setTimerOn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    async function loadWorkouts() {
      try {
        const workoutsArray = await dbGetAll(db, "workouts");
        setWorkouts(workoutsArray);

        const prsVal = await dbGet(db, "kv", "prs");
        setPrs(prsVal || {});

        const activeVal = await dbGet(db, "kv", "active");
        setActive(activeVal || null);

        const startTimeVal = await dbGet(db, "kv", "startTime");
        setStartTime(startTimeVal || null);

        const timerOnVal = await dbGet(db, "kv", "timerOn");
        setTimerOn(timerOnVal || false);
      } catch (err) {
        console.error("Failed to load workouts state", err);
      } finally {
        setLoading(false);
      }
    }
    loadWorkouts();
  }, [db]);

  const savePrs = async (v) => {
    setPrs(v);
    if (db) await dbPut(db, "kv", v, "prs");
  };

  const saveActive = async (v) => {
    setActive(v);
    if (db) await dbPut(db, "kv", v, "active");
  };

  const saveStartTime = async (v) => {
    setStartTime(v);
    if (db) await dbPut(db, "kv", v, "startTime");
  };

  const saveTimerOn = async (v) => {
    setTimerOn(v);
    if (db) await dbPut(db, "kv", v, "timerOn");
  };

  const saveWorkout = async (workout) => {
    const idx = workouts.findIndex(w => w.id === workout.id);
    workout.updatedAt = workout.updatedAt || Date.now();
    const updated = idx >= 0 ? workouts.map((w, i) => i === idx ? workout : w) : [...workouts, workout];
    
    setWorkouts(updated);
    if (db) await dbPut(db, "workouts", workout);

    // Compute PRs
    const userPrs = { ...(prs[currentUser] || {}) };
    let changed = false;
    workout.exercises.forEach(ex => {
      (ex.sets || []).filter(s => s.done && s.weight && s.reps).forEach(s => {
        const w = parseFloat(s.weight), r = parseInt(s.reps);
        if (!userPrs[ex.name] || w > userPrs[ex.name].weight || (w === userPrs[ex.name].weight && r > userPrs[ex.name].reps)) {
          userPrs[ex.name] = { weight: w, reps: r, date: workout.date };
          changed = true;
        }
      });
    });
    if (changed) {
      const newPrs = { ...prs, [currentUser]: userPrs };
      await savePrs(newPrs);
    }
  };

  const startWorkout = async (template) => {
    const exercises = template ? template.exercises.map(name => ({ id: uid(), name, muscle: getMuscleForExercise(name, MUSCLE_GROUPS), sets: [] })) : [];
    const newActive = { id: uid(), date: todayStr(), exercises, user: currentUser, updatedAt: Date.now() };
    await saveActive(newActive);
    await saveStartTime(Date.now());
    await saveTimerOn(true);
  };

  const updateActiveWorkout = async (newActive) => {
    newActive.updatedAt = Date.now();
    await saveActive(newActive);
  };

  const cancelActiveWorkout = async () => {
    await saveActive(null);
    await saveStartTime(null);
    await saveTimerOn(false);
  };

  const finishActiveWorkout = async () => {
    if (active) {
      active.updatedAt = Date.now();
      await saveWorkout(active);
    }
    await saveActive(null);
    await saveStartTime(null);
    await saveTimerOn(false);
  };

  return {
    workouts, prs, active, startTime, timerOn, loading,
    saveWorkout, startWorkout, updateActiveWorkout, cancelActiveWorkout, finishActiveWorkout
  };
}
