import { useEffect, useState } from "react";
import "./StudyPlanner.css";
import Kanban from "./Kanban";
import WeeklyView from "./WeeklyPlanner";
import FocusMode from "./FocusMode";
import ProgressChart from "./ProgressChart";

export default function StudyPlanner() {
  const [theme, setTheme] = useState("dark");
  const [tasks, setTasks] = useState(() => {
    const s = localStorage.getItem("tasks");
    return s ? JSON.parse(s) : [];
  });

  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", xp);
  }, [tasks, xp]);

  const addTask = (t) => setTasks(prev => [...prev, t]);
  const updateTasks = (t) => setTasks(t);

  return (
    <div className={`planner ${theme}`}>
      <div className="bg-anim"></div>

      <header className="header glass">
        <h1 className="glow-text">Study Planner ✨</h1>
        <button className="btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </header>

      <section className="section glass">
        <FocusMode />
      </section>

      <section className="section glass">
        <Kanban tasks={tasks} setTasks={updateTasks} setXp={setXp} />
      </section>

      <section className="section glass">
        <WeeklyView tasks={tasks} />
      </section>

      <section className="section glass">
        <ProgressChart tasks={tasks} xp={xp} />
      </section>
    </div>
  );
}
