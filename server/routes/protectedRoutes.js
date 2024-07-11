const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Example of a protected route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'You have accessed a protected route', user: req.user });
});

module.exports = router;
