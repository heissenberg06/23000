import React, { useState } from 'react';
import './registerpage.css'; // Import the CSS for styling
import About from '../widgets/about'; // Adjust the path as necessary
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirmation password
  const [message, setMessage] = useState(''); // State for displaying messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match'); // Error message if passwords do not match
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password,
      });
      setMessage(response.data.message + " You are directed to the login."); // Display success message
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage(error.response.data.message || 'Registration failed'); // Display error message
    }
  };

  return (
    <div className="page-container">
      <div className="register-container">
        <h1>Kaydol</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Kullanıcı Adı:</label>
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
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Şifre Tekrar:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Kaydol</button>
        </form>
        {message && <p>{message}</p>} {/* Display message */}
      </div>
      <About />
    </div>
  );
};

export default RegisterPage;
