const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ order: -1, createdAt: -1 });
  res.json(tasks);
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { text, category, priority, dueDate } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please provide task text');
  }

  const task = await Task.create({
    user: req.user._id,
    text,
    category: category || 'personal',
    priority: priority || 'medium',
    dueDate: dueDate || null,
  });

  res.status(201).json(task);
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const { text, category, priority, dueDate, completed, order } = req.body;

  task.text = text || task.text;
  task.category = category || task.category;
  task.priority = priority || task.priority;
  task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;
  task.completed = completed !== undefined ? completed : task.completed;
  task.order = order !== undefined ? order : task.order;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc    Toggle task completion
// @route   PATCH /api/tasks/:id/complete
// @access  Private
const toggleComplete = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.completed = !task.completed;
  const updatedTask = await task.save();
  res.json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();
  res.json({ message: 'Task removed', id: req.params.id });
});

// @desc    Reorder tasks
// @route   PUT /api/tasks/reorder
// @access  Private
const reorderTasks = asyncHandler(async (req, res) => {
  const { tasks } = req.body;

  for (let i = 0; i < tasks.length; i++) {
    await Task.findOneAndUpdate(
      { _id: tasks[i].id, user: req.user._id },
      { order: tasks[i].order }
    );
  }

  res.json({ message: 'Tasks reordered' });
});

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = asyncHandler(async (req, res) => {
  const totalTasks = await Task.countDocuments({ user: req.user._id });
  const completedTasks = await Task.countDocuments({ user: req.user._id, completed: true });
  const pendingTasks = totalTasks - completedTasks;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTasks = await Task.countDocuments({
    user: req.user._id,
    dueDate: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
    completed: false,
  });

  res.json({
    total: totalTasks,
    completed: completedTasks,
    pending: pendingTasks,
    today: todayTasks,
    progress: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
  });
});

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  toggleComplete,
  deleteTask,
  reorderTasks,
  getTaskStats,
};