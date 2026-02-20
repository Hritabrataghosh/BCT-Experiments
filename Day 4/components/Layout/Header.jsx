import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Header = ({ user, searchQuery, setSearchQuery }) => {
  const [darkMode, setDarkMode] = useState(true);
  
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
      document.body.classList.toggle('light-mode', saved === 'false');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('light-mode', !newMode);
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="top-header">
      <div className="header-left">
        <h2>My Tasks</h2>
        <p>{today}</p>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button className="btn btn-icon theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          <i className={`fas ${darkMode ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>
        
        <button className="btn btn-icon notification-btn" title="Notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-menu" title={user?.name}>
          <div className="user-avatar">{user?.avatar || 'U'}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;