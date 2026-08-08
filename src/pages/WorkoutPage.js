import { useState, useEffect } from "react";
import { MUSCLE_GROUPS } from "../constants/workoutData";
import { fmtDate, fmtTime, uid } from "../utils/helpers";
import ExerciseCard from "../components/ExerciseCard";
import RestTimer from "../components/RestTimer";
import CelebrationModal from "../components/CelebrationModal";

export default function WorkoutPage({ store, setTab }) {
  const {
    active,
    timerOn,
    startTime,
    startWorkout,
    updateActiveWorkout,
    finishActiveWorkout,
    cancelActiveWorkout,
  } = store;

  const [showPicker, setShowPicker] = useState(false);
  const [selMuscle, setSelMuscle] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showFinish, setShowFinish] = useState(false);
  const [showRest, setShowRest] = useState(false);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customMuscle, setCustomMuscle] = useState("Chest");
  const [lastFinishedWorkout, setLastFinishedWorkout] = useState(null);
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
    const updated = {
      ...active,
      exercises: [...active.exercises, { id: uid(), name, muscle, sets: [] }],
    };
    updateActiveWorkout(updated);
    setShowPicker(false);
    setSelMuscle(null);
  };

  const updEx = (id, data) => {
    const updated = {
      ...active,
      exercises: active.exercises.map((e) => (e.id === id ? data : e)),
    };
    updateActiveWorkout(updated);
  };

  const remEx = (id) => {
    const updated = {
      ...active,
      exercises: active.exercises.filter((e) => e.id !== id),
    };
    updateActiveWorkout(updated);
  };

  const addCustomEx = () => {
    if (!customName.trim()) return;
    store.addCustomExercise(customMuscle, customName.trim());
    addExercise(customName.trim(), customMuscle);
    setCustomName("");
    setShowCustom(false);
  };

  const allExercises = (muscle) => [
    ...(MUSCLE_GROUPS[muscle]?.exercises || []),
    ...(store.customExercises[muscle] || []),
  ];

  const finishWorkout = () => {
    const completedSnapshot = {
      ...active,
      duration: timer,
    };
    finishActiveWorkout();
    setShowFinish(false);
    setLastFinishedWorkout(completedSnapshot);
  };

  if (!active) {
    return (
      <div className="page">
        {lastFinishedWorkout && (
          <CelebrationModal
            workoutData={lastFinishedWorkout}
            onClose={() => setLastFinishedWorkout(null)}
            onNavigateHistory={() => {
              setLastFinishedWorkout(null);
              if (setTab) setTab("history");
            }}
          />
        )}
        <div className="page-title">WORKOUT</div>
        <div className="page-sub">Choose how to start your training today</div>

        <div className="two-col mb24">
          <div
            className="stat-card"
            style={{ "--sc": "var(--accent)", cursor: "pointer" }}
            onClick={() => startWorkout(null)}
          >
            <div style={{ padding: "16px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>⚡</div>
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 24,
                  letterSpacing: 2,
                  marginBottom: 6,
                  color: "var(--accent)",
                }}
              >
                QUICK START
              </div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>
                Start an empty session, add exercises on the fly
              </div>
              <button
                className="btn btn-acc"
                style={{ marginTop: 18, width: "100%" }}
                onClick={(e) => {
                  e.stopPropagation();
                  startWorkout(null);
                }}
              >
                Start Empty Workout ➔
              </button>
            </div>
          </div>

          <div>
            <div className="sec-lbl">SAVED ROUTINES & TEMPLATES</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {Object.entries(store.templates).map(([name, tmpl]) => {
                const isCustom = !!store.customTemplates[name];
                return (
                  <button
                    key={name}
                    className="btn btn-out"
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: 12,
                      fontSize: 13,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "var(--card)",
                    }}
                    onClick={() => startWorkout(tmpl)}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3, color: "var(--text)" }}>
                        {name}{" "}
                        {isCustom && (
                          <span
                            style={{
                              fontSize: 9,
                              background: "rgba(200,255,0,0.15)",
                              color: "var(--accent)",
                              padding: "2px 6px",
                              borderRadius: 8,
                              marginLeft: 6,
                              fontWeight: 800,
                              letterSpacing: 0.5,
                            }}
                          >
                            CUSTOM
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>
                        {tmpl.exercises.length} exercises · {tmpl.muscles.join(", ")}
                      </div>
                    </div>
                    <div style={{ fontSize: 16, color: "var(--accent)", fontWeight: 800 }}>▶</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="flex-sb mb20">
        <div>
          <div className="page-title">ACTIVE SESSION</div>
          <div className="page-sub">{fmtDate(active.date)}</div>
        </div>
        <div className="flex gap10">
          <button className="btn btn-out" onClick={() => setShowPicker(true)}>
            + Exercise
          </button>
          <button className="btn btn-acc" onClick={() => setShowFinish(true)}>
            Finish Workout ✓
          </button>
        </div>
      </div>

      {active.exercises.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">💪</div>
          <div className="empty-state-title">YOUR WORKOUT IS EMPTY</div>
          <div className="empty-state-text">
            Add exercises to start tracking sets, weights, and reps.
          </div>
          <button className="btn btn-acc" onClick={() => setShowPicker(true)}>
            + Add First Exercise
          </button>
        </div>
      ) : (
        active.exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            muscleColor={MUSCLE_GROUPS[ex.muscle]?.color || "#888"}
            onUpdate={(d) => updEx(ex.id, d)}
            onRemove={() => remEx(ex.id)}
            prs={store.prs}
            unit={unit}
            onSetDone={() => setShowRest(true)}
            workouts={store.workouts}
          />
        ))
      )}

      {/* Floating Bottom Timer Bar */}
      <div className="timer-bar">
        <div style={{ fontSize: 10, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}>
          ELAPSED
        </div>
        <div className="timer-val">{fmtTime(timer)}</div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-out btn-sm" onClick={() => setShowRest(true)}>
          ⏱ Rest Timer
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            if (window.confirm("Are you sure you want to discard this workout session?")) {
              cancelActiveWorkout();
            }
          }}
        >
          Cancel
        </button>
      </div>

      {showRest && <RestTimer onDone={() => setShowRest(false)} />}

      {/* Exercise Picker Modal */}
      {showPicker && (
        <div
          className="modal-ov"
          onClick={() => {
            setShowPicker(false);
            setSelMuscle(null);
          }}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-title">
                {selMuscle
                  ? `${MUSCLE_GROUPS[selMuscle]?.icon} ${selMuscle}`
                  : "SELECT MUSCLE GROUP"}
              </div>
              <div className="flex gap8">
                <button className="btn btn-out btn-sm" onClick={() => setShowCustom(true)}>
                  + Custom
                </button>
                <button
                  className="btn-ghost"
                  onClick={() => {
                    setShowPicker(false);
                    setSelMuscle(null);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-body">
              {!selMuscle ? (
                <div className="muscle-grid">
                  {Object.entries(MUSCLE_GROUPS).map(([m, g]) => (
                    <div
                      key={m}
                      className="muscle-card"
                      style={{ "--mgc": g.color }}
                      onClick={() => setSelMuscle(m)}
                    >
                      <div className="muscle-icon">{g.icon}</div>
                      <div className="muscle-name">{m}</div>
                      <div className="muscle-cnt">{allExercises(m).length} exercises</div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <button className="btn btn-out mb12" onClick={() => setSelMuscle(null)}>
                    ← Back to Muscle Groups
                  </button>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {allExercises(selMuscle).map((ex) => (
                      <button
                        key={ex}
                        style={{
                          padding: "12px 16px",
                          background: "var(--surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 10,
                          color: "var(--text)",
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: 14,
                          fontWeight: 500,
                          cursor: "pointer",
                          textAlign: "left",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => {
                          addExercise(ex, selMuscle);
                          setSelMuscle(null);
                        }}
                      >
                        <span>{ex}</span>
                        <span style={{ color: "var(--accent)", fontSize: 18, fontWeight: 700 }}>+</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Exercise Modal */}
      {showCustom && (
        <div className="modal-ov" onClick={() => setShowCustom(false)}>
          <div className="modal" style={{ maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-title">NEW CUSTOM EXERCISE</div>
              <button className="btn-ghost" onClick={() => setShowCustom(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="mb12">
                <div className="il">Exercise Name</div>
                <input
                  className="inp"
                  placeholder="e.g. Incline Cable Fly"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
              <div className="mb16">
                <div className="il">Target Muscle</div>
                <select
                  className="inp"
                  value={customMuscle}
                  onChange={(e) => setCustomMuscle(e.target.value)}
                >
                  {Object.keys(MUSCLE_GROUPS).map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-acc"
                style={{ width: "100%", padding: 12 }}
                onClick={addCustomEx}
                disabled={!customName.trim()}
              >
                Add & Add to Workout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finish Workout Summary Modal */}
      {showFinish && (
        <div className="modal-ov" onClick={() => setShowFinish(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-title">FINISH WORKOUT?</div>
              <button className="btn-ghost" onClick={() => setShowFinish(false)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="two-col mb16">
                {[
                  { l: "Duration", v: fmtTime(timer) },
                  { l: "Exercises", v: active.exercises.length },
                  {
                    l: "Total Sets",
                    v: active.exercises.reduce((a, e) => a + e.sets.length, 0),
                  },
                  {
                    l: "Sets Done",
                    v: active.exercises.reduce(
                      (a, e) => a + e.sets.filter((s) => s.done).length,
                      0
                    ),
                  },
                ].map((s) => (
                  <div key={s.l} className="stat-card" style={{ "--sc": "var(--accent)" }}>
                    <div className="stat-lbl">{s.l}</div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 28,
                        color: "var(--accent)",
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary btn-lg" onClick={finishWorkout}>
                SAVE WORKOUT ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
