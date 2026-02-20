import React, { createContext, useState, useContext, useCallback } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const data = await taskService.getTaskStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      await fetchStats();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      await fetchStats();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  const toggleTaskComplete = async (id) => {
    try {
      const updated = await taskService.toggleComplete(id);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      await fetchStats();
      return { success: true, completed: updated.completed };
    } catch (err) {
      return { success: false, error: err.response?.data?.message };
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        error,
        fetchTasks,
        fetchStats,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);