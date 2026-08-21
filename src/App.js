import { useState, useEffect } from "react";
import "./styles/theme.css";

import useStore from "./hooks/useStore";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import WorkoutPage from "./pages/WorkoutPage";
import HistoryPage from "./pages/HistoryPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import BodyPage from "./pages/BodyPage";
import PlannerPage from "./pages/PlannerPage";
import GoalsPage from "./pages/GoalsPage";
import SettingsPage from "./pages/SettingsPage";
import { Icon } from "./components/Icons";

export default function App() {
  const store = useStore();
  const [tab, setTab] = useState("dashboard");
  const dark = store.settings?.theme !== "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  if (store.isDbLoading) {
    return (
      <div className="db-loading-screen">
        <div className="db-loading-content">
          <div className="db-loading-logo">⚡ IRONLOG</div>
          <div className="db-loading-spinner-wrap">
            <div className="db-loading-spinner"></div>
          </div>
          <div className="db-loading-text">Initializing Secure Database...</div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: "dashboard", l: "Dashboard", icon: "dashboard" },
    { id: "workout", l: "Workout", icon: "workout" },
    { id: "history", l: "History", icon: "history" },
    { id: "analytics", l: "Analytics", icon: "analytics" },
    { id: "body", l: "Body", icon: "body" },
    { id: "planner", l: "Planner", icon: "planner" },
    { id: "goals", l: "Goals", icon: "goals" },
    { id: "settings", l: "Settings", icon: "settings" },
  ];

  const MOBILE_DOCK_TABS = [
    { id: "dashboard", l: "Home", icon: "dashboard" },
    { id: "workout", l: "Workout", icon: "workout" },
    { id: "history", l: "History", icon: "history" },
    { id: "analytics", l: "Stats", icon: "analytics" },
    { id: "planner", l: "Plan", icon: "planner" },
    { id: "goals", l: "Goals", icon: "goals" },
    { id: "body", l: "Body", icon: "body" },
    { id: "settings", l: "Settings", icon: "settings" },
  ];

  return (
    <div className="app">
      {!store.currentUser ? (
        <LoginPage store={store} />
      ) : (
        <>
          <nav className="nav">
            <div className="nav-left">
              <div className="nav-logo" onClick={() => setTab("dashboard")} style={{ cursor: "pointer" }}>
                ⚡ IRONLOG
              </div>
              {store.active && (
                <div
                  className="nav-live-badge"
                  onClick={() => setTab("workout")}
                  title="Workout in progress — click to return"
                >
                  <span className="live-dot"></span>
                  <span>LIVE WORKOUT</span>
                </div>
              )}
            </div>

            <div className="nav-tabs">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`nav-tab ${tab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Icon name={t.icon} size={15} />
                  <span>{t.l}</span>
                </button>
              ))}
            </div>

            <div className="nav-r">
              <div
                className="avatar"
                onClick={() => setTab("settings")}
                title={`Logged in as ${store.user?.name || "Athlete"}`}
              >
                {store.user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </nav>

          {/* Main Views */}
          {tab === "dashboard" && <DashboardPage store={store} setTab={setTab} />}
          {tab === "workout" && <WorkoutPage store={store} setTab={setTab} />}
          {tab === "history" && <HistoryPage store={store} setTab={setTab} />}
          {tab === "analytics" && <AnalyticsPage store={store} />}
          {tab === "body" && <BodyPage store={store} />}
          {tab === "planner" && <PlannerPage store={store} />}
          {tab === "goals" && <GoalsPage store={store} setTab={setTab} />}
          {tab === "settings" && <SettingsPage store={store} />}

          {/* Floating Mobile Bottom Dock */}
          <nav className="mobile-dock">
            <div className="mobile-dock-inner">
              {MOBILE_DOCK_TABS.map((t) => (
                <button
                  key={t.id}
                  className={`dock-item ${tab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  <span className="dock-icon">
                    <Icon name={t.icon} size={18} />
                  </span>
                  <span>{t.l}</span>
                </button>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}