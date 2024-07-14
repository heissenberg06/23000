import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Corrected import statement

// Create the Auth Context
const AuthContext = createContext();

// Function to check if the token is expired
const checkTokenExpiration = (token) => {
  if (!token) {
    return false;
  }
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 > Date.now();
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initially set the logged in state based on the token's validity
  const token = localStorage.getItem('authToken');
  const [isLoggedIn, setIsLoggedIn] = useState(checkTokenExpiration(token));

  useEffect(() => {
    // Effect to handle cases where the token might change
    const handleStorageChange = () => {
      // This ensures that isLoggedIn is updated when authToken changes, across tabs/windows
      setIsLoggedIn(checkTokenExpiration(localStorage.getItem('authToken')));
    };

    // Adding event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
