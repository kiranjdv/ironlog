export default function LineChart({ data, color = "var(--accent)", label = "kg" }) {
  if (!data || data.length < 2) return <div style={{ color: "var(--muted)", fontSize: 12, padding: "18px 0" }}>Not enough data yet</div>;
  const W = 300, H = 110, P = 14;
  const vals = data.map(d => d.y);
  const minV = Math.min(...vals), maxV = Math.max(...vals);
  const range = maxV - minV || 1;
  const pts = data.map((d, i) => {
    const x = P + (i / (data.length - 1)) * (W - P * 2);
    const y = H - P - ((d.y - minV) / range) * (H - P * 2);
    return [x, y];
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 110, overflow: "visible" }}>
      <polyline points={pts.map(p => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill={color} />)}
      <text x={P} y={H - 2} fontSize="9" fill="var(--muted)">{data[0]?.x}</text>
      <text x={W - P} y={H - 2} fontSize="9" fill="var(--muted)" textAnchor="end">{data[data.length - 1]?.x}</text>
      <text x={P} y={P + 4} fontSize="9" fill="var(--muted)">{maxV}{label}</text>
    </svg>
  );
}
