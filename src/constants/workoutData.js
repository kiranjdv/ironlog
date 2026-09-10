import { getStreak } from "../utils/helpers";

export const MUSCLE_GROUPS = {
  Chest: { icon: "💪", color: "#FF4D4D", exercises: ["Bench Press","Incline Bench Press","Decline Bench Press","Dumbbell Flyes","Cable Crossover","Push-Ups","Chest Dips"] },
  Back: { icon: "🏋️", color: "#4D9FFF", exercises: ["Deadlift","Pull-Ups","Barbell Rows","Cable Rows","Lat Pulldown","T-Bar Row","Face Pulls"] },
  Shoulders: { icon: "🦾", color: "#A855F7", exercises: ["Overhead Press","Arnold Press","Lateral Raises","Front Raises","Rear Delt Flyes","Shrugs","Upright Rows"] },
  Legs: { icon: "🦵", color: "#F59E0B", exercises: ["Squat","Leg Press","Romanian Deadlift","Leg Curl","Leg Extension","Lunges","Calf Raises"] },
  Arms: { icon: "💥", color: "#10B981", exercises: ["Barbell Curl","Hammer Curl","Tricep Pushdown","Skull Crushers","Preacher Curl","Overhead Tricep Extension","Concentration Curl"] },
  Core: { icon: "🔥", color: "#F97316", exercises: ["Plank","Crunches","Leg Raises","Russian Twists","Ab Wheel","Cable Crunches","Hanging Knee Raises"] },
};

export const WORKOUT_TEMPLATES = {
  "PPL - Push": { muscles: ["Chest","Shoulders","Arms"], exercises: ["Bench Press","Overhead Press","Incline Bench Press","Lateral Raises","Tricep Pushdown","Skull Crushers"] },
  "PPL - Pull": { muscles: ["Back","Arms"], exercises: ["Deadlift","Pull-Ups","Barbell Rows","Face Pulls","Barbell Curl","Hammer Curl"] },
  "PPL - Legs": { muscles: ["Legs","Core"], exercises: ["Squat","Leg Press","Romanian Deadlift","Leg Curl","Calf Raises","Plank"] },
  "5x5 Workout A": { muscles: ["Chest","Back","Legs"], exercises: ["Squat","Bench Press","Barbell Rows"] },
  "5x5 Workout B": { muscles: ["Shoulders","Back","Legs"], exercises: ["Squat","Overhead Press","Deadlift"] },
  "Upper Body": { muscles: ["Chest","Back","Shoulders","Arms"], exercises: ["Bench Press","Pull-Ups","Overhead Press","Barbell Curl","Tricep Pushdown"] },
  "Lower Body": { muscles: ["Legs","Core"], exercises: ["Squat","Romanian Deadlift","Leg Press","Leg Curl","Calf Raises"] },
  "Full Body": { muscles: ["Chest","Back","Legs","Shoulders"], exercises: ["Squat","Bench Press","Deadlift","Overhead Press","Pull-Ups"] },
};

export const ACHIEVEMENTS = [
  {
    id: "first_workout",
    icon: "trophy",
    name: "First Blood",
    desc: "Complete your first workout",
    check: (ws) => (ws || []).length >= 1,
    progress: (ws) => ({ current: Math.min((ws || []).length, 1), max: 1, unit: "workout" })
  },
  {
    id: "week_streak",
    icon: "flame",
    name: "Week Warrior",
    desc: "Workout 7 days in a row",
    check: (ws) => getStreak(ws || []) >= 7,
    progress: (ws) => ({ current: Math.min(getStreak(ws || []), 7), max: 7, unit: "days" })
  },
  {
    id: "ten_workouts",
    icon: "award",
    name: "Dedicated",
    desc: "Complete 10 workouts",
    check: (ws) => (ws || []).length >= 10,
    progress: (ws) => ({ current: Math.min((ws || []).length, 10), max: 10, unit: "workouts" })
  },
  {
    id: "pr_club",
    icon: "zap",
    name: "PR Club",
    desc: "Set your first Personal Record",
    check: (_, prs) => Object.keys(prs || {}).length >= 1,
    progress: (_, prs) => ({ current: Math.min(Object.keys(prs || {}).length, 1), max: 1, unit: "PR" })
  },
  {
    id: "all_muscles",
    icon: "shield",
    name: "Full Body",
    desc: "Train all 6 muscle groups",
    check: (ws) => new Set((ws || []).flatMap(w => (w.exercises || []).map(e => e.muscle))).size >= 6,
    progress: (ws) => ({ current: Math.min(new Set((ws || []).flatMap(w => (w.exercises || []).map(e => e.muscle))).size, 6), max: 6, unit: "muscles" })
  },
  {
    id: "century",
    icon: "crown",
    name: "Century",
    desc: "Log 100 total sets",
    check: (ws) => (ws || []).reduce((a, w) => a + (w.exercises || []).reduce((b, e) => b + (e.sets || []).filter(s => s.done).length, 0), 0) >= 100,
    progress: (ws) => {
      const sets = (ws || []).reduce((a, w) => a + (w.exercises || []).reduce((b, e) => b + (e.sets || []).filter(s => s.done).length, 0), 0);
      return { current: Math.min(sets, 100), max: 100, unit: "sets" };
    }
  },
  {
    id: "twentyfive_workouts",
    icon: "star",
    name: "Iron Will",
    desc: "Complete 25 total workouts",
    check: (ws) => (ws || []).length >= 25,
    progress: (ws) => ({ current: Math.min((ws || []).length, 25), max: 25, unit: "workouts" })
  },
  {
    id: "sbd_total",
    icon: "dumbbell",
    name: "SBD Milestone",
    desc: "Total 250kg combined PR across Squat, Bench & Deadlift",
    check: (_, prs = {}) => {
      const s = prs["Squat"]?.weight || 0;
      const b = prs["Bench Press"]?.weight || 0;
      const d = prs["Deadlift"]?.weight || 0;
      return (s + b + d) >= 250;
    },
    progress: (_, prs = {}) => {
      const s = prs["Squat"]?.weight || 0;
      const b = prs["Bench Press"]?.weight || 0;
      const d = prs["Deadlift"]?.weight || 0;
      const total = Math.round(s + b + d);
      return { current: Math.min(total, 250), max: 250, unit: "kg" };
    }
  }
];

