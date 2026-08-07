import CheckSVG from "./CheckSVG";

export default function SetRowComp({ set, idx, onChange, onRemove, prs, exName, unit, prevSet }) {
  const isWarmup = set.type === "warmup";
  const isSuper = set.type === "superset";
  const isDrop = set.type === "dropset";
  const isPR = prs[exName] && parseFloat(set.weight) > (prs[exName]?.weight || 0) && set.done;
  const labelClass = isWarmup ? "wu" : isSuper ? "sup" : isDrop ? "drp" : "";
  const prefix = isWarmup ? "W" : isSuper ? "SS" : isDrop ? "DS" : "S";

  const placeholderWeight = prevSet && prevSet.weight ? prevSet.weight : unit;
  const placeholderReps = prevSet && prevSet.reps ? prevSet.reps : "reps";

  const handleWeightChange = (e) => {
    const val = e.target.value;
    if (val !== "" && parseFloat(val) < 0) return;
    onChange({ ...set, weight: val });
  };

  const handleRepsChange = (e) => {
    const val = e.target.value;
    if (val !== "" && parseInt(val) < 0) return;
    onChange({ ...set, reps: val });
  };

  const handleSetsChange = (e) => {
    const val = e.target.value;
    if (val !== "" && parseInt(val) < 0) return;
    onChange({ ...set, sets: val });
  };

  return (
    <div className="set-row">
      <div className={`set-lbl ${labelClass}`}>{prefix}{idx + 1}</div>
      <input className={`set-inp ${isPR ? "pr" : ""}`} type="number" min="0" placeholder={placeholderWeight} value={set.weight} onChange={handleWeightChange} />
      <input className="set-inp" type="number" min="0" placeholder={placeholderReps} value={set.reps} onChange={handleRepsChange} />
      <input className="set-inp" type="number" min="0" placeholder="sets" value={set.sets} onChange={handleSetsChange} />
      <button className={`set-done ${set.done ? "chk" : ""}`} onClick={() => onChange({ ...set, done: !set.done })}><CheckSVG checked={set.done} /></button>
    </div>
  );
}
