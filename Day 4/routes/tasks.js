const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  toggleComplete,
  deleteTask,
  reorderTasks,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

router.use(protect); // All routes are protected

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/stats').get(getTaskStats);
router.route('/reorder').put(reorderTasks);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/complete', toggleComplete);

module.exports = router;