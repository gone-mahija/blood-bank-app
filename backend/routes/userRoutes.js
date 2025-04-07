// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, checkAdmin } = require('../middleware/authMiddleware');

// Get all users (admin only)
router.get('/', protect, checkAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Hide passwords
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Delete a user by ID (admin only)
router.delete('/:id', protect, checkAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Get logged-in user's profile
router.get('/profile', protect, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;
