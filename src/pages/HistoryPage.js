import { useState } from "react";
import { MUSCLE_GROUPS } from "../constants/workoutData";
import { fmtDate, fmtDuration } from "../utils/helpers";

export default function HistoryPage({ store, setTab }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("All");
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const unit = store.settings?.unit || "kg";
  const ws = [...(store.workouts || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Toggle single workout expand/collapse
  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(filteredWorkouts.map((w) => w.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  // Filter workouts
  const filteredWorkouts = ws.filter((w) => {
    const matchesSearch =
      !searchQuery.trim() ||
      (w.exercises || []).some((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesMuscle =
      selectedMuscle === "All" ||
      (w.exercises || []).some((e) => e.muscle === selectedMuscle);

    return matchesSearch && matchesMuscle;
  });

  // Calculate global summary stats
  const totalCompletedWorkouts = ws.length;
  const grandTotalVolume = ws.reduce((acc, w) => {
    return (
      acc +
      (w.exercises || []).reduce((eAcc, ex) => {
        return (
          eAcc +
          (ex.sets || [])
            .filter((s) => s.done && s.weight && s.reps)
            .reduce(
              (sAcc, s) =>
                sAcc + (parseFloat(s.weight) || 0) * (parseInt(s.reps, 10) || 0),
              0
            )
        );
      }, 0)
    );
  }, 0);

  if (!ws.length) {
    return (
      <div className="page">
        <div className="page-title">HISTORY</div>
        <div className="page-sub">Your training timeline</div>
        <div className="empty-state-card">
          <div className="empty-icon-wrap">📋</div>
          <div className="empty-state-title">NO WORKOUTS RECORDED YET</div>
          <div className="empty-state-text">
            Start logging your workouts to build your history, streaks, and personal records.
          </div>
          {setTab && (
            <button className="btn btn-acc" onClick={() => setTab("workout")}>
              Start a Workout Now ➔
            </button>
          )}
        </div>
      </div>
    );
  }

  const allMuscles = ["All", ...Object.keys(MUSCLE_GROUPS)];

  return (
    <div className="page">
      <div className="page-title">HISTORY</div>
      <div className="page-sub">
        {totalCompletedWorkouts} workout{totalCompletedWorkouts !== 1 ? "s" : ""} logged • {Math.round(grandTotalVolume).toLocaleString()} {unit} total volume lifted
      </div>

      {/* Filter and Search Controls */}
      <div className="hist-filter-card mb20">
        <div className="hist-search-wrap">
          <span className="hist-search-icon">🔍</span>
          <input
            type="text"
            className="hist-search-input"
            placeholder="Search workouts by exercise name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="hist-search-clear"
              onClick={() => setSearchQuery("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="hist-filter-bottom-row">
          <div className="hist-muscle-filters">
            {allMuscles.map((m) => {
              const isSel = selectedMuscle === m;
              const muscleInfo = MUSCLE_GROUPS[m];
              return (
                <button
                  key={m}
                  className={`hist-filter-pill ${isSel ? "active" : ""}`}
                  onClick={() => setSelectedMuscle(m)}
                  style={{
                    borderColor: isSel && muscleInfo?.color ? muscleInfo.color : undefined,
                    color: isSel && muscleInfo?.color ? muscleInfo.color : undefined,
                  }}
                >
                  {muscleInfo?.icon ? `${muscleInfo.icon} ` : ""}
                  {m}
                </button>
              );
            })}
          </div>

          {filteredWorkouts.length > 0 && (
            <div className="hist-expand-all-wrap">
              <button
                className="hist-btn-text"
                onClick={expandedIds.size === filteredWorkouts.length ? collapseAll : expandAll}
              >
                {expandedIds.size === filteredWorkouts.length ? "Collapse All ▴" : "Expand All ▾"}
              </button>
            </div>
          )}
        </div>
      </div>

      {filteredWorkouts.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-wrap">🔍</div>
          <div className="empty-state-title">NO MATCHING WORKOUTS</div>
          <div className="empty-state-text">
            No workouts found matching "{searchQuery || selectedMuscle}". Try adjusting your filters.
          </div>
          <button
            className="btn btn-out"
            onClick={() => {
              setSearchQuery("");
              setSelectedMuscle("All");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        filteredWorkouts.map((w) => {
          const isExpanded = expandedIds.has(w.id);
          const muscles = [...new Set((w.exercises || []).map((e) => e.muscle).filter(Boolean))];
          
          // Total Done Sets
          const totalDoneSets = (w.exercises || []).reduce(
            (acc, e) => acc + (e.sets || []).filter((s) => s.done).length,
            0
          );

          // Total Reps
          const totalReps = (w.exercises || []).reduce(
            (acc, e) =>
              acc +
              (e.sets || [])
                .filter((s) => s.done && s.reps)
                .reduce((sum, s) => sum + (parseInt(s.reps, 10) || 0), 0),
            0
          );

          // Total Volume for workout
          const totalVolume = (w.exercises || []).reduce((acc, e) => {
            return (
              acc +
              (e.sets || [])
                .filter((s) => s.done && s.weight && s.reps)
                .reduce(
                  (sum, s) =>
                    sum + (parseFloat(s.weight) || 0) * (parseInt(s.reps, 10) || 0),
                  0
                )
            );
          }, 0);

          return (
            <div
              key={w.id}
              className={`hist-card ${isExpanded ? "expanded" : "collapsed"}`}
            >
              {/* Clickable Card Header */}
              <div
                className="hist-header-clickable"
                onClick={() => toggleExpand(w.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleExpand(w.id);
                  }
                }}
              >
                <div className="hist-header-left">
                  <div className="hist-date-icon">📅</div>
                  <div>
                    <div className="hist-date">{fmtDate(w.date)}</div>
                    <div className="hist-time-tag">
                      <span className="hist-time-icon">⏱️</span>
                      <span>
                        Time taken:{" "}
                        <strong style={{ color: "var(--accent)" }}>
                          {w.duration ? fmtDuration(w.duration) : "Not recorded"}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hist-header-right">
                  {/* Quick Summary Pill on Header */}
                  <div className="hist-quick-stats">
                    <span className="hist-quick-stat">
                      <strong>{(w.exercises || []).length}</strong> ex
                    </span>
                    <span className="hist-quick-dot">•</span>
                    <span className="hist-quick-stat">
                      <strong>{totalDoneSets}</strong> sets
                    </span>
                    {totalVolume > 0 && (
                      <>
                        <span className="hist-quick-dot">•</span>
                        <span className="hist-quick-stat text-accent">
                          <strong>{Math.round(totalVolume).toLocaleString()}</strong> {unit}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Expand Chevron & Action Button */}
                  <div className="hist-expand-trigger">
                    <span className="hist-expand-label">
                      {isExpanded ? "Hide Info" : "View Info"}
                    </span>
                    <span className={`hist-chevron ${isExpanded ? "open" : ""}`}>
                      ▼
                    </span>
                  </div>

                  {/* Delete button (stopPropagation so it won't toggle accordion) */}
                  <div
                    className="hist-header-actions"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {deleteConfirmId === w.id ? (
                      <div className="hist-delete-confirm">
                        <span className="hist-delete-prompt">Delete?</span>
                        <button
                          className="btn-danger-sm"
                          onClick={() => {
                            if (store.deleteWorkout) store.deleteWorkout(w.id);
                            setDeleteConfirmId(null);
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className="btn-ghost-sm"
                          onClick={() => setDeleteConfirmId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="hist-delete-btn"
                        onClick={() => setDeleteConfirmId(w.id)}
                        title="Delete workout"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Muscles Targeted row visible on card */}
              {muscles.length > 0 && (
                <div
                  className="tag-row hist-muscle-row"
                  onClick={() => toggleExpand(w.id)}
                  style={{ cursor: "pointer" }}
                >
                  {muscles.map((m) => (
                    <span
                      key={m}
                      className="mtag"
                      style={{
                        background: (MUSCLE_GROUPS[m]?.color || "#888") + "22",
                        color: MUSCLE_GROUPS[m]?.color || "#888",
                        border: `1px solid ${(MUSCLE_GROUPS[m]?.color || "#888")}44`,
                      }}
                    >
                      {MUSCLE_GROUPS[m]?.icon} {m}
                    </span>
                  ))}
                </div>
              )}

              {/* Collapsed short hint if not expanded */}
              {!isExpanded && (
                <div
                  className="hist-collapsed-hint"
                  onClick={() => toggleExpand(w.id)}
                >
                  <span>Tap to view exercise details, sets, reps & volume breakdown ➔</span>
                </div>
              )}

              {/* EXPANDED CONTENT: Metrics Overview + Exercises Breakdown */}
              {isExpanded && (
                <div className="hist-expanded-body">
                  {/* Workout Key Metrics Overview */}
                  <div className="hist-stats-grid">
                    <div className="hist-stat-box">
                      <div className="hist-stat-lbl">TIME TAKEN</div>
                      <div className="hist-stat-val text-accent">
                        {w.duration ? fmtDuration(w.duration) : "—"}
                      </div>
                    </div>

                    <div className="hist-stat-box">
                      <div className="hist-stat-lbl">TOTAL VOLUME</div>
                      <div className="hist-stat-val text-accent">
                        {Math.round(totalVolume).toLocaleString()}{" "}
                        <span className="hist-stat-unit">{unit}</span>
                      </div>
                    </div>

                    <div className="hist-stat-box">
                      <div className="hist-stat-lbl">EXERCISES</div>
                      <div className="hist-stat-val">
                        {(w.exercises || []).length}
                      </div>
                    </div>

                    <div className="hist-stat-box">
                      <div className="hist-stat-lbl">SETS DONE</div>
                      <div className="hist-stat-val">{totalDoneSets}</div>
                    </div>

                    <div className="hist-stat-box">
                      <div className="hist-stat-lbl">TOTAL REPS</div>
                      <div className="hist-stat-val">{totalReps}</div>
                    </div>
                  </div>

                  {/* Short info for each exercise: Name, Sets, Reps, and Volume */}
                  <div className="hist-exercises-container">
                    <div className="hist-section-title">
                      <span>EXERCISES & SETS BREAKDOWN</span>
                      <span className="hist-section-badge">
                        {(w.exercises || []).length}
                      </span>
                    </div>

                    <div className="hist-exercise-list">
                      {(w.exercises || []).map((e, exIdx) => {
                        const doneSets = (e.sets || []).filter((s) => s.done);
                        const exVolume = doneSets.reduce(
                          (sum, s) =>
                            sum +
                            (parseFloat(s.weight) || 0) *
                              (parseInt(s.reps, 10) || 0),
                          0
                        );
                        const exReps = doneSets.reduce(
                          (sum, s) => sum + (parseInt(s.reps, 10) || 0),
                          0
                        );
                        const muscleColor =
                          MUSCLE_GROUPS[e.muscle]?.color || "#888";

                        return (
                          <div key={e.id || exIdx} className="hist-ex-card">
                            <div className="hist-ex-header">
                              <div className="hist-ex-left">
                                <span
                                  className="hist-ex-dot"
                                  style={{ backgroundColor: muscleColor }}
                                />
                                <span className="hist-ex-name">{e.name}</span>
                                {e.muscle && (
                                  <span
                                    className="hist-ex-muscle"
                                    style={{ color: muscleColor }}
                                  >
                                    {e.muscle}
                                  </span>
                                )}
                              </div>

                              <div className="hist-ex-summary">
                                <span className="hist-ex-summary-item">
                                  <strong>{doneSets.length}</strong>{" "}
                                  {doneSets.length === 1 ? "set" : "sets"}
                                </span>
                                <span className="hist-ex-summary-dot">•</span>
                                <span className="hist-ex-summary-item">
                                  <strong>{exReps}</strong> reps
                                </span>
                                {exVolume > 0 && (
                                  <>
                                    <span className="hist-ex-summary-dot">•</span>
                                    <span className="hist-ex-summary-item hist-vol-tag">
                                      <strong>
                                        {Math.round(exVolume).toLocaleString()}
                                      </strong>{" "}
                                      {unit}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Sets and Reps Chips */}
                            <div className="hist-sets-list">
                              {(e.sets || []).length === 0 ? (
                                <div className="hist-no-sets">No sets recorded</div>
                              ) : (
                                (e.sets || []).map((s, sIdx) => {
                                  const isDone = !!s.done;
                                  return (
                                    <div
                                      key={s.id || sIdx}
                                      className={`hist-set-chip ${
                                        isDone ? "done" : "incomplete"
                                      }`}
                                    >
                                      <span className="hist-chip-idx">
                                        S{sIdx + 1}
                                      </span>
                                      <span className="hist-chip-details">
                                        {s.weight ? `${s.weight} ${unit}` : ""}
                                        {s.weight && s.reps ? " × " : ""}
                                        {s.reps ? `${s.reps} reps` : ""}
                                        {!s.weight && !s.reps && "—"}
                                      </span>
                                      {isDone && (
                                        <span className="hist-chip-check">✓</span>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
