const express = require('express');
const router = express.Router();
const pool = require('../database'); // Adjust path as needed
const verifyToken = require('../middleware/authMiddleware'); // Ensure path is correct
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// Get user profile
router.get('/profile', verifyToken, getUserProfile);

// Update user profile
router.put('/profile', verifyToken, updateUserProfile);

// Route to validate the user's token
router.get('/validate-token', verifyToken, (req, res) => {
    const userId = req.user.id; // Assuming your JWT contains the user ID
    const query = 'SELECT * FROM users WHERE id = ?'; // Adjust SQL query based on your schema

    pool.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database query failed' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // User exists and token is valid
        res.json({ message: 'Token is valid', user: results[0] });
    });
});

module.exports = router;
