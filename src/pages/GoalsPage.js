import { useState } from "react";
import { ACHIEVEMENTS } from "../constants/workoutData";

export default function GoalsPage({ store }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ exercise: "", targetWeight: "", targetReps: "", notes: "" });
  const addGoal = () => { if (!form.exercise) return; store.addGoal({ ...form }); setForm({ exercise: "", targetWeight: "", targetReps: "", notes: "" }); setShowAdd(false); };
  const getProgress = (goal) => { const pr = store.prs[goal.exercise]; if (!pr || !goal.targetWeight) return 0; return Math.min(100, Math.round((pr.weight / parseFloat(goal.targetWeight)) * 100)); };
  return (
    <div className="page">
      <div className="page-title">GOALS</div>
      <div className="page-sub">Set targets. Smash them.</div>
      <div className="sec-lbl">ACHIEVEMENTS</div>
      <div className="ach-grid mb20">
        {ACHIEVEMENTS.map(a => {
          const earned = a.check(store.workouts, store.prs);
          return (
            <div key={a.id} className={`ach-card ${earned ? "earned" : "locked"}`}>
              <div className="ach-icon">{a.icon}</div>
              <div className="ach-name">{a.name}</div>
              <div className="ach-desc">{a.desc}</div>
              {earned && <div style={{ fontSize: 10, color: "var(--accent)", marginTop: 5, fontWeight: 700 }}>✓ EARNED</div>}
            </div>
          );
        })}
      </div>
      <div className="flex-sb mb16">
        <div className="sec-lbl" style={{ marginBottom: 0, flex: 1 }}>EXERCISE GOALS</div>
        <button className="btn btn-acc" onClick={() => setShowAdd(true)}>+ Add Goal</button>
      </div>
      {store.goals.length === 0
        ? <div className="empty-state"><div className="empty-icon">🎯</div><p>Set your first goal!</p></div>
        : store.goals.map(g => {
          const prog = getProgress(g), pr = store.prs[g.exercise];
          return (
            <div key={g.id} className="goal-card">
              <div className="flex-sb">
                <div><div className="goal-title">{g.exercise}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>Target: {g.targetWeight}{store.settings.unit} × {g.targetReps} reps</div></div>
                <div className="flex gap8">
                  <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, color: "var(--accent)" }}>{prog}%</div>{pr && <div style={{ fontSize: 10, color: "var(--muted)" }}>Best: {pr.weight}{store.settings.unit}</div>}</div>
                  <button className="btn-x" onClick={() => store.deleteGoal(g.id)}>×</button>
                </div>
              </div>
              <div className="goal-track"><div className="goal-fill" style={{ width: `${prog}%` }} /></div>
              {g.notes && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>{g.notes}</div>}
            </div>
          );
        })}
      {showAdd && (
        <div className="modal-ov" onClick={() => setShowAdd(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
            <div className="modal-hdr"><div className="modal-title">NEW GOAL</div><button className="btn-ghost" onClick={() => setShowAdd(false)}>✕</button></div>
            <div className="modal-body">
              {[{ l: "Exercise", k: "exercise", ph: "e.g. Bench Press", t: "text" }, { l: `Target Weight (${store.settings.unit})`, k: "targetWeight", ph: "e.g. 100", t: "number" }, { l: "Target Reps", k: "targetReps", ph: "e.g. 5", t: "number" }, { l: "Notes", k: "notes", ph: "Optional...", t: "text" }].map(f => (
                <div key={f.k} className="mb12"><div className="il">{f.l}</div><input className="inp" type={f.t} placeholder={f.ph} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} /></div>
              ))}
              <button className="btn btn-acc" style={{ width: "100%", padding: 11 }} onClick={addGoal}>Create Goal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
