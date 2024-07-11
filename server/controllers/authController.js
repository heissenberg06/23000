const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database');

// Register User
exports.registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        const [result] = await pool.promise().execute(query, [username, hashedPassword, email]);

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        console.error('Error during registration:', error.message); // Log error message for debugging
        res.status(500).json({ message: 'Server error while registering user' });
    }
};


// Login User
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [users] = await pool.promise().execute(query, [username]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error.stack);
        console.error('Error during login:', error.message); // Log error message for debugging
        res.status(500).json({ message: 'Server error while logging in' });
    }
};
