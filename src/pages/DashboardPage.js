import { MUSCLE_GROUPS } from "../constants/workoutData";
import { getStreak, todayStr, DAYS_SHORT } from "../utils/helpers";

export default function DashboardPage({ store }) {
  const ws = store.workouts;
  const streak = getStreak(ws);
  const totalDays = new Set(ws.map(w => w.date)).size;
  const thisWeek = ws.filter(w => {
    const d = new Date(w.date), now = new Date(), start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1);
    return d >= start;
  });
  const totalSets = ws.reduce((a, w) => a + w.exercises.reduce((b, e) => b + e.sets.filter(s => s.done).length, 0), 0);
  const muscleCounts = {};
  ws.forEach(w => w.exercises.forEach(e => { muscleCounts[e.muscle] = (muscleCounts[e.muscle] || 0) + 1; }));
  const maxMC = Math.max(1, ...Object.values(muscleCounts));
  const getWeekDates = () => {
    const now = new Date(), days = [], mon = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    for (let i = 0; i < 7; i++) {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      days.push(d);
    }
    return days;
  };
  const weekDates = getWeekDates();
  const workedDates = new Set(ws.map(w => w.date));

  return (
    <div className="page">
      <div className="page-title">DASHBOARD</div>
      <div className="page-sub">Keep pushing, {store.user?.name?.split(" ")[0] || "Athlete"} 🔥</div>
      <div className="stats-row">
        {[{ l: "Total Workouts", v: totalDays, d: "sessions", c: "var(--accent)" }, { l: "Streak", v: streak, d: "days 🔥", c: "#F59E0B" }, { l: "This Week", v: thisWeek.length, d: "workouts", c: "#A855F7" }, { l: "Sets Done", v: totalSets, d: "total", c: "#4D9FFF" }].map(s => (
          <div key={s.l} className="stat-card" style={{ "--sc": s.c }}>
            <div className="stat-lbl">{s.l}</div>
            <div className="stat-val">{s.v}</div>
            <div className="stat-desc">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="sec-lbl">THIS WEEK</div>
      <div className="week-row">
        {weekDates.map((d, i) => {
          const ds = d.toISOString().split("T")[0];
          const isToday = ds === todayStr(), worked = workedDates.has(ds), sched = store.schedule[ds];
          const muscles = [...new Set(ws.filter(w => w.date === ds).flatMap(w => w.exercises.map(e => e.muscle)))];
          return (
            <div key={i} className={`wday ${worked ? "worked" : ""} ${isToday ? "today" : ""} ${sched && !worked ? "sched" : ""}`}>
              <div className="wday-lbl">{DAYS_SHORT[i]}</div>
              <div className="wday-dot" />
              <div className="wday-m">
                {muscles.slice(0, 2).join(", ")}
                {sched && !worked && <div style={{ fontSize: 9, color: "#A855F7", marginTop: 2 }}>{sched}</div>}
              </div>
            </div>
          );
        })}
      </div>
      {Object.keys(muscleCounts).length > 0 && (
        <>
          <div className="sec-lbl">MUSCLE FREQUENCY</div>
          <div className="panel">
            <div style={{ padding: 16 }}>
              <div className="bar-chart">
                {Object.entries(muscleCounts).sort((a, b) => b[1] - a[1]).map(([m, c]) => (
                  <div key={m} className="bar-row">
                    <div className="bar-lbl">{m}</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(c / maxMC) * 100}%`, background: MUSCLE_GROUPS[m]?.color || "var(--accent)" }} />
                    </div>
                    <div className="bar-val" style={{ color: MUSCLE_GROUPS[m]?.color || "var(--accent)" }}>{c}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {store.achievements.length > 0 && (
        <>
          <div className="sec-lbl">ACHIEVEMENTS</div>
          <div className="flex flex-wrap gap8">
            {store.achievements.slice(0, 4).map(a => (
              <div key={a.id} style={{ background: "var(--card)", border: "1px solid var(--accent)", borderRadius: 10, padding: "7px 13px", display: "flex", alignItems: "center", gap: 7 }}>
                <span>{a.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{a.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {ws.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏋️</div>
          <p>No workouts yet. Go to <strong>Workout</strong> to log your first session!</p>
        </div>
      )}
    </div>
  );
}
