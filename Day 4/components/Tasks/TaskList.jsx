import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import EditTask from './EditTask';
import './Tasks.css';

const TaskList = ({ tasks, currentView, loading }) => {
  const { deleteTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="task-list-container">
        <div className="skeleton-list">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-item">
              <div className="skeleton-checkbox"></div>
              <div className="skeleton-content">
                <div className="skeleton-text"></div>
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <i className="fas fa-clipboard-check"></i>
        </div>
        <h3>No tasks found</h3>
        <p>
          {currentView === 'completed' 
            ? "You haven't completed any tasks yet." 
            : "Add a task above to get started!"}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-filters">
        <button className="filter-btn active">All</button>
        <button className="filter-btn">Active</button>
        <button className="filter-btn">Completed</button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={() => setEditingTask(task)}
            onDelete={() => handleDelete(task._id)}
          />
        ))}
      </ul>

      {editingTask && (
        <EditTask
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;