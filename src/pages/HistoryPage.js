import { MUSCLE_GROUPS } from "../constants/workoutData";
import { fmtDate } from "../utils/helpers";

export default function HistoryPage({ store, setTab }) {
  const ws = [...store.workouts].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!ws.length) {
    return (
      <div className="page">
        <div className="page-title">HISTORY</div>
        <div className="page-sub">Your training timeline</div>
        <div className="empty-state-card">
          <div className="empty-icon-wrap">📋</div>
          <div className="empty-state-title">NO WORKOUTS RECORDED YET</div>
          <div className="empty-state-text">
            Start logging your workouts to build your history, streaks, and personal records.
          </div>
          {setTab && (
            <button className="btn btn-acc" onClick={() => setTab("workout")}>
              Start a Workout Now ➔
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-title">HISTORY</div>
      <div className="page-sub">
        {ws.length} workout{ws.length !== 1 ? "s" : ""} logged
      </div>
      {ws.map((w) => {
        const muscles = [...new Set(w.exercises.map((e) => e.muscle))];
        const totalSets = w.exercises.reduce(
          (a, e) => a + e.sets.filter((s) => s.done).length,
          0
        );
        return (
          <div key={w.id} className="hist-card">
            <div className="hist-date">{fmtDate(w.date)}</div>
            <div className="flex gap16 mb12">
              {[
                { l: "Exercises", v: w.exercises.length },
                { l: "Sets Done", v: totalSets },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--muted)",
                      letterSpacing: 1.2,
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    {s.l}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 26,
                      color: "var(--accent)",
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
            <div className="tag-row">
              {muscles.map((m) => (
                <span
                  key={m}
                  className="mtag"
                  style={{
                    background: (MUSCLE_GROUPS[m]?.color || "#888") + "22",
                    color: MUSCLE_GROUPS[m]?.color || "#888",
                  }}
                >
                  {MUSCLE_GROUPS[m]?.icon} {m}
                </span>
              ))}
            </div>
            <div className="tag-row">
              {w.exercises.map((e) => (
                <span key={e.id} className="tag">
                  {e.name}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
