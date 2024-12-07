import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';
import Dashboard from './Dashboard';
import Users from './Users';
import Departments from './Departments';
import Courses from './Courses';
import Students from './Students';
import Settings from './Settings';
import Profile from './Profile';

function PrivateLayout({ user, handleLogout, setBgColor }) {
  // Redirect if not authenticated
  if (!localStorage.getItem('token')) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      {/* Navbar stays fixed at the top */}
      <NavbarComponent user={user} handleLogout={handleLogout} />
      <Routes>
        {/* Routes for private content */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Departments" element={<Departments />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/Settings" element={<Settings setBgColor={setBgColor} />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/Dashboard" />} />
      </Routes>
    </>
  );
}

export default PrivateLayout;
