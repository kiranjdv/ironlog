import SetRowComp from "./SetRowComp";
import { uid } from "../utils/helpers";

export default function ExerciseCard({ exercise, muscleColor, onUpdate, onRemove, prs, unit, onSetDone, workouts }) {
  const addSet = (type) => onUpdate({ ...exercise, sets: [...exercise.sets, { id: uid(), type, weight: "", reps: "", sets: 1, done: false }] });
  const updSet = (id, data) => onUpdate({ ...exercise, sets: exercise.sets.map(s => s.id === id ? data : s) });
  const remSet = (id) => onUpdate({ ...exercise, sets: exercise.sets.filter(s => s.id !== id) });

  const hasPR = exercise.sets.some(s => s.done && s.weight && prs[exercise.name] && parseFloat(s.weight) > (prs[exercise.name]?.weight || 0));

  // Find the last time this exercise was performed in past workouts
  const lastWorkout = [...(workouts || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .find(w => w.exercises?.some(e => e.name === exercise.name));

  const lastWorkoutEx = lastWorkout?.exercises?.find(e => e.name === exercise.name);

  const groups = [
    { type: "warmup", label: "Warm-up Sets", color: "#F59E0B", sets: exercise.sets.filter(s => s.type === "warmup") },
    { type: "working", label: "Working Sets", color: "var(--accent)", sets: exercise.sets.filter(s => s.type === "working") },
    { type: "superset", label: "Supersets", color: "#A855F7", sets: exercise.sets.filter(s => s.type === "superset") },
    { type: "dropset", label: "Dropsets", color: "#FF4D6D", sets: exercise.sets.filter(s => s.type === "dropset") },
  ].filter(g => g.sets.length > 0);

  return (
    <div className="ex-card">
      <div className="ex-hdr">
        <div>
          <div className="flex gap8">
            <div className="ex-name">{exercise.name}</div>
            {hasPR && <span className="pr-badge">⚡ NEW PR</span>}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{exercise.muscle}</div>
          {lastWorkout && (
            <div style={{ fontSize: 10, color: "var(--accent)", marginTop: 4, display: "flex", gap: 4, alignItems: "center" }}>
              <span>⏮ Last:</span>
              <span style={{ fontWeight: 600 }}>{lastWorkout.date}</span>
              <span>·</span>
              <span>{lastWorkoutEx.sets?.length || 0} sets</span>
            </div>
          )}
        </div>
        <div className="flex gap8">
          <span className="ex-tag" style={{ background: muscleColor + "22", color: muscleColor }}>{exercise.muscle}</span>
          <button className="btn-x" onClick={onRemove}>×</button>
        </div>
      </div>
      <div className="sets-wrap">
        {groups.map(g => (
          <div key={g.type} className="mb12">
            <div style={{ fontSize: 10, color: g.color, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 6 }}>{g.label}</div>
            <div className="sets-hdr"><span>Set</span><span>{unit}</span><span>Reps</span><span>Sets</span><span style={{ textAlign: "center" }}>✓</span></div>
            {g.sets.map((s, i) => {
              const prevSetsOfType = lastWorkoutEx?.sets?.filter(ps => ps.type === g.type) || [];
              const prevSet = prevSetsOfType[i];
              return (
                <SetRowComp key={s.id} set={s} idx={i}
                  onChange={d => { updSet(s.id, d); if (d.done && !s.done) onSetDone(); }}
                  onRemove={() => remSet(s.id)}
                  prs={prs} exName={exercise.name} unit={unit}
                  prevSet={prevSet} />
              );
            })}
          </div>
        ))}
        {exercise.sets.length === 0 && <div style={{ color: "var(--muted)", fontSize: 12, padding: "7px 0" }}>Add a set below</div>}
        <div className="add-sets">
          <button className="btn btn-out" onClick={() => addSet("warmup")}>+ Warm-up</button>
          <button className="btn btn-acc" onClick={() => addSet("working")}>+ Working</button>
          <button className="btn btn-purple" onClick={() => addSet("superset")}>+ Superset</button>
          <button className="btn" style={{ background: "rgba(255,77,109,.1)", border: "1px solid var(--accent2)", color: "var(--accent2)" }} onClick={() => addSet("dropset")}>+ Dropset</button>
          <button className="btn btn-danger" style={{ marginLeft: "auto" }} onClick={onRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}
