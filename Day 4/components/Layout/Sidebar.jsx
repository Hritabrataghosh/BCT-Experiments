import React from 'react';
import './Layout.css';

const Sidebar = ({ currentView, setCurrentView, stats, onLogout }) => {
  const menuItems = [
    { id: 'all', label: 'All Tasks', icon: 'fa-th-large', count: stats?.total - stats?.completed || 0 },
    { id: 'today', label: 'Today', icon: 'fa-sun', count: stats?.today || 0 },
    { id: 'upcoming', label: 'Upcoming', icon: 'fa-calendar-alt', count: 0 },
    { id: 'completed', label: 'Completed', icon: 'fa-check-circle', count: stats?.completed || 0 },
  ];

  const categories = [
    { id: 'personal', label: 'Personal', color: '#6366f1' },
    { id: 'work', label: 'Work', color: '#ec4899' },
    { id: 'shopping', label: 'Shopping', color: '#10b981' },
    { id: 'health', label: 'Health', color: '#f59e0b' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <i className="fas fa-check-double"></i>
          <span>TaskFlow</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-label">Menu</span>
          <ul>
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className={currentView === item.id ? 'active' : ''}
                onClick={() => setCurrentView(item.id)}
              >
                <a href="#">
                  <i className={`fas ${item.icon}`}></i>
                  <span>{item.label}</span>
                  {item.count > 0 && <span className="badge">{item.count}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <span className="nav-label">Categories</span>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <a href="#">
                  <span 
                    className="category-dot" 
                    style={{ background: cat.color }}
                  ></span>
                  <span>{cat.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="btn btn-secondary btn-full" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;