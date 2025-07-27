const express = require('express');
const Expense = require('../models/Expense');
const { verifyToken } = require('./auth');
const router = express.Router();

// Get all expenses for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId })
      .sort({ date: -1, createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Failed to get expenses', error: error.message });
  }
});

// Create new expense
router.post('/', verifyToken, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    
    const expense = new Expense({
      userId: req.userId,
      amount,
      category,
      description,
      date: date || new Date()
    });

    await expense.save();
    res.status(201).json({
      message: 'Expense created successfully',
      expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Failed to create expense', error: error.message });
  }
});

// Update expense
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { amount, category, description, date },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Failed to update expense', error: error.message });
  }
});

// Delete expense
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
  }
});

module.exports = router;