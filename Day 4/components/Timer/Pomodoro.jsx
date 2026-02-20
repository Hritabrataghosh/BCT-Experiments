import React, { useState, useEffect, useRef } from 'react';
import './Pomodoro.css';

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, shortBreak, longBreak
  const [cycles, setCycles] = useState(0);
  const [showTimer, setShowTimer] = useState(false);
  
  const timerRef = useRef(null);
  const circleRef = useRef(null);

  const modes = {
    work: { time: 25 * 60, label: 'Focus', color: '#6366f1' },
    shortBreak: { time: 5 * 60, label: 'Short Break', color: '#10b981' },
    longBreak: { time: 15 * 60, label: 'Long Break', color: '#f59e0b' }
  };

  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev - 1);
      }, 1000);
    } else if (time === 0) {
      handleComplete();
    }

    return () => clearInterval(timerRef.current);
  }, [isActive, time]);

  const handleComplete = () => {
    setIsActive(false);
    playNotificationSound();
    
    if (mode === 'work') {
      const newCycles = cycles + 1;
      setCycles(newCycles);
      if (newCycles % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('work');
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTime(modes[newMode].time);
    setIsActive(false);
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(modes[mode].time);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((modes[mode].time - time) / modes[mode].time) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnGgU1k9n1unEiBC13yO/eizEIHWq+8+OZURE');
    audio.play().catch(() => {});
  };

  if (!showTimer) {
    return (
      <button className="pomodoro-fab" onClick={() => setShowTimer(true)}>
        <i className="fas fa-clock"></i>
        <span className="fab-tooltip">Focus Timer</span>
      </button>
    );
  }

  return (
    <div className="pomodoro-overlay" onClick={(e) => e.target === e.currentTarget && setShowTimer(false)}>
      <div className="pomodoro-modal">
        <button className="pomodoro-close" onClick={() => setShowTimer(false)}>
          <i className="fas fa-times"></i>
        </button>

        <div className="pomodoro-modes">
          {Object.entries(modes).map(([key, { label, color }]) => (
            <button
              key={key}
              className={`mode-btn ${mode === key ? 'active' : ''}`}
              onClick={() => switchMode(key)}
              style={{ '--mode-color': color }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="timer-display">
          <svg className="timer-circle" viewBox="0 0 260 260">
            <circle
              className="timer-circle-bg"
              cx="130"
              cy="130"
              r="120"
            />
            <circle
              ref={circleRef}
              className="timer-circle-progress"
              cx="130"
              cy="130"
              r="120"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
                stroke: modes[mode].color
              }}
            />
          </svg>
          <div className="timer-text">
            <span className="time">{formatTime(time)}</span>
            <span className="mode-label">{modes[mode].label}</span>
          </div>
        </div>

        <div className="timer-controls">
          <button 
            className={`control-btn ${isActive ? 'pause' : 'start'}`}
            onClick={toggleTimer}
          >
            <i className={`fas ${isActive ? 'fa-pause' : 'fa-play'}`}></i>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="control-btn reset" onClick={resetTimer}>
            <i className="fas fa-redo"></i>
            Reset
          </button>
        </div>

        <div className="cycles-display">
          <span>Completed Cycles: {cycles}</span>
          <div className="cycle-dots">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`cycle-dot ${i < (cycles % 4) ? 'filled' : ''}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;