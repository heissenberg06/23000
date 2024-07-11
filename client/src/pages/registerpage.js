import React, { useState } from 'react';
import './registerpage.css'; // Import the CSS for styling
import About from '../widgets/about/about'; // Adjust the path as necessary
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for displaying messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password,
      });
      setMessage(response.data.message + " You are directed to the login. "); // Display success message
      setTimeout(() => navigate('/login'), 2000)
    } catch (error) {
      setMessage(error.response.data.message || 'Registration failed'); // Display error message
    }
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>} {/* Display message */}
      </div>
      <About />
    </div>
  );
};

export default RegisterPage;
