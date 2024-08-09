import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Import the CSS file
import { useAuth } from '../contexts/authContext'; // Import the useAuth hook, adjust the path as needed

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth(); // Use the useAuth hook to get authentication status and logout function

  return (
    <nav className="navbar">
      <Link to="/">Ana Sayfa</Link>
      <Link to="/sales">İlanlar</Link>
      <Link to="/upload">İlan Ver</Link>
      <Link to="/manage-cars">anan</Link>
      <Link to="/contact">İletişim</Link> {/* Added About link */}
      <div className="right-links">
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login">Giriş Yap</Link>
            <Link to="/register">Kaydol</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;