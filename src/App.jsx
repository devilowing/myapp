import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavbarComponent from './components/Navbar'; // Ensure correct import
import './App.css'; // Import your CSS for layout
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import DataList from './pages/DataList';
import Login from './pages/Login';
import Register from './pages/Register';
// import IncomeExpensePage from './pages/IncomeExpensePage'; // Import your new page
import { checkTokenExpiration, clearToken } from './auth'; // Ensure these functions are correctly implemented
import Finance from './pages/Finance';
import Debt from './pages/debt';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && checkTokenExpiration(token)) {
      // Token expired
      clearToken();
      setIsLoggedIn(false);
    }

    // Check for changes in localStorage
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token && checkTokenExpiration(token)) {
        clearToken();
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(!!localStorage.getItem('token'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    clearToken();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        <NavbarComponent isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="main-content">
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/" />} /> {/* Redirect default route */}
              <Route path="/datalist" element={isLoggedIn ? <DataList /> : <Navigate to="/login" />} />
              <Route path="/finance" element={isLoggedIn ? <Finance /> : <Navigate to="/login" />} />
              <Route path="/debt" element={isLoggedIn ? <Debt /> : <Navigate to="/login" />} />
              {/* <Route path="/income-expense" element={isLoggedIn ? <IncomeExpensePage /> : <Navigate to="/login" />} /> */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
