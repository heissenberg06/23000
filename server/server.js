require('dotenv').config();
console.log('JWT Secret:', process.env.JWT_SECRET);
const express = require('express');
const app = express();
const cors = require('cors'); // Import CORS
const carRoutes = require('./routes/carRoutes');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Import Routes
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/user', userRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/user', userRoutes);
app.use('/api', carRoutes);

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

