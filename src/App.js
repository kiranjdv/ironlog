import { useState, useEffect } from "react";
import "./styles/theme.css";

import useStore from "./hooks/useStore";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import WorkoutPage from "./pages/WorkoutPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PlannerPage from "./pages/PlannerPage";
import GoalsPage from "./pages/GoalsPage";
import SettingsPage from "./pages/SettingsPage";
import { Icon } from "./components/Icons";

export default function App() {
  const store = useStore();
  const [tab, setTab] = useState("dashboard");
  const [analyticsSubTab, setAnalyticsSubTab] = useState("insights");
  const [settingsSubTab, setSettingsSubTab] = useState("general");
  const dark = store.settings?.theme !== "light";

  const navigateTab = (targetTab, subTabKey = null) => {
    if (targetTab === "history") {
      setTab("analytics");
      setAnalyticsSubTab("history");
    } else if (targetTab === "body") {
      setTab("settings");
      setSettingsSubTab("body");
    } else {
      setTab(targetTab);
      if (targetTab === "analytics" && subTabKey) {
        setAnalyticsSubTab(subTabKey);
      }
      if (targetTab === "settings" && subTabKey) {
        setSettingsSubTab(subTabKey);
      }
    }
  };

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
    { id: "analytics", l: "Analytics", icon: "analytics" },
    { id: "planner", l: "Planner", icon: "planner" },
    { id: "goals", l: "Goals", icon: "goals" },
    { id: "settings", l: "Settings", icon: "settings" },
  ];

  const MOBILE_DOCK_TABS = [
    { id: "dashboard", l: "Home", icon: "dashboard" },
    { id: "workout", l: "Workout", icon: "workout" },
    { id: "analytics", l: "Analytics", icon: "analytics" },
    { id: "planner", l: "Plan", icon: "planner" },
    { id: "goals", l: "Goals", icon: "goals" },
    { id: "settings", l: "Settings", icon: "settings" },
  ];

  const isAnalyticsActive = tab === "analytics" || tab === "history";
  const isSettingsActive = tab === "settings" || tab === "body";

  const checkTabActive = (tabId) => {
    if (tabId === "analytics") return isAnalyticsActive;
    if (tabId === "settings") return isSettingsActive;
    return tab === tabId;
  };

  return (
    <div className="app">
      {!store.currentUser ? (
        <LoginPage store={store} />
      ) : (
        <>
          <nav className="nav">
            <div className="nav-left">
              <div className="nav-logo" onClick={() => navigateTab("dashboard")} style={{ cursor: "pointer" }}>
                IRONLOG
              </div>
              {store.active && (
                <div
                  className="nav-live-badge"
                  onClick={() => navigateTab("workout")}
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
                  className={`nav-tab ${checkTabActive(t.id) ? "active" : ""}`}
                  onClick={() => navigateTab(t.id)}
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
                onClick={() => navigateTab("settings")}
                title={`Logged in as ${store.user?.name || "Athlete"}`}
              >
                {store.user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </nav>

          {/* Main Views */}
          {tab === "dashboard" && <DashboardPage store={store} setTab={navigateTab} />}
          {tab === "workout" && <WorkoutPage store={store} setTab={navigateTab} />}
          {isAnalyticsActive && (
            <AnalyticsPage
              store={store}
              setTab={navigateTab}
              subTab={tab === "history" ? "history" : analyticsSubTab}
              setSubTab={setAnalyticsSubTab}
            />
          )}
          {tab === "planner" && <PlannerPage store={store} />}
          {tab === "goals" && <GoalsPage store={store} setTab={navigateTab} />}
          {isSettingsActive && (
            <SettingsPage
              store={store}
              setTab={navigateTab}
              subTab={tab === "body" ? "body" : settingsSubTab}
              setSubTab={setSettingsSubTab}
            />
          )}

          {/* Floating Mobile Bottom Dock */}
          <nav className="mobile-dock">
            <div className="mobile-dock-inner">
              {MOBILE_DOCK_TABS.map((t) => (
                <button
                  key={t.id}
                  className={`dock-item ${checkTabActive(t.id) ? "active" : ""}`}
                  onClick={() => navigateTab(t.id)}
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