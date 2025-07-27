const express = require('express');
const Savings = require('../models/Savings');
const { verifyToken } = require('./auth');
const router = express.Router();

// Get all savings for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const savings = await Savings.find({ userId: req.userId })
      .sort({ date: -1, createdAt: -1 });
    res.json(savings);
  } catch (error) {
    console.error('Get savings error:', error);
    res.status(500).json({ message: 'Failed to get savings', error: error.message });
  }
});

// Create new saving
router.post('/', verifyToken, async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    
    const saving = new Savings({
      userId: req.userId,
      amount,
      description,
      date: date || new Date()
    });

    await saving.save();
    res.status(201).json({
      message: 'Saving created successfully',
      saving
    });
  } catch (error) {
    console.error('Create saving error:', error);
    res.status(500).json({ message: 'Failed to create saving', error: error.message });
  }
});

// Update saving
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { amount, description, date } = req.body;
    
    const saving = await Savings.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { amount, description, date },
      { new: true, runValidators: true }
    );

    if (!saving) {
      return res.status(404).json({ message: 'Saving not found' });
    }

    res.json({
      message: 'Saving updated successfully',
      saving
    });
  } catch (error) {
    console.error('Update saving error:', error);
    res.status(500).json({ message: 'Failed to update saving', error: error.message });
  }
});

// Delete saving
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const saving = await Savings.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!saving) {
      return res.status(404).json({ message: 'Saving not found' });
    }

    res.json({ message: 'Saving deleted successfully' });
  } catch (error) {
    console.error('Delete saving error:', error);
    res.status(500).json({ message: 'Failed to delete saving', error: error.message });
  }
});

module.exports = router;