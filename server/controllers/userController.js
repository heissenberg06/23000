const pool = require('../database');
const bcrypt = require('bcryptjs'); // Make sure to install bcryptjs with npm install bcryptjs

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
    const { username, email, password } = req.body; // Include password in the request body

    try {
        let query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
        let queryParams = [username, email, userId];

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
            queryParams = [username, email, hashedPassword, userId];
        }

        await pool.promise().execute(query, queryParams);
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile' });
    }
};

exports.changeUserPassword = async (req, res) => {
    const { userId } = req.user; // Assuming userId is attached to the request from your auth middleware
    const { currentPassword, newPassword } = req.body;

    try {
        // First, fetch the user's current password hash from the database
        const query = 'SELECT password FROM users WHERE id = ?';
        const [users] = await pool.promise().execute(query, [userId]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(currentPassword, users[0].password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // If the current password is correct, hash the new password and update it in the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
        await pool.promise().execute(updateQuery, [hashedPassword, userId]);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error during password update:', error);
        res.status(500).json({ message: 'Server error while updating password' });
    }
};
