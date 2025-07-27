const express = require('express');
const router = express.Router();

// Default expense categories
const categories = [
  { id: 'groceries', name: 'Groceries', color: '#10B981', icon: '🛒' },
  { id: 'entertainment', name: 'Entertainment', color: '#8B5CF6', icon: '🎬' },
  { id: 'bills', name: 'Bills', color: '#EF4444', icon: '📄' },
  { id: 'transport', name: 'Transport', color: '#F59E0B', icon: '🚗' },
  { id: 'health', name: 'Health', color: '#06B6D4', icon: '🏥' },
  { id: 'shopping', name: 'Shopping', color: '#EC4899', icon: '🛍️' },
  { id: 'other', name: 'Other', color: '#6B7280', icon: '📦' }
];

// Get all categories
router.get('/', (req, res) => {
  res.json({
    message: 'Categories retrieved successfully',
    categories
  });
});

module.exports = router;