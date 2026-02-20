import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import Sidebar from '../components/Layout/Sidebar';
import Header from '../components/Layout/Header';
import TaskList from '../components/Tasks/TaskList';
import KanbanBoard from '../components/Tasks/KanbanBoard';
import Pomodoro from '../components/Timer/Pomodoro';
import Particles from '../components/Effects/Particles';
import AddTask from '../components/Tasks/AddTask';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tasks, stats, fetchTasks, fetchStats } = useTasks();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('all');
const [viewMode, setViewMode] = useState('list'); // 'list' or 'kanban'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
    fetchStats();
  }, [user, navigate, fetchTasks, fetchStats]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (currentView) {
      case 'today':
        const today = new Date().toISOString().split('T')[0];
        return matchesSearch && (task.dueDate?.split('T')[0] === today || !task.dueDate) && !task.completed;
      case 'upcoming':
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return matchesSearch && task.dueDate && new Date(task.dueDate) >= tomorrow && !task.completed;
      case 'completed':
        return matchesSearch && task.completed;
      default:
        return matchesSearch;
    }
  });

 return (
    <>
      <Particles />
      <div className="dashboard" style={{ position: 'relative', zIndex: 1 }}>
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        stats={stats}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        <Header 
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <div className="dashboard-content">
          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                  <i className="fas fa-tasks"></i>
                </div>
                <div>
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <i className="fas fa-check"></i>
                </div>
                <div>
                  <span className="stat-value">{stats.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <span className="stat-value">{stats.pending}</span>
                  <span className="stat-label">Pending</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' }}>
                  <i className="fas fa-percentage"></i>
                </div>
                <div>
                  <span className="stat-value">{stats.progress}%</span>
                  <span className="stat-label">Progress</span>
                </div>
              </div>
            </div>
          )}
          <div className="progress-ring-container">
  <svg className="progress-ring" width="120" height="120">
    <circle
      className="progress-ring-bg"
      stroke="rgba(255,255,255,0.1)"
      strokeWidth="8"
      fill="transparent"
      r="52"
      cx="60"
      cy="60"
    />
    <circle
      className="progress-ring-fill"
      stroke="url(#gradient)"
      strokeWidth="8"
      fill="transparent"
      r="52"
      cx="60"
      cy="60"
      strokeDasharray={`${2 * Math.PI * 52}`}
      strokeDashoffset={`${2 * Math.PI * 52 * (1 - (stats?.progress || 0) / 100)}`}
      strokeLinecap="round"
      style={{ transition: 'stroke-dashoffset 0.5s ease' }}
    />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
    </defs>
  </svg>
  <div className="progress-ring-text">
    <span>{stats?.progress || 0}%</span>
    <small>Done</small>
  </div>
</div>

          <div className="progress-bar-container">
            <div className="progress-header">
              <span>Daily Progress</span>
              <span>{stats?.progress || 0}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${stats?.progress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="view-toggle">
  <button 
    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
    onClick={() => setViewMode('list')}
  >
    <i className="fas fa-list"></i> List
  </button>
  <button 
    className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
    onClick={() => setViewMode('kanban')}
  >
    <i className="fas fa-columns"></i> Board
  </button>
</div>

<AddTask />

{viewMode === 'list' ? (
  <TaskList 
    tasks={filteredTasks} 
    currentView={currentView}
  />
) : (
  <KanbanBoard tasks={filteredTasks} />
)}

        </div>
      </main>
    <Pomodoro />
      </div>
    </>
  );
};

export default Dashboard;