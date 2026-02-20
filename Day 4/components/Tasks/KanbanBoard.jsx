import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './Kanban.css';

const KanbanBoard = ({ tasks }) => {
  const { updateTask, toggleTaskComplete } = useTasks();
  const [draggedTask, setDraggedTask] = useState(null);

  const columns = [
    { id: 'todo', title: 'To Do', color: '#6366f1' },
    { id: 'inprogress', title: 'In Progress', color: '#f59e0b' },
    { id: 'done', title: 'Done', color: '#10b981' }
  ];

  const getTasksByStatus = (status) => {
    if (status === 'done') return tasks.filter(t => t.completed);
    if (status === 'inprogress') return tasks.filter(t => !t.completed && t.priority === 'high');
    return tasks.filter(t => !t.completed && t.priority !== 'high');
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedTask(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    if (!draggedTask) return;

    if (status === 'done') {
      await toggleTaskComplete(draggedTask._id);
    } else if (status === 'inprogress') {
      await updateTask(draggedTask._id, { priority: 'high' });
    } else {
      await updateTask(draggedTask._id, { priority: 'medium', completed: false });
    }
  };

  return (
    <div className="kanban-board">
      {columns.map(column => (
        <div 
          key={column.id}
          className="kanban-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="kanban-header" style={{ borderColor: column.color }}>
            <h3 style={{ color: column.color }}>{column.title}</h3>
            <span className="task-count">{getTasksByStatus(column.id).length}</span>
          </div>
          
          <div className="kanban-tasks">
            {getTasksByStatus(column.id).map(task => (
              <div
                key={task._id}
                className="kanban-card"
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                onDragEnd={handleDragEnd}
              >
                <div className="kanban-card-priority" style={{ 
                  background: task.priority === 'high' ? '#ef4444' : 
                             task.priority === 'medium' ? '#f59e0b' : '#10b981'
                }}></div>
                <p>{task.text}</p>
                <div className="kanban-card-meta">
                  <span style={{ color: getCategoryColor(task.category) }}>
                    <i className="fas fa-tag"></i> {task.category}
                  </span>
                  {task.dueDate && (
                    <span>
                      <i className="fas fa-clock"></i> {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
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

export default KanbanBoard;