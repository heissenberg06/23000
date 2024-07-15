import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import ProfilePage from './pages/profilepage'; // Import the ProfilePage component
import NavBar from './widgets/navbar';
import { AuthProvider } from './contexts/authContext';
import CarsForSale from './pages/CarsForSale';
import UploadCar from './pages/AddingCarPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path='/sales' element={<CarsForSale/>} />
          <Route path='/upload' element={<UploadCar/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
