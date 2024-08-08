import React, { useState } from 'react';
import './loginpage.css';
import About from '../widgets/about';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../contexts/authContext'; // Import useAuth

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State for displaying messages
  const navigate = useNavigate(); // Create instance of useNavigate
  const { login } = useAuth(); // Get the login function from the AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      });
      setMessage('Login successful! Redirecting to home...');
      // Use the login function to store the token and update auth state
      login(response.data.token);
      // Redirect to home page after a short delay
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Login failed: ' + (error.response.data.message || 'Unknown error')); // Display error message
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a> {/* This is a placeholder link */}
          </div>
        </form>
        {message && <p>{message}</p>} {/* Display messages */}
      </div>
      <About /> {/* Include About component as footer */}
    </div>
  );
};

export default LoginPage;
