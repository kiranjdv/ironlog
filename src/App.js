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

export default function App() {
  const store = useStore();
  const [tab, setTab] = useState("dashboard");
  const dark = store.settings?.theme !== "light";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const TABS = [
    { id: "dashboard", l: "Dashboard" },
    { id: "workout", l: "Workout" },
    { id: "history", l: "History" },
    { id: "analytics", l: "Analytics" },
    { id: "body", l: "Body" },
    { id: "planner", l: "Planner" },
    { id: "goals", l: "Goals" },
    { id: "settings", l: "Settings" },
  ];

  return (
    <div className="app">
      {!store.currentUser ? (
        <LoginPage store={store} />
      ) : (
        <>
          <nav className="nav">
            <div className="nav-logo">⚡ IRONLOG</div>
            <div className="nav-tabs">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`nav-tab ${tab === t.id ? "active" : ""}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.l}
                </button>
              ))}
            </div>
            <div className="nav-r">
              <div className="avatar">
                {store.user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>
          </nav>
          {tab === "dashboard" && <DashboardPage store={store} />}
          {tab === "workout" && <WorkoutPage store={store} />}
          {tab === "history" && <HistoryPage store={store} />}
          {tab === "analytics" && <AnalyticsPage store={store} />}
          {tab === "body" && <BodyPage store={store} />}
          {tab === "planner" && <PlannerPage store={store} />}
          {tab === "goals" && <GoalsPage store={store} />}
          {tab === "settings" && <SettingsPage store={store} />}
        </>
      )}
    </div>
  );
}