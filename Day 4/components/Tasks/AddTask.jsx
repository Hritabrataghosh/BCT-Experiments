import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './Tasks.css';

const AddTask = () => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    const result = await addTask({
      text: text.trim(),
      category,
      priority,
      dueDate: dueDate || null,
    });

    if (result.success) {
      setText('');
      setDueDate('');
      setShowOptions(false);
    }
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="task-input-wrapper">
          <button 
            type="button" 
            className="priority-btn"
            onClick={() => setShowOptions(!showOptions)}
            title="More options"
          >
            <i className="fas fa-plus"></i>
          </button>
          
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setShowOptions(true)}
          />
          
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>

        {showOptions && (
          <div className="task-options">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
            
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Due date"
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default AddTask;