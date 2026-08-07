import { useState, useEffect } from "react";
import { initDb } from "../utils/db";
import { useAuth } from "./useAuth";
import { useSettings } from "./useSettings";
import { useWorkouts } from "./useWorkouts";
import { usePlanner } from "./usePlanner";
import { useBodyLog } from "./useBodyLog";
import { useGoals } from "./useGoals";
import { useCustomExercises } from "./useCustomExercises";
import { ACHIEVEMENTS, WORKOUT_TEMPLATES } from "../constants/workoutData";

export default function useStore() {
  const [db, setDb] = useState(null);
  const [dbInitLoading, setDbInitLoading] = useState(true);

  // Initialize DB connection
  useEffect(() => {
    async function setup() {
      try {
        const database = await initDb();
        setDb(database);
      } catch (err) {
        console.error("Database connection failed", err);
      } finally {
        setDbInitLoading(false);
      }
    }
    setup();
  }, []);

  // Call child hooks
  const auth = useAuth(db);
  const settingsHook = useSettings(db);
  const workoutsHook = useWorkouts(db, auth.currentUser);
  const plannerHook = usePlanner(db, auth.currentUser);
  const bodyLogHook = useBodyLog(db, auth.currentUser);
  const goalsHook = useGoals(db, auth.currentUser);
  const customExHook = useCustomExercises(db, auth.currentUser);

  // loading state combines db connection loading and child hooks loading
  const isDbLoading =
    dbInitLoading ||
    auth.loading ||
    settingsHook.loading ||
    workoutsHook.loading ||
    plannerHook.loading ||
    bodyLogHook.loading ||
    goalsHook.loading ||
    customExHook.loading;

  // Filtered views
  const myWorkouts = workoutsHook.workouts.filter(w => w.user === auth.currentUser);
  const myPrs = workoutsHook.prs[auth.currentUser] || {};
  const myBody = bodyLogHook.bodyLog.filter(b => b.user === auth.currentUser);
  const myGoals = goalsHook.goals.filter(g => g.user === auth.currentUser);
  const mySchedule = plannerHook.scheduledWorkouts[auth.currentUser] || {};
  const myCustomEx = customExHook.customExercises[auth.currentUser] || {};
  const myAchievements = ACHIEVEMENTS.filter(a => a.check(myWorkouts, myPrs));
  const myCustomTemplates = plannerHook.customTemplates[auth.currentUser] || {};
  const allTemplates = { ...WORKOUT_TEMPLATES, ...myCustomTemplates };

  return {
    db,
    isDbLoading,
    users: auth.users,
    currentUser: auth.currentUser,
    user: auth.users[auth.currentUser],
    register: auth.register,
    login: auth.login,
    logout: auth.logout,
    workouts: myWorkouts,
    saveWorkout: workoutsHook.saveWorkout,
    prs: myPrs,
    bodyLog: myBody,
    addBodyEntry: bodyLogHook.addBodyEntry,
    goals: myGoals,
    addGoal: goalsHook.addGoal,
    deleteGoal: goalsHook.deleteGoal,
    customExercises: myCustomEx,
    addCustomExercise: customExHook.addCustomExercise,
    schedule: mySchedule,
    scheduleWorkout: plannerHook.scheduleWorkout,
    settings: settingsHook.settings,
    saveSettings: settingsHook.saveSettings,
    achievements: myAchievements,
    templates: allTemplates,
    customTemplates: myCustomTemplates,
    addCustomTemplate: plannerHook.addCustomTemplate,
    deleteCustomTemplate: plannerHook.deleteCustomTemplate,
    
    // Active Workout states & actions
    active: workoutsHook.active,
    timerOn: workoutsHook.timerOn,
    startTime: workoutsHook.startTime,
    startWorkout: workoutsHook.startWorkout,
    updateActiveWorkout: workoutsHook.updateActiveWorkout,
    cancelActiveWorkout: workoutsHook.cancelActiveWorkout,
    finishActiveWorkout: workoutsHook.finishActiveWorkout,
  };
}
