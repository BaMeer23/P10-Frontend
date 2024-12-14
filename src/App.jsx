import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './Login';
import Register from './Register';
import NavbarComponent from './NavbarComponent';
import Dashboard from './Dashboard';
import Users from './Users';
import Departments from './Departments';
import Courses from './Courses';
import Students from './Students';
import Settings from './Settings';
import Profile from './Profile';

function App() {
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        if (decodedToken.exp < currentTime) {
          // Token expired, remove it and set unauthenticated state
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        } else {
          setUser(decodedToken);
        }
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div style={{ backgroundColor: bgColor || '', minHeight: '100vh' }}>
        {isAuthenticated && <NavbarComponent user={user} handleLogout={handleLogout} />}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/Login"
            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/Dashboard" />}
          />
          <Route
            path="/Register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/Dashboard" />}
          />

          {/* Redirect unauthenticated users */}
          {!isAuthenticated && <Route path="*" element={<Navigate to="/Login" replace />} />}

          {/* Authenticated Routes */}
          {isAuthenticated && (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Departments" element={<Departments />} />
              <Route path="/Courses" element={<Courses />} />
              <Route path="/Students" element={<Students />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Settings" element={<Settings setBgColor={setBgColor} />} />
              <Route path="*" element={<Navigate to="/Dashboard" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
