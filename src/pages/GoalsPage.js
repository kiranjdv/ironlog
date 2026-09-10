import { useState, useMemo } from "react";
import { ACHIEVEMENTS, MUSCLE_GROUPS } from "../constants/workoutData";
import { Icon } from "../components/Icons";
import { todayStr } from "../utils/helpers";

export default function GoalsPage({ store, setTab }) {
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [goalFilter, setGoalFilter] = useState("active"); // "active" | "smashed" | "all"
  const [achFilter, setAchFilter] = useState("all"); // "all" | "unlocked" | "locked"
  const [celebratingGoal, setCelebratingGoal] = useState(null);

  // Form state
  const [form, setForm] = useState({
    type: "strength", // "strength" | "body" | "consistency"
    exercise: "Bench Press",
    customExercise: "",
    targetWeight: "",
    targetReps: "5",
    metric: "weight", // "weight" | "fat"
    startValue: "",
    targetValue: "",
    targetWorkouts: "16",
    period: "month",
    targetDate: "",
    notes: "",
  });

  // Collect all exercises from MUSCLE_GROUPS and store.customExercises
  const exerciseGroups = useMemo(() => {
    const groups = {};
    Object.entries(MUSCLE_GROUPS).forEach(([group, data]) => {
      groups[group] = [...data.exercises];
    });

    if (store.customExercises) {
      Object.entries(store.customExercises).forEach(([group, list]) => {
        if (!groups[group]) groups[group] = [];
        (list || []).forEach((ex) => {
          if (!groups[group].includes(ex)) groups[group].push(ex);
        });
      });
    }
    return groups;
  }, [store.customExercises]);

  // Latest body log entry
  const latestBody = useMemo(() => {
    if (!store.bodyLog || store.bodyLog.length === 0) return null;
    return store.bodyLog[store.bodyLog.length - 1];
  }, [store.bodyLog]);

  // Open modal to add
  const openAddModal = (preset = null) => {
    setEditingId(null);
    if (preset) {
      setForm({
        type: preset.type || "strength",
        exercise: preset.exercise || "Bench Press",
        customExercise: "",
        targetWeight: preset.targetWeight || "",
        targetReps: preset.targetReps || "5",
        metric: preset.metric || "weight",
        startValue: preset.startValue || (latestBody?.weight ? String(latestBody.weight) : "80"),
        targetValue: preset.targetValue || "",
        targetWorkouts: preset.targetWorkouts || "16",
        period: preset.period || "month",
        targetDate: preset.targetDate || "",
        notes: preset.notes || "",
      });
    } else {
      setForm({
        type: "strength",
        exercise: "Bench Press",
        customExercise: "",
        targetWeight: "",
        targetReps: "5",
        metric: "weight",
        startValue: latestBody?.weight ? String(latestBody.weight) : "80",
        targetValue: "",
        targetWorkouts: "16",
        period: "month",
        targetDate: "",
        notes: "",
      });
    }
    setShowAdd(true);
  };

  // Open modal to edit existing
  const openEditModal = (goal) => {
    setEditingId(goal.id);
    setForm({
      type: goal.type || "strength",
      exercise: goal.exercise || "Bench Press",
      customExercise: "",
      targetWeight: goal.targetWeight ? String(goal.targetWeight) : "",
      targetReps: goal.targetReps ? String(goal.targetReps) : "5",
      metric: goal.metric || "weight",
      startValue: goal.startValue ? String(goal.startValue) : "",
      targetValue: goal.targetValue ? String(goal.targetValue) : "",
      targetWorkouts: goal.targetWorkouts ? String(goal.targetWorkouts) : "16",
      period: goal.period || "month",
      targetDate: goal.targetDate || "",
      notes: goal.notes || "",
    });
    setShowAdd(true);
  };

  // Check form validity
  const isInvalid = useMemo(() => {
    if (form.type === "strength") {
      const ex = form.exercise === "__custom__" ? form.customExercise.trim() : form.exercise.trim();
      return !ex || !form.targetWeight || parseFloat(form.targetWeight) <= 0 || !form.targetReps || parseInt(form.targetReps) <= 0;
    }
    if (form.type === "body") {
      return !form.targetValue || parseFloat(form.targetValue) <= 0;
    }
    if (form.type === "consistency") {
      return !form.targetWorkouts || parseInt(form.targetWorkouts) <= 0;
    }
    return false;
  }, [form]);

  // Save or update goal
  const handleSaveGoal = () => {
    if (isInvalid) return;

    let exerciseName = form.exercise;
    if (form.type === "strength" && form.exercise === "__custom__") {
      exerciseName = form.customExercise.trim();
    }

    const payload = {
      type: form.type,
      notes: form.notes.trim(),
      targetDate: form.targetDate || "",
    };

    if (form.type === "strength") {
      payload.exercise = exerciseName;
      payload.targetWeight = parseFloat(form.targetWeight);
      payload.targetReps = parseInt(form.targetReps);
    } else if (form.type === "body") {
      payload.metric = form.metric;
      payload.targetValue = parseFloat(form.targetValue);
      payload.startValue = form.startValue ? parseFloat(form.startValue) : (latestBody?.weight || 80);
    } else if (form.type === "consistency") {
      payload.targetWorkouts = parseInt(form.targetWorkouts);
      payload.period = form.period;
    }

    if (editingId) {
      const existing = store.goals.find((g) => g.id === editingId);
      store.updateGoal({
        ...existing,
        ...payload,
      });
    } else {
      store.addGoal(payload);
    }

    setShowAdd(false);
    setEditingId(null);
  };

  // Toggle goal completed / smashed
  const toggleGoalCompleted = (goal) => {
    const isNowCompleted = !goal.completed;
    store.updateGoal({
      ...goal,
      completed: isNowCompleted,
      completedAt: isNowCompleted ? todayStr() : null,
    });

    if (isNowCompleted) {
      setCelebratingGoal(goal);
    }
  };

  // Calculate progress for each goal
  const getGoalProgress = (goal) => {
    const goalType = goal.type || "strength";

    if (goalType === "strength") {
      const pr = store.prs[goal.exercise];
      if (!pr || !goal.targetWeight) return { percent: 0, current: 0, target: goal.targetWeight, unit: store.settings.unit };
      const percent = Math.min(100, Math.round((pr.weight / parseFloat(goal.targetWeight)) * 100));
      return { percent, current: pr.weight, reps: pr.reps, target: goal.targetWeight, unit: store.settings.unit };
    }

    if (goalType === "body") {
      const currentVal = goal.metric === "fat" ? (latestBody?.fat || 0) : (latestBody?.weight || 0);
      const target = parseFloat(goal.targetValue);
      const start = parseFloat(goal.startValue) || (currentVal || target);
      const unit = goal.metric === "fat" ? "%" : store.settings.unit;

      if (!currentVal) return { percent: 0, current: 0, target, unit };

      // If cutting
      if (start > target) {
        if (currentVal <= target) return { percent: 100, current: currentVal, target, unit };
        const totalDiff = start - target;
        const progressDiff = start - currentVal;
        const percent = Math.max(0, Math.min(100, Math.round((progressDiff / totalDiff) * 100)));
        return { percent, current: currentVal, target, unit };
      } else {
        // If bulking
        if (currentVal >= target) return { percent: 100, current: currentVal, target, unit };
        const totalDiff = target - start;
        const progressDiff = currentVal - start;
        const percent = Math.max(0, Math.min(100, Math.round((progressDiff / totalDiff) * 100)));
        return { percent, current: currentVal, target, unit };
      }
    }

    if (goalType === "consistency") {
      const target = parseInt(goal.targetWorkouts) || 1;
      const curMonth = todayStr().slice(0, 7);
      const workoutsCount = (store.workouts || []).filter((w) => {
        if (goal.period === "month") {
          return (w.date || "").startsWith(curMonth);
        }
        return true;
      }).length;

      const percent = Math.min(100, Math.round((workoutsCount / target) * 100));
      return { percent, current: workoutsCount, target, unit: "workouts" };
    }

    return { percent: 0, current: 0, target: 0, unit: "" };
  };

  // Calculate deadline countdown
  const getDeadlineStatus = (targetDate, isCompleted) => {
    if (isCompleted) {
      return { label: "Goal Smashed", variant: "done", icon: "check-circle" };
    }
    if (!targetDate) return null;

    const today = new Date(todayStr());
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Overdue by ${Math.abs(diffDays)}d`, variant: "overdue", icon: "alert-circle" };
    }
    if (diffDays === 0) {
      return { label: "Due Today", variant: "urgent", icon: "clock" };
    }
    if (diffDays <= 7) {
      return { label: `${diffDays}d left`, variant: "soon", icon: "clock" };
    }
    return { label: `${diffDays} days left`, variant: "normal", icon: "calendar" };
  };

  // Filter goals
  const filteredGoals = useMemo(() => {
    return store.goals.filter((g) => {
      if (goalFilter === "active") return !g.completed;
      if (goalFilter === "smashed") return g.completed;
      return true;
    });
  }, [store.goals, goalFilter]);

  // Filter achievements
  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter((a) => {
      const earned = a.check(store.workouts, store.prs);
      if (achFilter === "unlocked") return earned;
      if (achFilter === "locked") return !earned;
      return true;
    });
  }, [store.workouts, store.prs, achFilter]);

  const activeCount = store.goals.filter((g) => !g.completed).length;
  const smashedCount = store.goals.filter((g) => g.completed).length;
  const unlockedAchCount = ACHIEVEMENTS.filter((a) => a.check(store.workouts, store.prs)).length;

  return (
    <div className="page">
      {/* Page Header */}
      <div className="flex-sb mb16">
        <div>
          <div className="page-title flex gap8" style={{ alignItems: "center" }}>
            <Icon name="trophy" size={28} />
            <span>GOALS & ACHIEVEMENTS</span>
          </div>
          <div className="page-sub">Set bold targets. Smash your limits. Track your evolution.</div>
        </div>
        <button className="btn btn-acc" onClick={() => openAddModal()}>
          <Icon name="plus" size={16} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mb24">
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="sparkles" size={13} />
          <span>Quick Milestone Presets</span>
        </div>
        <div className="preset-chips">
          <button
            className="preset-chip"
            onClick={() =>
              openAddModal({
                type: "strength",
                exercise: "Bench Press",
                targetWeight: store.settings.unit === "lbs" ? 225 : 100,
                targetReps: 5,
                notes: "2 Plates Bench milestone",
              })
            }
          >
            <Icon name="dumbbell" size={14} />
            <span>{store.settings.unit === "lbs" ? "225 lbs" : "100 kg"} Bench</span>
          </button>
          <button
            className="preset-chip"
            onClick={() =>
              openAddModal({
                type: "strength",
                exercise: "Squat",
                targetWeight: store.settings.unit === "lbs" ? 315 : 140,
                targetReps: 5,
                notes: "3 Plates Squat power milestone",
              })
            }
          >
            <Icon name="dumbbell" size={14} />
            <span>{store.settings.unit === "lbs" ? "315 lbs" : "140 kg"} Squat</span>
          </button>
          <button
            className="preset-chip"
            onClick={() =>
              openAddModal({
                type: "strength",
                exercise: "Deadlift",
                targetWeight: store.settings.unit === "lbs" ? 405 : 180,
                targetReps: 3,
                notes: "4 Plates Deadlift milestone",
              })
            }
          >
            <Icon name="dumbbell" size={14} />
            <span>{store.settings.unit === "lbs" ? "405 lbs" : "180 kg"} Deadlift</span>
          </button>
          <button
            className="preset-chip"
            onClick={() =>
              openAddModal({
                type: "body",
                metric: "weight",
                targetValue: latestBody?.weight ? Math.round(latestBody.weight - 3) : 75,
                startValue: latestBody?.weight || 80,
                notes: "Lean & shredded physique goal",
              })
            }
          >
            <Icon name="scale" size={14} />
            <span>Physique Target</span>
          </button>
          <button
            className="preset-chip"
            onClick={() =>
              openAddModal({
                type: "consistency",
                targetWorkouts: 16,
                period: "month",
                notes: "Consistency is king: 4 workouts/week",
              })
            }
          >
            <Icon name="repeat" size={14} />
            <span>16 Workouts / Month</span>
          </button>
        </div>
      </div>

      {/* Trophy Cabinet Section */}
      <div className="flex-sb mb12" style={{ alignItems: "center" }}>
        <div className="sec-lbl" style={{ marginBottom: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="trophy" size={16} />
          <span>TROPHY CABINET ({unlockedAchCount}/{ACHIEVEMENTS.length} UNLOCKED)</span>
        </div>
        <div className="flex gap6">
          <button
            className={`btn-ghost ${achFilter === "all" ? "active" : ""}`}
            style={{ fontSize: 11, padding: "3px 8px" }}
            onClick={() => setAchFilter("all")}
          >
            All
          </button>
          <button
            className={`btn-ghost ${achFilter === "unlocked" ? "active" : ""}`}
            style={{ fontSize: 11, padding: "3px 8px" }}
            onClick={() => setAchFilter("unlocked")}
          >
            Unlocked
          </button>
          <button
            className={`btn-ghost ${achFilter === "locked" ? "active" : ""}`}
            style={{ fontSize: 11, padding: "3px 8px" }}
            onClick={() => setAchFilter("locked")}
          >
            Locked
          </button>
        </div>
      </div>

      <div className="ach-grid mb32">
        {filteredAchievements.map((a) => {
          const earned = a.check(store.workouts, store.prs);
          const prog = a.progress ? a.progress(store.workouts, store.prs) : null;
          const pct = prog ? Math.min(100, Math.round((prog.current / prog.max) * 100)) : (earned ? 100 : 0);

          return (
            <div key={a.id} className={`ach-card ${earned ? "earned" : "locked"}`}>
              <div>
                <div
                  className="ach-icon"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: earned ? "var(--accent)" : "var(--muted)",
                  }}
                >
                  <Icon name={a.icon} size={32} />
                </div>
                <div className="ach-name">{a.name}</div>
                <div className="ach-desc">{a.desc}</div>
              </div>

              <div>
                {earned ? (
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--accent)",
                      marginTop: 10,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <Icon name="check-circle" size={12} />
                    <span>UNLOCKED</span>
                  </div>
                ) : (
                  <div style={{ marginTop: 10 }}>
                    <div className="ach-prog-track">
                      <div className="ach-prog-fill" style={{ width: `${pct}%` }} />
                    </div>
                    {prog && (
                      <div className="ach-prog-lbl">
                        <span>{prog.current}/{prog.max} {prog.unit}</span>
                        <span>{pct}%</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Goals Tabs */}
      <div className="flex-sb mb16" style={{ alignItems: "center" }}>
        <div className="goal-tabs" style={{ marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>
          <button
            className={`goal-tab ${goalFilter === "active" ? "active" : ""}`}
            onClick={() => setGoalFilter("active")}
          >
            <Icon name="target" size={15} />
            <span>Active Targets ({activeCount})</span>
          </button>
          <button
            className={`goal-tab ${goalFilter === "smashed" ? "active" : ""}`}
            onClick={() => setGoalFilter("smashed")}
          >
            <Icon name="check-circle" size={15} />
            <span>Smashed 🎉 ({smashedCount})</span>
          </button>
          <button
            className={`goal-tab ${goalFilter === "all" ? "active" : ""}`}
            onClick={() => setGoalFilter("all")}
          >
            <Icon name="archive" size={15} />
            <span>All Goals ({store.goals.length})</span>
          </button>
        </div>
      </div>

      {/* Goals List */}
      {filteredGoals.length === 0 ? (
        <div className="empty-state-card">
          <div
            className="empty-icon-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--muted)",
            }}
          >
            <Icon name="target" size={38} />
          </div>
          <div className="empty-state-title">
            {goalFilter === "smashed" ? "NO SMASHED GOALS YET" : "NO ACTIVE GOALS FOUND"}
          </div>
          <div className="empty-state-text">
            {goalFilter === "smashed"
              ? "Complete your active goals to see them highlighted here in your hall of fame!"
              : "Set targets on compound lifts, bodyweight, or consistency to stay accountable."}
          </div>
          <button className="btn btn-acc" onClick={() => openAddModal()}>
            <Icon name="plus" size={16} />
            <span>Create Target</span>
          </button>
        </div>
      ) : (
        filteredGoals.map((g) => {
          const prog = getGoalProgress(g);
          const deadline = getDeadlineStatus(g.targetDate, g.completed);
          const goalType = g.type || "strength";

          return (
            <div key={g.id} className={`goal-card ${g.completed ? "completed" : ""}`}>
              <div className="flex-sb" style={{ alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  {/* Badges row */}
                  <div className="flex gap8 mb6" style={{ alignItems: "center", flexWrap: "wrap" }}>
                    {goalType === "strength" && (
                      <span className="goal-badge strength">
                        <Icon name="dumbbell" size={12} />
                        <span>Strength</span>
                      </span>
                    )}
                    {goalType === "body" && (
                      <span className="goal-badge body">
                        <Icon name="scale" size={12} />
                        <span>Physique</span>
                      </span>
                    )}
                    {goalType === "consistency" && (
                      <span className="goal-badge consistency">
                        <Icon name="repeat" size={12} />
                        <span>Consistency</span>
                      </span>
                    )}

                    {deadline && (
                      <span className={`goal-deadline-pill ${deadline.variant}`}>
                        <Icon name={deadline.icon} size={12} />
                        <span>{deadline.label}</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Stats */}
                  <div className="goal-title">
                    {goalType === "strength" && g.exercise}
                    {goalType === "body" && `Target Body ${g.metric === "fat" ? "Fat %" : "Weight"}`}
                    {goalType === "consistency" && `${g.targetWorkouts} Workouts Target`}
                  </div>

                  <div style={{ fontSize: 13, color: "var(--muted)" }}>
                    {goalType === "strength" && (
                      <span>
                        Target: {g.targetWeight} {store.settings.unit} × {g.targetReps} reps
                        {prog.current > 0 && ` • Current PR: ${prog.current} ${store.settings.unit}${prog.reps ? ` × ${prog.reps}` : ""}`}
                      </span>
                    )}
                    {goalType === "body" && (
                      <span>
                        Target: {g.targetValue} {prog.unit}
                        {prog.current > 0 && ` • Current: ${prog.current} ${prog.unit}`}
                      </span>
                    )}
                    {goalType === "consistency" && (
                      <span>
                        Target: {g.targetWorkouts} workouts ({g.period === "month" ? "This month" : "30 days"})
                        {` • Logged: ${prog.current} workouts`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Progress & Actions */}
                <div className="flex gap12" style={{ alignItems: "center" }}>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 28,
                        color: g.completed ? "#22c55e" : "var(--accent)",
                        lineHeight: 1,
                      }}
                    >
                      {g.completed ? "100%" : `${prog.percent}%`}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", fontWeight: 700 }}>
                      {g.completed ? "SMASHED" : "PROGRESS"}
                    </div>
                  </div>

                  <div className="flex gap6" style={{ alignItems: "center" }}>
                    <button
                      className={`btn-ghost ${g.completed ? "text-green" : ""}`}
                      style={{ padding: "6px 8px" }}
                      title={g.completed ? "Mark as active" : "Mark as smashed"}
                      onClick={() => toggleGoalCompleted(g)}
                    >
                      <Icon name={g.completed ? "check-circle" : "check"} size={17} />
                    </button>
                    <button
                      className="btn-ghost"
                      style={{ padding: "6px 8px" }}
                      title="Edit Goal"
                      onClick={() => openEditModal(g)}
                    >
                      <Icon name="edit" size={17} />
                    </button>
                    <button
                      className="btn-ghost text-red"
                      style={{ padding: "6px 8px" }}
                      title="Delete Goal"
                      onClick={() => store.deleteGoal(g.id)}
                    >
                      <Icon name="trash" size={17} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="goal-track">
                <div
                  className={`goal-fill ${g.completed ? "completed" : ""}`}
                  style={{ width: `${g.completed ? 100 : prog.percent}%` }}
                />
              </div>

              {/* Notes */}
              {g.notes && (
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ opacity: 0.7 }}>•</span>
                  <span>{g.notes}</span>
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Add / Edit Modal */}
      {showAdd && (
        <div className="modal-ov" onClick={() => setShowAdd(false)}>
          <div
            className="modal"
            style={{ maxWidth: 460 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-hdr">
              <div className="modal-title flex gap8" style={{ alignItems: "center" }}>
                <Icon name={editingId ? "edit" : "target"} size={20} />
                <span>{editingId ? "EDIT GOAL" : "SET A NEW GOAL"}</span>
              </div>
              <button className="btn-ghost" onClick={() => setShowAdd(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Category Selector Tabs */}
              <div className="il mb8">GOAL CATEGORY</div>
              <div className="grid3 gap8 mb16">
                <button
                  type="button"
                  className={`btn-tab flex gap6 ${form.type === "strength" ? "active" : ""}`}
                  style={{
                    padding: "9px 6px",
                    fontSize: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    border: form.type === "strength" ? "1px solid var(--accent)" : "1px solid var(--border)",
                    borderRadius: "var(--r-sm)",
                    background: form.type === "strength" ? "var(--accent-subtle)" : "var(--surface)",
                    color: form.type === "strength" ? "var(--accent)" : "var(--muted)",
                  }}
                  onClick={() => setForm((p) => ({ ...p, type: "strength" }))}
                >
                  <Icon name="dumbbell" size={15} />
                  <span>Strength</span>
                </button>
                <button
                  type="button"
                  className={`btn-tab flex gap6 ${form.type === "body" ? "active" : ""}`}
                  style={{
                    padding: "9px 6px",
                    fontSize: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    border: form.type === "body" ? "1px solid var(--accent)" : "1px solid var(--border)",
                    borderRadius: "var(--r-sm)",
                    background: form.type === "body" ? "var(--accent-subtle)" : "var(--surface)",
                    color: form.type === "body" ? "var(--accent)" : "var(--muted)",
                  }}
                  onClick={() => setForm((p) => ({ ...p, type: "body" }))}
                >
                  <Icon name="scale" size={15} />
                  <span>Physique</span>
                </button>
                <button
                  type="button"
                  className={`btn-tab flex gap6 ${form.type === "consistency" ? "active" : ""}`}
                  style={{
                    padding: "9px 6px",
                    fontSize: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    border: form.type === "consistency" ? "1px solid var(--accent)" : "1px solid var(--border)",
                    borderRadius: "var(--r-sm)",
                    background: form.type === "consistency" ? "var(--accent-subtle)" : "var(--surface)",
                    color: form.type === "consistency" ? "var(--accent)" : "var(--muted)",
                  }}
                  onClick={() => setForm((p) => ({ ...p, type: "consistency" }))}
                >
                  <Icon name="repeat" size={15} />
                  <span>Habit</span>
                </button>
              </div>

              {/* Strength Form Fields */}
              {form.type === "strength" && (
                <>
                  <div className="mb12">
                    <div className="il">SELECT EXERCISE</div>
                    <select
                      className="inp"
                      value={form.exercise}
                      onChange={(e) => setForm((p) => ({ ...p, exercise: e.target.value }))}
                    >
                      {Object.entries(exerciseGroups).map(([group, exercises]) => (
                        <optgroup key={group} label={group}>
                          {exercises.map((ex) => (
                            <option key={ex} value={ex}>
                              {ex}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="__custom__">+ Custom Exercise...</option>
                    </select>
                  </div>

                  {form.exercise === "__custom__" && (
                    <div className="mb12">
                      <div className="il">CUSTOM EXERCISE NAME</div>
                      <input
                        className="inp"
                        type="text"
                        placeholder="e.g. Incline Dumbbell Press"
                        value={form.customExercise}
                        onChange={(e) => setForm((p) => ({ ...p, customExercise: e.target.value }))}
                      />
                    </div>
                  )}

                  <div className="grid2 gap10 mb12">
                    <div>
                      <div className="il">TARGET WEIGHT ({store.settings.unit})</div>
                      <input
                        className="inp"
                        type="number"
                        step="any"
                        placeholder="e.g. 100"
                        value={form.targetWeight}
                        onChange={(e) => setForm((p) => ({ ...p, targetWeight: e.target.value }))}
                      />
                    </div>
                    <div>
                      <div className="il">TARGET REPS</div>
                      <input
                        className="inp"
                        type="number"
                        placeholder="e.g. 5"
                        value={form.targetReps}
                        onChange={(e) => setForm((p) => ({ ...p, targetReps: e.target.value }))}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Body Form Fields */}
              {form.type === "body" && (
                <>
                  <div className="grid2 gap10 mb12">
                    <div>
                      <div className="il">METRIC</div>
                      <select
                        className="inp"
                        value={form.metric}
                        onChange={(e) => setForm((p) => ({ ...p, metric: e.target.value }))}
                      >
                        <option value="weight">Body Weight ({store.settings.unit})</option>
                        <option value="fat">Body Fat (%)</option>
                      </select>
                    </div>
                    <div>
                      <div className="il">TARGET VALUE</div>
                      <input
                        className="inp"
                        type="number"
                        step="any"
                        placeholder={form.metric === "fat" ? "e.g. 12" : "e.g. 75"}
                        value={form.targetValue}
                        onChange={(e) => setForm((p) => ({ ...p, targetValue: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="mb12">
                    <div className="il">STARTING VALUE (FOR PROGRESS TRACKING)</div>
                    <input
                      className="inp"
                      type="number"
                      step="any"
                      placeholder="e.g. 82"
                      value={form.startValue}
                      onChange={(e) => setForm((p) => ({ ...p, startValue: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {/* Consistency Form Fields */}
              {form.type === "consistency" && (
                <div className="grid2 gap10 mb12">
                  <div>
                    <div className="il">TARGET WORKOUTS</div>
                    <input
                      className="inp"
                      type="number"
                      placeholder="e.g. 16"
                      value={form.targetWorkouts}
                      onChange={(e) => setForm((p) => ({ ...p, targetWorkouts: e.target.value }))}
                    />
                  </div>
                  <div>
                    <div className="il">TIMEFRAME</div>
                    <select
                      className="inp"
                      value={form.period}
                      onChange={(e) => setForm((p) => ({ ...p, period: e.target.value }))}
                    >
                      <option value="month">Current Month</option>
                      <option value="30days">Rolling 30 Days</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Target Date */}
              <div className="mb12">
                <div className="il flex gap6" style={{ alignItems: "center" }}>
                  <Icon name="calendar" size={13} />
                  <span>TARGET DEADLINE (OPTIONAL)</span>
                </div>
                <input
                  className="inp"
                  type="date"
                  value={form.targetDate}
                  onChange={(e) => setForm((p) => ({ ...p, targetDate: e.target.value }))}
                />
              </div>

              {/* Notes */}
              <div className="mb16">
                <div className="il">PERSONAL NOTES / MOTIVATION</div>
                <input
                  className="inp"
                  type="text"
                  placeholder="e.g. Hit this before summer cut!"
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                />
              </div>

              <button
                className="btn btn-acc"
                style={{ width: "100%", padding: 13 }}
                onClick={handleSaveGoal}
                disabled={isInvalid}
              >
                <Icon name={editingId ? "check" : "plus"} size={16} />
                <span>{editingId ? "Update Target" : "Create Target"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Overlay */}
      {celebratingGoal && (
        <div className="celebrate-overlay" onClick={() => setCelebratingGoal(null)}>
          <div className="celebrate-box" onClick={(e) => e.stopPropagation()}>
            <div className="celebrate-icon-wrap">
              <Icon name="trophy" size={44} />
            </div>

            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, letterSpacing: 1, color: "var(--accent)", marginBottom: 6 }}>
              TARGET SMASHED!
            </div>

            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>
              {celebratingGoal.exercise || "Milestone Complete"}
            </div>

            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24, lineHeight: 1.5 }}>
              You crushed your target! Discipline and grit pay off. Take a moment to savor the victory, then set your sights even higher.
            </div>

            <button
              className="btn btn-acc"
              style={{ width: "100%", padding: 12, justifyContent: "center" }}
              onClick={() => setCelebratingGoal(null)}
            >
              <Icon name="sparkles" size={16} />
              <span>Keep Grinding</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
