import React, { useState, useEffect } from "react";
import { getExerciseGuide } from "../constants/exerciseGuideData";
import { MUSCLE_GROUPS } from "../constants/workoutData";
import { Icon } from "./Icons";

export default function ExerciseGuideModal({
  exerciseName,
  muscleGroup,
  onClose,
  onAddExercise,
}) {
  const [activeTab, setActiveTab] = useState("guide"); // "guide" | "mistakes" | "alternatives"

  const guide = getExerciseGuide(exerciseName, muscleGroup);
  const muscleMeta = MUSCLE_GROUPS[guide.muscle] || { icon: "💪", color: "var(--accent)" };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const difficultyColors = {
    Beginner: { text: "#10B981", bg: "rgba(16, 185, 129, 0.15)", border: "rgba(16, 185, 129, 0.3)" },
    Intermediate: { text: "#F59E0B", bg: "rgba(245, 158, 11, 0.15)", border: "rgba(245, 158, 11, 0.3)" },
    Advanced: { text: "#FF4D6D", bg: "rgba(255, 77, 109, 0.15)", border: "rgba(255, 77, 109, 0.3)" },
  };

  const diffStyle = difficultyColors[guide.difficulty] || difficultyColors.Beginner;

  const openVideo = () => {
    const query = encodeURIComponent(guide.videoQuery || `${guide.name} exercise proper form tutorial`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="modal-ov guide-modal-ov" onClick={onClose}>
      <div className="modal guide-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="guide-modal-header">
          <div className="guide-header-top">
            <div className="guide-badges-wrap">
              <span
                className="guide-badge"
                style={{
                  color: muscleMeta.color,
                  backgroundColor: `${muscleMeta.color}22`,
                  border: `1px solid ${muscleMeta.color}44`,
                }}
              >
                {muscleMeta.icon} {guide.muscle}
              </span>
              <span
                className="guide-badge"
                style={{
                  color: diffStyle.text,
                  backgroundColor: diffStyle.bg,
                  border: `1px solid ${diffStyle.border}`,
                }}
              >
                ● {guide.difficulty}
              </span>
              <span className="guide-badge guide-badge-eq">
                {guide.equipment}
              </span>
            </div>
            <button className="btn-ghost guide-close-btn" onClick={onClose} title="Close Guide">
              ✕
            </button>
          </div>

          <div className="guide-title-row">
            <div>
              <h2 className="guide-ex-name">{guide.name}</h2>
              {guide.matchedFrom && guide.matchedFrom.toLowerCase() !== guide.name.toLowerCase() && (
                <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
                  <span>⚡ Matched technique:</span>
                  <span style={{ fontWeight: 700, textDecoration: "underline" }}>{guide.matchedFrom}</span>
                </div>
              )}
            </div>
            {onAddExercise && (
              <button
                className="btn btn-acc btn-sm guide-add-btn"
                onClick={() => {
                  onAddExercise(guide.name, guide.muscle);
                  onClose();
                }}
              >
                + Add to Workout
              </button>
            )}
          </div>

          {/* Video & Recommended Volume Row */}
          <div className="guide-meta-banner">
            <button className="guide-video-btn" onClick={openVideo} title="Watch video tutorials">
              <span className="guide-play-icon">▶</span>
              <span>Watch 30s Video Clip</span>
            </button>
            <div className="guide-volume-box">
              <span className="guide-volume-label">Starter Target:</span>
              <span className="guide-volume-val">{guide.starterVolume}</span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="guide-tabs">
            <button
              className={`guide-tab-btn ${activeTab === "guide" ? "active" : ""}`}
              onClick={() => setActiveTab("guide")}
            >
              <Icon name="book-open" size={14} />
              <span>How to Perform</span>
            </button>
            <button
              className={`guide-tab-btn ${activeTab === "mistakes" ? "active" : ""}`}
              onClick={() => setActiveTab("mistakes")}
            >
              <Icon name="alert-circle" size={14} />
              <span>Mistakes ({guide.commonMistakes?.length || 0})</span>
            </button>
            <button
              className={`guide-tab-btn ${activeTab === "muscles" ? "active" : ""}`}
              onClick={() => setActiveTab("muscles")}
            >
              <Icon name="body" size={14} />
              <span>Muscles & Alternative</span>
            </button>
          </div>
        </div>

        {/* Modal Body with Tab Contents */}
        <div className="guide-modal-body">
          {activeTab === "guide" && (
            <div className="guide-tab-content">
              {/* Setup Steps */}
              <div className="guide-section">
                <div className="guide-sec-title">
                  <span className="guide-sec-icon">1</span>
                  <span>THE SETUP (TAIYAARI)</span>
                </div>
                <div className="guide-steps-list">
                  {guide.setup.map((step, idx) => (
                    <div key={idx} className="guide-step-item">
                      <div className="guide-step-dot">•</div>
                      <div className="guide-step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Steps */}
              <div className="guide-section">
                <div className="guide-sec-title">
                  <span className="guide-sec-icon">2</span>
                  <span>EXECUTION & BREATHING (MOVEMENT)</span>
                </div>
                <div className="guide-steps-list">
                  {guide.execution.map((step, idx) => (
                    <div key={idx} className="guide-step-item">
                      <div className="guide-step-dot">•</div>
                      <div className="guide-step-text">{step}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Golden Form Cues */}
              {guide.proTips && guide.proTips.length > 0 && (
                <div className="guide-pro-cues-card">
                  <div className="guide-pro-header">
                    <span className="guide-pro-icon">💡</span>
                    <span className="guide-pro-title">COACH'S PRO FORM CUES</span>
                  </div>
                  <ul className="guide-cues-list">
                    {guide.proTips.map((tip, idx) => (
                      <li key={idx} className="guide-cue-item">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === "mistakes" && (
            <div className="guide-tab-content">
              <div className="guide-caution-alert">
                <span className="guide-caution-icon">⚠️</span>
                <span>
                  Beginners most often injure themselves or stall progress due to these form breakdowns. Focus on clean technique before loading heavy weights!
                </span>
              </div>

              <div className="guide-mistakes-list">
                {guide.commonMistakes.map((m, idx) => (
                  <div key={idx} className="guide-mistake-card">
                    <div className="guide-mistake-badge">✕ MISTAKE {idx + 1}</div>
                    <div className="guide-mistake-text">{m}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "muscles" && (
            <div className="guide-tab-content">
              {/* Primary Muscles */}
              <div className="guide-section mb16">
                <div className="guide-sec-title">
                  <span>🎯</span>
                  <span>PRIMARY TARGET MUSCLE</span>
                </div>
                <div className="guide-muscle-chips">
                  {guide.primaryMuscles.map((m) => (
                    <span key={m} className="guide-muscle-chip primary">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Secondary Muscles */}
              {guide.secondaryMuscles && guide.secondaryMuscles.length > 0 && (
                <div className="guide-section mb20">
                  <div className="guide-sec-title">
                    <span>⚡</span>
                    <span>SECONDARY / SUPPORTING MUSCLES</span>
                  </div>
                  <div className="guide-muscle-chips">
                    {guide.secondaryMuscles.map((m) => (
                      <span key={m} className="guide-muscle-chip secondary">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Beginner Alternative / Progression */}
              {guide.alternative && (
                <div className="guide-alt-card">
                  <div className="guide-alt-header">
                    <span className="guide-alt-icon">🔄</span>
                    <div>
                      <div className="guide-alt-title">STRUGGLING WITH THIS MOVEMENT?</div>
                      <div className="guide-alt-sub">Try this easier beginner alternative first:</div>
                    </div>
                  </div>
                  <div className="guide-alt-box">
                    <span className="guide-alt-badge">ALTERNATIVE</span>
                    <span className="guide-alt-name">{guide.alternative}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="guide-modal-footer">
          <button className="btn btn-out btn-sm" onClick={openVideo}>
            Search Video Demos ↗
          </button>
          <button className="btn btn-primary" onClick={onClose} style={{ marginLeft: "auto" }}>
            Got It! Close
          </button>
        </div>
      </div>
    </div>
  );
}
