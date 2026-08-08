import { useEffect } from "react";
import { fmtTime } from "../utils/helpers";

export default function CelebrationModal({ workoutData, onClose, onNavigateHistory }) {
  useEffect(() => {
    // Optional haptic vibration if supported on mobile devices
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }, []);

  const totalSets = workoutData?.exercises?.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.done).length,
    0
  ) || 0;

  const totalVolume = workoutData?.exercises?.reduce((acc, ex) => {
    return (
      acc +
      ex.sets
        .filter((s) => s.done && s.weight && s.reps)
        .reduce((sum, s) => sum + parseFloat(s.weight) * parseInt(s.reps), 0)
    );
  }, 0) || 0;

  return (
    <div className="celebration-overlay" onClick={onClose}>
      <div className="celebration-confetti-wrap" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.8}s`,
              backgroundColor: ["#C8FF00", "#FF4D6D", "#4D9FFF", "#A855F7", "#F59E0B"][i % 5],
              transform: `scale(${0.5 + Math.random() * 0.7}) rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      <div className="celebration-card" onClick={(e) => e.stopPropagation()}>
        <div className="celebration-badge">🏆</div>
        <div className="celebration-title">WORKOUT CRUSHED!</div>
        <div className="celebration-sub">Great job! Every rep builds the ultimate version of you.</div>

        <div className="celebration-stats-grid">
          <div className="celebration-stat">
            <div className="celebration-stat-lbl">DURATION</div>
            <div className="celebration-stat-val">{fmtTime(workoutData?.duration || 0)}</div>
          </div>
          <div className="celebration-stat">
            <div className="celebration-stat-lbl">EXERCISES</div>
            <div className="celebration-stat-val">{workoutData?.exercises?.length || 0}</div>
          </div>
          <div className="celebration-stat">
            <div className="celebration-stat-lbl">SETS DONE</div>
            <div className="celebration-stat-val">{totalSets}</div>
          </div>
          {totalVolume > 0 && (
            <div className="celebration-stat">
              <div className="celebration-stat-lbl">TOTAL VOLUME</div>
              <div className="celebration-stat-val">{Math.round(totalVolume).toLocaleString()}</div>
            </div>
          )}
        </div>

        <div className="celebration-actions">
          <button className="btn btn-acc celebration-btn" onClick={onClose}>
            Back to Dashboard
          </button>
          {onNavigateHistory && (
            <button className="btn btn-out celebration-btn-sub" onClick={onNavigateHistory}>
              View in History ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
