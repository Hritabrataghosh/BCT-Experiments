import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './Tasks.css';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { toggleTaskComplete } = useTasks();

  // Safety check - if task is undefined, don't render
  if (!task) {
    return null;
  }

  const handleToggle = async () => {
    const result = await toggleTaskComplete(task._id);
    if (result.success && result.completed) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: 50%;
        top: 50%;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
      `;
      document.body.appendChild(confetti);
      
      const angle = (Math.PI * 2 * i) / 30;
      const velocity = 5 + Math.random() * 5;
      let x = 0, y = 0, opacity = 1;
      
      const animate = () => {
        x += Math.cos(angle) * velocity;
        y += Math.sin(angle) * velocity + 2;
        opacity -= 0.02;
        
        confetti.style.transform = `translate(${x}px, ${y}px)`;
        confetti.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      };
      requestAnimationFrame(animate);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      personal: '#6366f1',
      work: '#ec4899',
      shopping: '#10b981',
      health: '#f59e0b',
    };
    return colors[category] || '#6366f1';
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div 
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={handleToggle}
      >
        {task.completed && <i className="fas fa-check"></i>}
      </div>

      <div className="task-content">
        <div className="task-text">{task.text || 'Untitled Task'}</div>
        <div className="task-meta">
          <span 
            className="task-category"
            style={{ color: getCategoryColor(task.category) }}
          >
            <i className="fas fa-tag"></i> {task.category || 'personal'}
          </span>
          
          {task.dueDate && (
            <span className={isOverdue(task.dueDate) && !task.completed ? 'overdue' : ''}>
              <i className="fas fa-calendar"></i> {formatDate(task.dueDate)}
            </span>
          )}
          
          <span className={`priority-${task.priority || 'medium'}`}>
            <i className="fas fa-flag"></i> {task.priority || 'medium'}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button className="task-btn" onClick={onEdit} title="Edit">
          <i className="fas fa-edit"></i>
        </button>
        <button className="task-btn delete" onClick={onDelete} title="Delete">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;