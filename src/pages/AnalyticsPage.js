import { useState } from "react";
import { MUSCLE_GROUPS } from "../constants/workoutData";
import { getStreak } from "../utils/helpers";
import LineChart from "../components/LineChart";

export default function AnalyticsPage({ store }) {
  const ws = store.workouts;
  const { unit } = store.settings;
  const [selEx, setSelEx] = useState("");
  const allExNames = [...new Set(ws.flatMap(w => w.exercises.map(e => e.name)))];
  const progressData = selEx
    ? ws.filter(w => w.exercises.some(e => e.name === selEx)).sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(w => { const ex = w.exercises.find(e => e.name === selEx); const maxW = Math.max(0, ...ex.sets.filter(s => s.done && s.weight).map(s => parseFloat(s.weight))); return { x: w.date.slice(5), y: maxW }; }).filter(d => d.y > 0)
    : [];
  const volumeData = ws.slice(-8).sort((a, b) => new Date(a.date) - new Date(b.date)).map(w => ({
    x: w.date.slice(5), y: w.exercises.reduce((a, e) => a + e.sets.filter(s => s.done && s.weight && s.reps).reduce((b, s) => b + parseFloat(s.weight || 0) * parseInt(s.reps || 0), 0), 0)
  }));
  const muscleCounts = {};
  ws.forEach(w => w.exercises.forEach(e => { muscleCounts[e.muscle] = (muscleCounts[e.muscle] || 0) + 1; }));
  const maxMC = Math.max(1, ...Object.values(muscleCounts));
  const strengthScores = {};
  Object.entries(store.prs).forEach(([ex, pr]) => { if (pr.weight && pr.reps) strengthScores[ex] = Math.round(pr.weight * (1 + pr.reps / 30)); });
  const topStrength = Object.entries(strengthScores).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const streak = getStreak(ws);
  const last28 = Array.from({ length: 28 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (27 - i)); return d.toISOString().split("T")[0]; });
  const heatDates = {};
  ws.forEach(w => { heatDates[w.date] = (heatDates[w.date] || 0) + 1; });
  return (
    <div className="page">
      <div className="page-title">ANALYTICS</div>
      <div className="page-sub">Deep performance insights</div>
      <div className="stats-row">
        {[{ l: "Current Streak", v: streak, d: "days", c: "#F59E0B" }, { l: "PRs Set", v: Object.keys(store.prs).length, d: "personal records", c: "var(--accent)" }, { l: "Avg/Week", v: ws.length > 0 ? Math.round(ws.length / Math.max(1, Math.ceil((Date.now() - new Date(ws[ws.length - 1]?.date || Date.now())) / 604800000 + 1))) : 0, d: "workouts", c: "#4D9FFF" }, { l: "Total Volume", v: Math.round(ws.reduce((a, w) => a + w.exercises.reduce((b, e) => b + e.sets.filter(s => s.done && s.weight && s.reps).reduce((c, s) => c + parseFloat(s.weight || 0) * parseInt(s.reps || 0), 0), 0), 0)), d: unit, c: "#A855F7" }].map(s => (
          <div key={s.l} className="stat-card" style={{ "--sc": s.c }}><div className="stat-lbl">{s.l}</div><div className="stat-val">{s.v}</div><div className="stat-desc">{s.d}</div></div>
        ))}
      </div>
      <div className="prog-grid">
        <div className="prog-card" style={{ gridColumn: "span 2" }}>
          <div className="prog-title">Activity — Last 28 Days</div>
          <div className="heatmap">{last28.map(d => { const c = heatDates[d] || 0; const cls = c === 0 ? "" : c === 1 ? "l1" : c === 2 ? "l2" : c === 3 ? "l3" : "l4"; return <div key={d} className={`heat-cell ${cls}`} title={d} />; })}</div>
          <div className="flex gap8 mt8"><span style={{ fontSize: 10, color: "var(--muted)" }}>Less</span>{["", "l1", "l2", "l3", "l4"].map(c => <div key={c} className={`heat-cell ${c}`} style={{ width: 11, height: 11, borderRadius: 2 }} />)}<span style={{ fontSize: 10, color: "var(--muted)" }}>More</span></div>
        </div>
        <div className="prog-card">
          <div className="prog-title">Muscle Balance</div>
          {Object.keys(muscleCounts).length === 0 ? <div style={{ color: "var(--muted)", fontSize: 12 }}>No data yet</div>
            : <div className="bar-chart">{Object.entries(muscleCounts).sort((a, b) => b[1] - a[1]).map(([m, c]) => (
              <div key={m} className="bar-row"><div className="bar-lbl" style={{ fontSize: 10 }}>{m}</div><div className="bar-track"><div className="bar-fill" style={{ width: `${(c / maxMC) * 100}%`, background: MUSCLE_GROUPS[m]?.color || "var(--accent)" }} /></div><div className="bar-val" style={{ color: MUSCLE_GROUPS[m]?.color || "var(--accent)" }}>{c}</div></div>
            ))}</div>}
        </div>
      </div>
      <div className="two-col mb20">
        <div className="panel">
          <div className="panel-hdr"><div className="panel-title">WEIGHT PROGRESS</div></div>
          <div style={{ padding: 16 }}>
            <div className="mb12"><select className="inp" value={selEx} onChange={e => setSelEx(e.target.value)}><option value="">-- Pick Exercise --</option>{allExNames.map(n => <option key={n}>{n}</option>)}</select></div>
            {selEx ? <LineChart data={progressData} color="var(--accent)" label={unit} /> : <div style={{ color: "var(--muted)", fontSize: 12, padding: "18px 0", textAlign: "center" }}>Select an exercise</div>}
          </div>
        </div>
        <div className="panel">
          <div className="panel-hdr"><div className="panel-title">VOLUME OVER TIME</div></div>
          <div style={{ padding: 16 }}><LineChart data={volumeData} color="#4D9FFF" label={unit} /><div style={{ fontSize: 10, color: "var(--muted)", marginTop: 7 }}>Total weight × reps per session</div></div>
        </div>
      </div>
      {topStrength.length > 0 && (
        <>
          <div className="sec-lbl">STRENGTH SCORES (Est. 1RM)</div>
          <div className="panel mb20"><div style={{ padding: 16 }}><div className="bar-chart">{topStrength.map(([ex, score]) => (
            <div key={ex} className="bar-row"><div className="bar-lbl" style={{ fontSize: 10, width: 110 }}>{ex}</div><div className="bar-track"><div className="bar-fill" style={{ width: `${(score / topStrength[0][1]) * 100}%`, background: "var(--accent)" }} /></div><div className="bar-val" style={{ color: "var(--accent)", width: 50 }}>{score}{unit}</div></div>
          ))}</div></div></div>
        </>
      )}
    </div>
  );
}
