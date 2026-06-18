import { useState, useEffect } from "react";
import { MUSCLE_GROUPS } from "../constants/workoutData";
import { fmtDate, fmtTime, uid } from "../utils/helpers";
import ExerciseCard from "../components/ExerciseCard";
import RestTimer from "../components/RestTimer";

export default function WorkoutPage({ store }) {
  const {
    active,
    timerOn,
    startTime,
    startWorkout,
    updateActiveWorkout,
    finishActiveWorkout
  } = store;

  const [showPicker, setShowPicker] = useState(false);
  const [selMuscle, setSelMuscle] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showFinish, setShowFinish] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customMuscle, setCustomMuscle] = useState("Chest");
  const { unit } = store.settings;

  useEffect(() => {
    if (!timerOn || !startTime) {
      setTimer(0);
      return;
    }
    setTimer(Math.floor((Date.now() - startTime) / 1000));
    const iv = setInterval(() => {
      setTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, [timerOn, startTime]);

  const addExercise = (name, muscle) => {
    const updated = { ...active, exercises: [...active.exercises, { id: uid(), name, muscle, sets: [] }] };
    updateActiveWorkout(updated);
    setShowPicker(false);
    setSelMuscle(null);
  };

  const updEx = (id, data) => {
    const updated = { ...active, exercises: active.exercises.map(e => e.id === id ? data : e) };
    updateActiveWorkout(updated);
  };

  const remEx = (id) => {
    const updated = { ...active, exercises: active.exercises.filter(e => e.id !== id) };
    updateActiveWorkout(updated);
  };

  const addCustomEx = () => {
    if (!customName.trim()) return;
    store.addCustomExercise(customMuscle, customName.trim());
    addExercise(customName.trim(), customMuscle);
    setCustomName("");
    setShowCustom(false);
  };

  const allExercises = (muscle) => [...(MUSCLE_GROUPS[muscle]?.exercises || []), ...(store.customExercises[muscle] || [])];

  const finishWorkout = () => {
    finishActiveWorkout();
    setShowFinish(false);
  };

  if (!active) return (
    <div className="page">
      <div className="page-title">WORKOUT</div>
      <div className="page-sub">Choose how to start</div>
      <div className="two-col mb20">
        <div className="panel" style={{ cursor: "pointer" }} onClick={() => startWorkout(null)}>
          <div style={{ padding: 26, textAlign: "center" }}>
            <div style={{ fontSize: 42, marginBottom: 11 }}>⚡</div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 21, letterSpacing: 2, marginBottom: 5 }}>EMPTY WORKOUT</div>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>Start fresh, add exercises manually</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {Object.entries(store.templates).map(([name, tmpl]) => {
            const isCustom = !!store.customTemplates[name];
            return (
              <button key={name} className="btn btn-out" style={{ textAlign: "left", padding: "11px 15px", borderRadius: 10, fontSize: 13, display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => startWorkout(tmpl)}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>
                    {name} {isCustom && <span style={{ fontSize: 9, background: "rgba(200,255,0,0.15)", color: "var(--accent)", padding: "1px 6px", borderRadius: 10, marginLeft: 6, fontWeight: 700, letterSpacing: 0.5 }}>CUSTOM</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{tmpl.exercises.length} exercises · {tmpl.muscles.join(", ")}</div>
                </div>
                <div style={{ fontSize: 16, color: "var(--accent)" }}>▶</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="flex-sb mb20">
        <div><div className="page-title">SESSION</div><div className="page-sub">{fmtDate(active.date)}</div></div>
        <div className="flex gap8">
          <button className="btn btn-out" onClick={() => setShowPicker(true)}>+ Exercise</button>
          <button className="btn btn-acc btn-lg" onClick={() => setShowFinish(true)}>Finish</button>
        </div>
      </div>
      {active.exercises.length === 0
        ? <div className="empty-state"><div className="empty-icon">💪</div><p>Click <strong>+ Exercise</strong> to begin</p></div>
        : active.exercises.map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} muscleColor={MUSCLE_GROUPS[ex.muscle]?.color || "#888"}
            onUpdate={d => updEx(ex.id, d)} onRemove={() => remEx(ex.id)}
            prs={store.prs} unit={unit} onSetDone={() => setShowRest(true)} />
        ))}
      <div className="timer-bar">
        <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted)" }}>TIME</div>
        <div className="timer-val">{fmtTime(timer)}</div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-out" onClick={() => setShowRest(true)}>⏱ Rest Timer</button>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>{active.exercises.length} ex</span>
      </div>
      {showRest && <RestTimer onDone={() => setShowRest(false)} />}
      {showPicker && (
        <div className="modal-ov" onClick={() => { setShowPicker(false); setSelMuscle(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-title">{selMuscle ? `${MUSCLE_GROUPS[selMuscle]?.icon} ${selMuscle}` : "SELECT MUSCLE"}</div>
              <div className="flex gap8">
                <button className="btn btn-out" onClick={() => setShowCustom(true)}>+ Custom</button>
                <button className="btn-ghost" onClick={() => { setShowPicker(false); setSelMuscle(null); }}>✕</button>
              </div>
            </div>
            <div className="modal-body">
              {!selMuscle
                ? <div className="muscle-grid">{Object.entries(MUSCLE_GROUPS).map(([m, g]) => (
                  <div key={m} className="muscle-card" style={{ "--mgc": g.color }} onClick={() => setSelMuscle(m)}>
                    <div className="muscle-icon">{g.icon}</div>
                    <div className="muscle-name">{m}</div>
                    <div className="muscle-cnt">{allExercises(m).length} exercises</div>
                  </div>
                ))}</div>
                : <>
                  <button className="btn btn-out mb12" onClick={() => setSelMuscle(null)}>← Back</button>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {allExercises(selMuscle).map(ex => (
                      <button key={ex} style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 9, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 13, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={() => { addExercise(ex, selMuscle); setSelMuscle(null); }}>
                        {ex} <span style={{ opacity: .4, fontSize: 17 }}>+</span>
                      </button>
                    ))}
                  </div>
                </>}
            </div>
          </div>
        </div>
      )}
      {showCustom && (
        <div className="modal-ov" onClick={() => setShowCustom(false)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-hdr"><div className="modal-title">ADD CUSTOM EXERCISE</div><button className="btn-ghost" onClick={() => setShowCustom(false)}>✕</button></div>
            <div className="modal-body">
              <div className="mb12"><div className="il">Name</div><input className="inp" placeholder="e.g. Reverse Curl" value={customName} onChange={e => setCustomName(e.target.value)} /></div>
              <div className="mb16"><div className="il">Muscle Group</div>
                <select className="inp" value={customMuscle} onChange={e => setCustomMuscle(e.target.value)}>{Object.keys(MUSCLE_GROUPS).map(m => <option key={m}>{m}</option>)}</select>
              </div>
              <button className="btn btn-acc" style={{ width: "100%", padding: 11 }} onClick={addCustomEx}>Add & Use</button>
            </div>
          </div>
        </div>
      )}
      {showFinish && (
        <div className="modal-ov" onClick={() => setShowFinish(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-hdr"><div className="modal-title">FINISH WORKOUT?</div><button className="btn-ghost" onClick={() => setShowFinish(false)}>✕</button></div>
            <div className="modal-body">
              <div className="two-col mb16">
                {[{ l: "Duration", v: fmtTime(timer) }, { l: "Exercises", v: active.exercises.length }, { l: "Total Sets", v: active.exercises.reduce((a, e) => a + e.sets.length, 0) }, { l: "Sets Done", v: active.exercises.reduce((a, e) => a + e.sets.filter(s => s.done).length, 0) }].map(s => (
                  <div key={s.l} className="stat-card" style={{ "--sc": "var(--accent)" }}><div className="stat-lbl">{s.l}</div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, color: "var(--accent)" }}>{s.v}</div></div>
                ))}
              </div>
              <button className="finish-btn" onClick={finishWorkout}>SAVE WORKOUT ✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
