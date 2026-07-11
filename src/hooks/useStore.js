import { useState, useEffect } from "react";
import { ACHIEVEMENTS, WORKOUT_TEMPLATES, MUSCLE_GROUPS } from "../constants/workoutData";
import { uid, todayStr, getMuscleForExercise } from "../utils/helpers";
import { hashPassword } from "../utils/crypto";

export default function useStore() {
  useEffect(() => {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then((persisted) => {
        console.log("Persistent storage status:", persisted);
      });
    }
  }, []);

  const load = (k, def) => { try { return JSON.parse(localStorage.getItem(k) || "null") ?? def; } catch { return def; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const [users, setUsers] = useState(() => load("il_users", {}));
  const [workouts, setWorkouts] = useState(() => load("il_workouts", []));
  const [currentUser, setCurrentUser] = useState(() => load("il_current", null));
  const [prs, setPrs] = useState(() => load("il_prs", {}));
  const [bodyLog, setBodyLog] = useState(() => load("il_body", []));
  const [goals, setGoals] = useState(() => load("il_goals", []));
  const [customExercises, setCustomExercises] = useState(() => load("il_custom_ex", {}));
  const [scheduledWorkouts, setScheduledWorkouts] = useState(() => load("il_schedule", {}));
  const [settings, setSettings] = useState(() => load("il_settings", { unit: "kg", theme: "dark" }));
  const [customTemplates, setCustomTemplates] = useState(() => load("il_custom_templates", {}));

  // Active Workout Session state
  const [active, setActive] = useState(() => load("il_active", null));
  const [startTime, setStartTime] = useState(() => load("il_start_time", null));
  const [timerOn, setTimerOn] = useState(() => load("il_timer_on", false));

  const saveUsers = (v) => { setUsers(v); save("il_users", v); };
  const saveWorkouts = (v) => { setWorkouts(v); save("il_workouts", v); };
  const savePrs = (v) => { setPrs(v); save("il_prs", v); };
  const saveBodyLog = (v) => { setBodyLog(v); save("il_body", v); };
  const saveGoals = (v) => { setGoals(v); save("il_goals", v); };
  const saveCustomEx = (v) => { setCustomExercises(v); save("il_custom_ex", v); };
  const saveSchedule = (v) => { setScheduledWorkouts(v); save("il_schedule", v); };
  const saveSettings = (v) => { setSettings(v); save("il_settings", v); };
  const saveCustomTemplatesState = (v) => { setCustomTemplates(v); save("il_custom_templates", v); };
  
  const saveActive = (v) => { setActive(v); save("il_active", v); };
  const saveStartTime = (v) => { setStartTime(v); save("il_start_time", v); };
  const saveTimerOn = (v) => { setTimerOn(v); save("il_timer_on", v); };

  const register = async (name, email, pass) => {
    if (users[email]) return "Email already registered";
    const hashedPassword = await hashPassword(pass);
    saveUsers({ ...users, [email]: { name, pass: hashedPassword } });
    setCurrentUser(email); save("il_current", email);
    return null;
  };
  const login = async (email, pass) => {
    if (!users[email]) return "No account found";
    
    const storedPass = users[email].pass;
    const isHashed = typeof storedPass === "string" && storedPass.length === 64 && /^[0-9a-f]{64}$/i.test(storedPass);

    if (isHashed) {
      const hashedPassword = await hashPassword(pass);
      if (storedPass !== hashedPassword) return "Wrong password";
    } else {
      // Plaintext migration check
      if (storedPass !== pass) return "Wrong password";
      // Upgrade plaintext password to secure SHA-256 hash in storage
      const hashedPassword = await hashPassword(pass);
      saveUsers({ ...users, [email]: { ...users[email], pass: hashedPassword } });
    }

    setCurrentUser(email); save("il_current", email);
    return null;
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("il_current");
    saveActive(null);
    saveStartTime(null);
    saveTimerOn(false);
  };

  const startWorkout = (template) => {
    const exercises = template ? template.exercises.map(name => ({ id: uid(), name, muscle: getMuscleForExercise(name, MUSCLE_GROUPS), sets: [] })) : [];
    const newActive = { id: uid(), date: todayStr(), exercises, user: currentUser };
    saveActive(newActive);
    saveStartTime(Date.now());
    saveTimerOn(true);
  };

  const updateActiveWorkout = (newActive) => {
    saveActive(newActive);
  };

  const cancelActiveWorkout = () => {
    saveActive(null);
    saveStartTime(null);
    saveTimerOn(false);
  };

  const finishActiveWorkout = () => {
    if (active) {
      saveWorkout(active);
    }
    saveActive(null);
    saveStartTime(null);
    saveTimerOn(false);
  };

  const myWorkouts = workouts.filter(w => w.user === currentUser);
  const myPrs = prs[currentUser] || {};
  const myBody = bodyLog.filter(b => b.user === currentUser);
  const myGoals = goals.filter(g => g.user === currentUser);
  const mySchedule = scheduledWorkouts[currentUser] || {};
  const myCustomEx = customExercises[currentUser] || {};
  const myAchievements = ACHIEVEMENTS.filter(a => a.check(myWorkouts, myPrs));
  const myCustomTemplates = customTemplates[currentUser] || {};
  const allTemplates = { ...WORKOUT_TEMPLATES, ...myCustomTemplates };

  const saveWorkout = (workout) => {
    const idx = workouts.findIndex(w => w.id === workout.id);
    const updated = idx >= 0 ? workouts.map((w, i) => i === idx ? workout : w) : [...workouts, workout];
    saveWorkouts(updated);
    const userPrs = { ...(prs[currentUser] || {}) };
    let changed = false;
    workout.exercises.forEach(ex => {
      ex.sets.filter(s => s.done && s.weight && s.reps).forEach(s => {
        const w = parseFloat(s.weight), r = parseInt(s.reps);
        if (!userPrs[ex.name] || w > userPrs[ex.name].weight || (w === userPrs[ex.name].weight && r > userPrs[ex.name].reps)) {
          userPrs[ex.name] = { weight: w, reps: r, date: workout.date };
          changed = true;
        }
      });
    });
    if (changed) savePrs({ ...prs, [currentUser]: userPrs });
  };

  const addBodyEntry = (entry) => {
    saveBodyLog([...bodyLog, { ...entry, user: currentUser, id: uid(), date: todayStr() }]);
  };
  const addGoal = (goal) => saveGoals([...goals, { ...goal, user: currentUser, id: uid(), created: todayStr() }]);
  const deleteGoal = (id) => saveGoals(goals.filter(g => g.id !== id));
  const addCustomExercise = (muscle, name) => {
    const userEx = { ...(customExercises[currentUser] || {}) };
    if (!userEx[muscle]) userEx[muscle] = [];
    if (!userEx[muscle].includes(name)) userEx[muscle] = [...userEx[muscle], name];
    saveCustomEx({ ...customExercises, [currentUser]: userEx });
  };
  const scheduleWorkout = (date, templateName) => {
    const userSched = { ...(scheduledWorkouts[currentUser] || {}) };
    userSched[date] = templateName;
    saveSchedule({ ...scheduledWorkouts, [currentUser]: userSched });
  };
  const addCustomTemplate = (name, exercises) => {
    const userTmpls = { ...(customTemplates[currentUser] || {}) };
    const muscles = [...new Set(exercises.map(ex => getMuscleForExercise(ex, MUSCLE_GROUPS)))];
    userTmpls[name] = { muscles, exercises };
    saveCustomTemplatesState({ ...customTemplates, [currentUser]: userTmpls });
  };
  const deleteCustomTemplate = (name) => {
    const userTmpls = { ...(customTemplates[currentUser] || {}) };
    delete userTmpls[name];
    saveCustomTemplatesState({ ...customTemplates, [currentUser]: userTmpls });
  };

  return {
    users, currentUser, user: users[currentUser],
    register, login, logout,
    workouts: myWorkouts, saveWorkout,
    prs: myPrs,
    bodyLog: myBody, addBodyEntry,
    goals: myGoals, addGoal, deleteGoal,
    customExercises: myCustomEx, addCustomExercise,
    schedule: mySchedule, scheduleWorkout,
    settings, saveSettings,
    achievements: myAchievements,
    templates: allTemplates,
    customTemplates: myCustomTemplates,
    addCustomTemplate,
    deleteCustomTemplate,
    // Active Workout states & actions
    active, timerOn, startTime,
    startWorkout, updateActiveWorkout, cancelActiveWorkout, finishActiveWorkout
  };
}
