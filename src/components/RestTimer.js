import { useState, useEffect, useRef } from "react";
import { fmtTime } from "../utils/helpers";

export default function RestTimer({ onDone }) {
  const [sec, setSec] = useState(90);
  const [custom, setCustom] = useState(90);
  const [running, setRunning] = useState(true);
  const ivRef = useRef(null);
  useEffect(() => {
    if (running && sec > 0) {
      ivRef.current = setInterval(() => setSec(s => { if (s <= 1) { clearInterval(ivRef.current); setRunning(false); return 0; } return s - 1; }), 1000);
    }
    return () => clearInterval(ivRef.current);
  }, [running, sec]);
  const reset = (t) => { clearInterval(ivRef.current); setSec(t); setCustom(t); setRunning(true); };
  return (
    <div className="rest-ov" onClick={onDone}>
      <div className="rest-circle" onClick={e => e.stopPropagation()}>
        <div className="rest-time">{fmtTime(sec)}</div>
        <div className="rest-lbl">REST</div>
      </div>
      <div className="flex gap8" onClick={e => e.stopPropagation()}>
        {[60, 90, 120, 180].map(t => <button key={t} className={`btn ${custom === t ? "btn-acc" : "btn-out"}`} onClick={() => reset(t)}>{t}s</button>)}
      </div>
      <button className="btn btn-out" onClick={onDone}>Skip Rest</button>
      {sec === 0 && <div style={{ color: "var(--accent)", fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, letterSpacing: 2 }}>TIME'S UP! 🔔</div>}
    </div>
  );
}
