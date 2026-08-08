import { useState, useEffect, useRef } from "react";
import { fmtTime } from "../utils/helpers";

export default function RestTimer({ onDone }) {
  const [totalSec, setTotalSec] = useState(90);
  const [sec, setSec] = useState(90);
  const [running, setRunning] = useState(true);
  const ivRef = useRef(null);

  useEffect(() => {
    if (running && sec > 0) {
      ivRef.current = setInterval(() => {
        setSec((s) => {
          if (s <= 1) {
            clearInterval(ivRef.current);
            setRunning(false);
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ivRef.current);
  }, [running, sec]);

  const reset = (t) => {
    clearInterval(ivRef.current);
    setTotalSec(t);
    setSec(t);
    setRunning(true);
  };

  const progress = totalSec > 0 ? ((totalSec - sec) / totalSec) * 100 : 100;
  const strokeDashoffset = 283 - (283 * progress) / 100;

  return (
    <div className="rest-ov" onClick={onDone}>
      <div className="rest-card" onClick={(e) => e.stopPropagation()}>
        <div className="rest-ring-wrap">
          <svg className="rest-ring-svg" viewBox="0 0 100 100">
            <circle
              className="rest-ring-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="rest-ring-progress"
              cx="50"
              cy="50"
              r="45"
              style={{ strokeDashoffset }}
            />
          </svg>
          <div className="rest-time-content">
            <div className="rest-time">{fmtTime(sec)}</div>
            <div className="rest-lbl">REST TIMER</div>
          </div>
        </div>

        <div className="rest-presets">
          {[30, 60, 90, 120, 180].map((t) => (
            <button
              key={t}
              className={`btn btn-sm ${totalSec === t ? "btn-acc" : "btn-out"}`}
              onClick={() => reset(t)}
            >
              {t}s
            </button>
          ))}
        </div>

        <div className="flex gap10" style={{ justifyContent: "center", marginTop: 8 }}>
          <button
            className="btn btn-out btn-sm"
            onClick={() => setSec((s) => s + 15)}
          >
            +15s
          </button>
          <button className="btn btn-primary btn-sm" onClick={onDone}>
            {sec === 0 ? "Done ✓" : "Skip Rest"}
          </button>
        </div>

        {sec === 0 && (
          <div className="rest-times-up">
            🔔 REST TIME OVER! GO LIFT!
          </div>
        )}
      </div>
    </div>
  );
}
