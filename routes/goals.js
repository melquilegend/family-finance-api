const express = require('express');
const Goal = require('../models/Goal');
const { verifyToken } = require('./auth');
const router = express.Router();

// Get all goals for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const goals = await Goal.find({
      $or: [
        { createdBy: req.userId },
        { assignedTo: req.userId }
      ]
    })
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
    
    res.json(goals);
  } catch (error) {
    console.error('Get goals error:', error);
    res.status(500).json({ message: 'Failed to get goals', error: error.message });
  }
});

// Create new goal
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, targetAmount, currentAmount, dueDate, assignedTo } = req.body;
    
    const goal = new Goal({
      title,
      description,
      targetAmount,
      currentAmount: currentAmount || 0,
      dueDate,
      assignedTo: assignedTo || [],
      createdBy: req.userId
    });

    await goal.save();
    await goal.populate('createdBy', 'name email');
    await goal.populate('assignedTo', 'name email');
    
    res.status(201).json({
      message: 'Goal created successfully',
      goal
    });
  } catch (error) {
    console.error('Create goal error:', error);
    res.status(500).json({ message: 'Failed to create goal', error: error.message });
  }
});

// Update goal
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, description, targetAmount, currentAmount, dueDate, assignedTo } = req.body;
    
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.userId },
      { title, description, targetAmount, currentAmount, dueDate, assignedTo },
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'name email')
    .populate('assignedTo', 'name email');

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or access denied' });
    }

    res.json({
      message: 'Goal updated successfully',
      goal
    });
  } catch (error) {
    console.error('Update goal error:', error);
    res.status(500).json({ message: 'Failed to update goal', error: error.message });
  }
});

// Delete goal
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found or access denied' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Delete goal error:', error);
    res.status(500).json({ message: 'Failed to delete goal', error: error.message });
  }
});

module.exports = router;