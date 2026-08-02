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

  return (
    <div className="set-row">
      <div className={`set-lbl ${labelClass}`}>{prefix}{idx + 1}</div>
      <input className={`set-inp ${isPR ? "pr" : ""}`} type="number" placeholder={placeholderWeight} value={set.weight} onChange={e => onChange({ ...set, weight: e.target.value })} />
      <input className="set-inp" type="number" placeholder={placeholderReps} value={set.reps} onChange={e => onChange({ ...set, reps: e.target.value })} />
      <input className="set-inp" type="number" placeholder="sets" value={set.sets} onChange={e => onChange({ ...set, sets: e.target.value })} />
      <button className={`set-done ${set.done ? "chk" : ""}`} onClick={() => onChange({ ...set, done: !set.done })}><CheckSVG checked={set.done} /></button>
    </div>
  );
}
