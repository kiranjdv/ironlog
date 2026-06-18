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
  { id: "first_workout", icon: "🏆", name: "First Blood", desc: "Complete your first workout", check: (ws) => ws.length >= 1 },
  { id: "week_streak", icon: "🔥", name: "Week Warrior", desc: "Workout 7 days in a row", check: (ws) => getStreak(ws) >= 7 },
  { id: "ten_workouts", icon: "💪", name: "Dedicated", desc: "Complete 10 workouts", check: (ws) => ws.length >= 10 },
  { id: "pr_club", icon: "⚡", name: "PR Club", desc: "Set your first Personal Record", check: (_, prs) => Object.keys(prs).length >= 1 },
  { id: "all_muscles", icon: "🦾", name: "Full Body", desc: "Train all 6 muscle groups", check: (ws) => new Set(ws.flatMap(w => w.exercises.map(e => e.muscle))).size >= 6 },
  { id: "century", icon: "💯", name: "Century", desc: "Log 100 total sets", check: (ws) => ws.reduce((a, w) => a + w.exercises.reduce((b, e) => b + e.sets.filter(s => s.done).length, 0), 0) >= 100 },
];
