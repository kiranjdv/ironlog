export const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const todayStr = () => new Date().toISOString().split("T")[0];

export const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export const fmtDuration = (s) => {
  if (s === undefined || s === null || isNaN(s)) return "—";
  const sec = parseInt(s, 10);
  if (sec <= 0) return "0s";
  const hrs = Math.floor(sec / 3600);
  const mins = Math.floor((sec % 3600) / 60);
  const remSec = sec % 60;
  if (hrs > 0) {
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  }
  if (mins > 0) {
    return remSec > 0 ? `${mins}m ${remSec}s` : `${mins}m`;
  }
  return `${remSec}s`;
};

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
