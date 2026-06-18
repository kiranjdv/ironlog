import { useState } from "react";
import { MUSCLE_GROUPS } from "../constants/workoutData";
import { todayStr, DAYS_SHORT } from "../utils/helpers";

export default function PlannerPage({ store }) {
  const [selDay, setSelDay] = useState(null);
  const [selTemplate, setSelTemplate] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newTmplName, setNewTmplName] = useState("");
  const [newTmplExercises, setNewTmplExercises] = useState([]);
  const [activeMuscleTab, setActiveMuscleTab] = useState("Chest");

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
  const scheduleDay = () => {
    if (!selDay || !selTemplate) return;
    store.scheduleWorkout(selDay, selTemplate);
    setSelDay(null);
    setSelTemplate("");
  };

  const allExercisesForMuscle = (muscle) => [
    ...(MUSCLE_GROUPS[muscle]?.exercises || []),
    ...(store.customExercises[muscle] || [])
  ];

  const handleSave = () => {
    if (!newTmplName.trim()) return alert("Please enter a template name.");
    if (newTmplExercises.length === 0) return alert("Please select at least one exercise.");
    if (store.templates[newTmplName.trim()]) return alert("A template with this name already exists.");
    store.addCustomTemplate(newTmplName.trim(), newTmplExercises);
    setNewTmplName("");
    setNewTmplExercises([]);
    setShowCreate(false);
  };

  return (
    <div className="page">
      <div className="page-title">PLANNER</div>
      <div className="page-sub">Schedule your training week</div>
      <div className="sec-lbl">THIS WEEK</div>
      <div className="sched-grid mb20">
        {weekDates.map((d, i) => {
          const ds = d.toISOString().split("T")[0];
          const isToday = ds === todayStr(), plan = store.schedule[ds], worked = store.workouts.some(w => w.date === ds);
          return (
            <div key={i} className={`sched-day ${plan ? "has-plan" : ""} ${isToday ? "is-today" : ""}`} onClick={() => setSelDay(ds)}>
              <div className="sched-day-name">{DAYS_SHORT[i]}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{d.getDate()}</div>
              {worked && <div style={{ fontSize: 10, color: "var(--accent)", marginTop: 4 }}>✓ Done</div>}
              {plan && !worked && <div className="sched-plan">{plan}</div>}
              {!plan && !worked && <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>Rest</div>}
            </div>
          );
        })}
      </div>

      <div className="flex-sb mb16">
        <div className="sec-lbl" style={{ marginBottom: 0 }}>TEMPLATES</div>
        <button className="btn btn-acc" onClick={() => setShowCreate(true)}>+ Create Template</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="mb20">
        {Object.entries(store.templates).map(([name, tmpl]) => {
          const isCustom = !!store.customTemplates[name];
          return (
            <div key={name} className="panel">
              <div style={{ padding: 14 }}>
                <div className="flex-sb mb8">
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                      {name}
                      {isCustom && <span style={{ fontSize: 9, background: "rgba(200,255,0,0.15)", color: "var(--accent)", padding: "1px 6px", borderRadius: 10, fontWeight: 700 }}>CUSTOM</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{tmpl.muscles.join(" · ")}</div>
                  </div>
                  {isCustom && (
                    <button className="btn-x" onClick={() => store.deleteCustomTemplate(name)} title="Delete Template">×</button>
                  )}
                </div>
                <div className="tag-row">{tmpl.exercises.map(e => <span key={e} className="tag">{e}</span>)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {selDay && (
        <div className="modal-ov" onClick={() => setSelDay(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-hdr"><div className="modal-title">SCHEDULE {selDay}</div><button className="btn-ghost" onClick={() => setSelDay(null)}>✕</button></div>
            <div className="modal-body">
              <div className="mb16"><div className="il">Template</div>
                <select className="inp" value={selTemplate} onChange={e => setSelTemplate(e.target.value)}>
                  <option value="">-- Select --</option>
                  <option value="Rest Day">🛌 Rest Day</option>
                  {Object.keys(store.templates).map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
              <button className="btn btn-acc" style={{ width: "100%", padding: 11 }} onClick={scheduleDay}>Schedule</button>
            </div>
          </div>
        </div>
      )}

      {showCreate && (
        <div className="modal-ov" onClick={() => setShowCreate(false)}>
          <div className="modal" style={{ maxWidth: 450 }} onClick={e => e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-title">CREATE TEMPLATE</div>
              <button className="btn-ghost" onClick={() => setShowCreate(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="mb12">
                <div className="il">Template Name</div>
                <input className="inp" placeholder="e.g. Legs Hypertrophy" value={newTmplName} onChange={e => setNewTmplName(e.target.value)} />
              </div>
              <div className="mb12">
                <div className="il">Browse Exercises</div>
                <div className="nav-tabs mb12" style={{ gap: 4 }}>
                  {Object.keys(MUSCLE_GROUPS).map(m => (
                    <button key={m} className={`nav-tab ${activeMuscleTab === m ? "active" : ""}`} type="button" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => setActiveMuscleTab(m)}>
                      {MUSCLE_GROUPS[m].icon} {m}
                    </button>
                  ))}
                </div>
                <div style={{ maxHeight: 150, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5, padding: 2, background: "var(--surface)", borderRadius: 8 }}>
                  {allExercisesForMuscle(activeMuscleTab).map(ex => {
                    const added = newTmplExercises.includes(ex);
                    return (
                      <button key={ex} type="button" style={{ padding: "8px 12px", background: added ? "rgba(200,255,0,0.12)" : "transparent", border: "1px solid var(--border)", borderRadius: 7, color: "var(--text)", fontFamily: "'DM Sans',sans-serif", fontSize: 12, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={() => {
                          if (added) {
                            setNewTmplExercises(newTmplExercises.filter(e => e !== ex));
                          } else {
                            setNewTmplExercises([...newTmplExercises, ex]);
                          }
                        }}>
                        {ex} <span>{added ? "✓" : "+"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mb16">
                <div className="il">Selected Exercises ({newTmplExercises.length})</div>
                <div className="tag-row" style={{ minHeight: 40, border: "1px solid var(--border)", borderRadius: 8, padding: 8 }}>
                  {newTmplExercises.map(ex => (
                    <span key={ex} className="tag" style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                      {ex}
                      <button type="button" style={{ background: "none", border: "none", color: "var(--accent2)", cursor: "pointer", fontSize: 12, fontWeight: "bold" }} onClick={() => setNewTmplExercises(newTmplExercises.filter(e => e !== ex))}>×</button>
                    </span>
                  ))}
                  {newTmplExercises.length === 0 && <span style={{ color: "var(--muted)", fontSize: 12 }}>No exercises selected yet.</span>}
                </div>
              </div>
              <button className="btn btn-acc" style={{ width: "100%", padding: 11 }} onClick={handleSave}>Create Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
