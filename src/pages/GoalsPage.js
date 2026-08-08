import { useState } from "react";
import { ACHIEVEMENTS } from "../constants/workoutData";

export default function GoalsPage({ store, setTab }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    exercise: "",
    targetWeight: "",
    targetReps: "",
    notes: "",
  });

  const addGoal = () => {
    if (
      !form.exercise.trim() ||
      !form.targetWeight ||
      parseFloat(form.targetWeight) <= 0 ||
      !form.targetReps ||
      parseInt(form.targetReps) <= 0
    )
      return;
    store.addGoal({
      ...form,
      exercise: form.exercise.trim(),
      targetWeight: parseFloat(form.targetWeight),
      targetReps: parseInt(form.targetReps),
    });
    setForm({ exercise: "", targetWeight: "", targetReps: "", notes: "" });
    setShowAdd(false);
  };

  const isInvalid =
    !form.exercise.trim() ||
    !form.targetWeight ||
    parseFloat(form.targetWeight) <= 0 ||
    !form.targetReps ||
    parseInt(form.targetReps) <= 0;

  const getProgress = (goal) => {
    const pr = store.prs[goal.exercise];
    if (!pr || !goal.targetWeight) return 0;
    return Math.min(
      100,
      Math.round((pr.weight / parseFloat(goal.targetWeight)) * 100)
    );
  };

  return (
    <div className="page">
      <div className="page-title">GOALS & ACHIEVEMENTS</div>
      <div className="page-sub">Set your targets. Smash your limits.</div>

      <div className="sec-lbl">TROPHY CABINET</div>
      <div className="ach-grid mb24">
        {ACHIEVEMENTS.map((a) => {
          const earned = a.check(store.workouts, store.prs);
          return (
            <div
              key={a.id}
              className={`ach-card ${earned ? "earned" : "locked"}`}
            >
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-name">{a.name}</div>
              <div className="ach-desc">{a.desc}</div>
              {earned && (
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--accent)",
                    marginTop: 6,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                  }}
                >
                  ✓ UNLOCKED
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex-sb mb16">
        <div className="sec-lbl" style={{ marginBottom: 0, flex: 1 }}>
          EXERCISE STRENGTH GOALS
        </div>
        <button className="btn btn-acc" onClick={() => setShowAdd(true)}>
          + New Goal
        </button>
      </div>

      {store.goals.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">🎯</div>
          <div className="empty-state-title">NO GOALS SET YET</div>
          <div className="empty-state-text">
            Setting targets on key compound lifts keeps you accountable and motivated.
          </div>
          <button className="btn btn-acc" onClick={() => setShowAdd(true)}>
            + Create Your First Goal
          </button>
        </div>
      ) : (
        store.goals.map((g) => {
          const prog = getProgress(g);
          const pr = store.prs[g.exercise];
          return (
            <div key={g.id} className="goal-card">
              <div className="flex-sb">
                <div>
                  <div className="goal-title">{g.exercise}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    Target: {g.targetWeight}
                    {store.settings.unit} × {g.targetReps} reps
                  </div>
                </div>
                <div className="flex gap10">
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 26,
                        color: "var(--accent)",
                      }}
                    >
                      {prog}%
                    </div>
                    {pr && (
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>
                        Current PR: {pr.weight}
                        {store.settings.unit}
                      </div>
                    )}
                  </div>
                  <button className="btn-x" onClick={() => store.deleteGoal(g.id)}>
                    ×
                  </button>
                </div>
              </div>
              <div className="goal-track">
                <div className="goal-fill" style={{ width: `${prog}%` }} />
              </div>
              {g.notes && (
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
                  {g.notes}
                </div>
              )}
            </div>
          );
        })
      )}

      {showAdd && (
        <div className="modal-ov" onClick={() => setShowAdd(false)}>
          <div
            className="modal"
            style={{ maxWidth: 420 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-hdr">
              <div className="modal-title">SET A NEW GOAL</div>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {[
                {
                  l: "Exercise",
                  k: "exercise",
                  ph: "e.g. Bench Press",
                  t: "text",
                },
                {
                  l: `Target Weight (${store.settings.unit})`,
                  k: "targetWeight",
                  ph: "e.g. 100",
                  t: "number",
                },
                {
                  l: "Target Reps",
                  k: "targetReps",
                  ph: "e.g. 5",
                  t: "number",
                },
                {
                  l: "Personal Notes",
                  k: "notes",
                  ph: "e.g. By end of December",
                  t: "text",
                },
              ].map((f) => (
                <div key={f.k} className="mb12">
                  <div className="il">{f.l}</div>
                  <input
                    className="inp"
                    type={f.t}
                    placeholder={f.ph}
                    value={form[f.k]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.k]: e.target.value }))
                    }
                  />
                </div>
              ))}
              <button
                className="btn btn-acc"
                style={{ width: "100%", padding: 13, marginTop: 8 }}
                onClick={addGoal}
                disabled={isInvalid}
              >
                Create Target
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
