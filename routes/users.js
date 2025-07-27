const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('./auth');
const router = express.Router();

// Get all users (for family features)
router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
});

// Get user by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to get user', error: error.message });
  }
});

// Update user profile
router.put('/:id', verifyToken, async (req, res) => {
  try {
    // Users can only update their own profile
    if (req.params.id !== req.userId) {
      return res.status(403).json({ message: 'Access denied. You can only update your own profile.' });
    }

    const { name, email, theme, language, currency, profilePicture, description } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, theme, language, currency, profilePicture, description },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

module.exports = router;