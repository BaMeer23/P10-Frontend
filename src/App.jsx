import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Login from './Login';
import Register from './Register';
import PrivateLayout from './PrivateLayout';
import Settings from './Settings';  // Assuming you want to route to Settings

function App() {
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '');
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken);
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div style={{ backgroundColor: bgColor || '', minHeight: '100vh' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Settings" element={<Settings setBgColor={setBgColor} />} />

          {/* Wrap all private routes */}
          <Route
            path="/*"
            element={
              <PrivateLayout user={user} handleLogout={handleLogout} setBgColor={setBgColor} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
