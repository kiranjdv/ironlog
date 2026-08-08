import { MUSCLE_GROUPS } from "../constants/workoutData";
import { getStreak, todayStr, DAYS_SHORT } from "../utils/helpers";

export default function DashboardPage({ store, setTab }) {
  const ws = store.workouts;
  const streak = getStreak(ws);
  const totalDays = new Set(ws.map((w) => w.date)).size;
  const thisWeek = ws.filter((w) => {
    const d = new Date(w.date),
      now = new Date(),
      start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + 1);
    return d >= start;
  });
  const totalSets = ws.reduce(
    (a, w) =>
      a +
      w.exercises.reduce(
        (b, e) => b + e.sets.filter((s) => s.done).length,
        0
      ),
    0
  );
  const muscleCounts = {};
  ws.forEach((w) =>
    w.exercises.forEach((e) => {
      muscleCounts[e.muscle] = (muscleCounts[e.muscle] || 0) + 1;
    })
  );
  const maxMC = Math.max(1, ...Object.values(muscleCounts));
  const getWeekDates = () => {
    const now = new Date(),
      days = [],
      mon = new Date(now);
    mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    for (let i = 0; i < 7; i++) {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      days.push(d);
    }
    return days;
  };
  const weekDates = getWeekDates();
  const workedDates = new Set(ws.map((w) => w.date));

  return (
    <div className="page">
      <div className="flex-sb mb20">
        <div>
          <div className="page-title">DASHBOARD</div>
          <div className="page-sub">
            Keep pushing, {store.user?.name?.split(" ")[0] || "Athlete"} 🔥
          </div>
        </div>
        {setTab && (
          <button className="btn btn-acc" onClick={() => setTab("workout")}>
            + Start Workout
          </button>
        )}
      </div>

      <div className="stats-row">
        {[
          { l: "Total Workouts", v: totalDays, d: "sessions", c: "var(--accent)" },
          { l: "Streak", v: streak, d: "days 🔥", c: "#F59E0B" },
          { l: "This Week", v: thisWeek.length, d: "workouts", c: "#A855F7" },
          { l: "Sets Done", v: totalSets, d: "total", c: "#4D9FFF" },
        ].map((s) => (
          <div key={s.l} className="stat-card" style={{ "--sc": s.c }}>
            <div className="stat-lbl">{s.l}</div>
            <div className="stat-val">{s.v}</div>
            <div className="stat-desc">{s.d}</div>
          </div>
        ))}
      </div>

      <div className="sec-lbl">THIS WEEK ACTIVITY</div>
      <div className="week-row">
        {weekDates.map((d, i) => {
          const ds = d.toISOString().split("T")[0];
          const isToday = ds === todayStr(),
            worked = workedDates.has(ds),
            sched = store.schedule[ds];
          const muscles = [
            ...new Set(
              ws
                .filter((w) => w.date === ds)
                .flatMap((w) => w.exercises.map((e) => e.muscle))
            ),
          ];
          return (
            <div
              key={i}
              className={`wday ${worked ? "worked" : ""} ${
                isToday ? "today" : ""
              } ${sched && !worked ? "sched" : ""}`}
            >
              <div className="wday-lbl">{DAYS_SHORT[i]}</div>
              <div className="wday-dot" />
              <div className="wday-m">
                {muscles.slice(0, 2).join(", ")}
                {sched && !worked && (
                  <div style={{ fontSize: 9, color: "#A855F7", marginTop: 2 }}>
                    {sched}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {Object.keys(muscleCounts).length > 0 && (
        <>
          <div className="sec-lbl">MUSCLE FREQUENCY</div>
          <div className="panel">
            <div style={{ padding: 18 }}>
              <div className="bar-chart">
                {Object.entries(muscleCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([m, c]) => (
                    <div key={m} className="bar-row" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div className="bar-lbl" style={{ width: 70, fontSize: 12, fontWeight: 600 }}>{m}</div>
                      <div className="bar-track" style={{ flex: 1, height: 8, background: "var(--surface)", borderRadius: 4, overflow: "hidden" }}>
                        <div
                          className="bar-fill"
                          style={{
                            height: "100%",
                            width: `${(c / maxMC) * 100}%`,
                            background: MUSCLE_GROUPS[m]?.color || "var(--accent)",
                            borderRadius: 4,
                            transition: "width 0.5s ease",
                          }}
                        />
                      </div>
                      <div
                        className="bar-val"
                        style={{
                          width: 25,
                          textAlign: "right",
                          fontWeight: 700,
                          fontSize: 12,
                          color: MUSCLE_GROUPS[m]?.color || "var(--accent)",
                        }}
                      >
                        {c}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}

      {store.achievements.length > 0 && (
        <>
          <div className="sec-lbl">RECENT TROPHIES</div>
          <div className="flex flex-wrap gap10 mb20">
            {store.achievements.slice(0, 4).map((a) => (
              <div
                key={a.id}
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--accent)",
                  borderRadius: 12,
                  padding: "9px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{a.name}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)" }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {ws.length === 0 && (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">🏋️</div>
          <div className="empty-state-title">READY FOR YOUR FIRST WORKOUT?</div>
          <div className="empty-state-text">
            Log your workouts to unlock frequency charts, streak heatmaps, and achievement badges!
          </div>
          {setTab && (
            <button className="btn btn-acc btn-lg" onClick={() => setTab("workout")}>
              Start Logging Now ➔
            </button>
          )}
        </div>
      )}
    </div>
  );
}
