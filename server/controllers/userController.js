const pool = require('../database');

exports.getUserProfile = async (req, res) => {
    const userId = req.user.userId; // Assuming userId is encoded in JWT
    try {
        const query = 'SELECT username, email FROM users WHERE id = ?';
        const [result] = await pool.promise().execute(query, [userId]);
        if (result.length) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile' });
    }
};

exports.updateUserProfile = async (req, res) => {
    const userId = req.user.userId;
    const { username, email } = req.body; // Ensure to validate input data before updating
    try {
        const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
        await pool.promise().execute(query, [username, email, userId]);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile' });
    }
};
