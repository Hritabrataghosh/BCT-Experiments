const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please provide task text'],
      trim: true,
      maxlength: [200, 'Task cannot be more than 200 characters'],
    },
    category: {
      type: String,
      required: true,
      enum: ['personal', 'work', 'shopping', 'health', 'other'],
      default: 'personal',
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Task', taskSchema);