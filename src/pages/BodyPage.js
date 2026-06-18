import { useState } from "react";
import LineChart from "../components/LineChart";

export default function BodyPage({ store }) {
  const { unit } = store.settings;
  const [form, setForm] = useState({ weight: "", bodyFat: "", chest: "", waist: "", hips: "", arms: "", legs: "" });
  const [saved, setSaved] = useState(false);
  const latest = store.bodyLog.slice(-1)[0] || {};
  const prev = store.bodyLog.slice(-2, -1)[0] || {};
  const diff = (key) => { const l = parseFloat(latest[key] || 0), p = parseFloat(prev[key] || 0); if (!l || !p) return null; const d = (l - p).toFixed(1); return d > 0 ? `+${d}` : `${d}`; };
  const save = () => {
    if (!Object.values(form).some(v => v.trim())) return;
    store.addBodyEntry(form);
    setForm({ weight: "", bodyFat: "", chest: "", waist: "", hips: "", arms: "", legs: "" });
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };
  const weightData = store.bodyLog.filter(b => b.weight).slice(-10).map(b => ({ x: b.date?.slice(5) || "", y: parseFloat(b.weight) }));
  return (
    <div className="page">
      <div className="page-title">BODY TRACKING</div>
      <div className="page-sub">Monitor your physique</div>
      {Object.keys(latest).length > 0 && (
        <>
          <div className="sec-lbl">LATEST MEASUREMENTS</div>
          <div className="body-grid mb20">
            {[{ l: `Weight (${unit})`, k: "weight" }, { l: "Body Fat %", k: "bodyFat" }, { l: "Chest", k: "chest" }, { l: "Waist", k: "waist" }, { l: "Arms", k: "arms" }, { l: "Legs", k: "legs" }].map(m => (
              <div key={m.k} className="body-metric">
                <div className="bm-lbl">{m.l}</div>
                <div className="bm-val">{latest[m.k] || "—"}</div>
                {diff(m.k) && <div style={{ fontSize: 11, marginTop: 3, color: diff(m.k)?.startsWith("+") ? "#FF4D6D" : "var(--accent)" }}>{diff(m.k)}</div>}
              </div>
            ))}
          </div>
          {weightData.length >= 2 && <>
            <div className="sec-lbl">WEIGHT TREND</div>
            <div className="panel mb20"><div style={{ padding: 16 }}><LineChart data={weightData} color="var(--accent)" label={unit} /></div></div>
          </>}
        </>
      )}
      <div className="sec-lbl">LOG TODAY</div>
      <div className="panel">
        <div style={{ padding: 18 }}>
          <div className="two-col">
            {[{ l: `Weight (${unit})`, k: "weight", ph: "e.g. 75" }, { l: "Body Fat %", k: "bodyFat", ph: "e.g. 15" }, { l: "Chest", k: "chest", ph: "cm/in" }, { l: "Waist", k: "waist", ph: "cm/in" }, { l: "Arms", k: "arms", ph: "cm/in" }, { l: "Legs", k: "legs", ph: "cm/in" }].map(f => (
              <div key={f.k}><div className="il">{f.l}</div><input className="inp" type="number" placeholder={f.ph} value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} /></div>
            ))}
          </div>
          <button className="btn btn-acc mt16" style={{ padding: "11px 26px" }} onClick={save}>{saved ? "✓ Saved!" : "Save Measurements"}</button>
        </div>
      </div>
    </div>
  );
}
