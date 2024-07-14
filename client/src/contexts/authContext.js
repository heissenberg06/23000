import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initially set the logged in state based on the token's presence
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('authToken')));

  useEffect(() => {
    // Effect to handle cases where the token might change
    const handleStorageChange = () => {
      // This ensures that isLoggedIn is updated when authToken changes, across tabs/windows
      setIsLoggedIn(Boolean(localStorage.getItem('authToken')));
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
