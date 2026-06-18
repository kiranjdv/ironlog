export const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const todayStr = () => new Date().toISOString().split("T")[0];

export const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export const uid = () => Math.random().toString(36).slice(2, 9);

export function getStreak(ws) {
  if (!ws.length) return 0;
  const dates = [...new Set(ws.map(w => w.date))].sort().reverse();
  let streak = 0;
  let cur = new Date();
  for (let d of dates) {
    const diff = Math.floor((cur - new Date(d)) / 86400000);
    if (diff <= 1) { streak++; cur = new Date(d); } else break;
  }
  return streak;
}

export function getMuscleForExercise(name, muscleGroups) {
  for (const [m, g] of Object.entries(muscleGroups)) {
    if (g.exercises.includes(name)) return m;
  }
  return "Custom";
}
