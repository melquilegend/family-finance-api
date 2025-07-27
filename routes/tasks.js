const express = require('express');
const Task = require('../models/Task');
const { verifyToken } = require('./auth');
const router = express.Router();

// Get all tasks for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId }
      ]
    })
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Failed to get tasks', error: error.message });
  }
});

// Create new task
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.userId,
      dueDate
    });

    await task.save();
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');
    
    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Failed to create task', error: error.message });
  }
});

// Update task
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, completed, assignedTo, dueDate } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { 
        _id: req.params.id,
        $or: [
          { createdBy: req.userId },
          { assignedTo: req.userId }
        ]
      },
      { title, description, completed, assignedTo, dueDate },
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found or access denied' });
    }

    res.json({
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
});

// Delete task
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId }
      ]
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or access denied' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
});

module.exports = router;