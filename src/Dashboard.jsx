import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import * as jwtDecode from 'jwt-decode';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setTimeout(() => {
          navigate('/login');
        }, 10000);
      } else {
        try {
          const response = JSON.parse(token);
          const decoded_token = jwtDecode(response.data.token);
          setUser(decoded_token);
        } catch (error) {
          setTimeout(() => {
            navigate('/login');
          }, 180000);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <>
      <Navbar
        style={{
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          padding: '1rem',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#fff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          >
            Combine F&B
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#users" style={{ fontWeight: '500', color: '#fff' }}>Users</Nav.Link>
            <Nav.Link href="#Departments" style={{ fontWeight: '500', color: '#fff' }}>Departments</Nav.Link>
            <Nav.Link href="#Courses" style={{ fontWeight: '500', color: '#fff' }}>Courses</Nav.Link>
            <Nav.Link href="#Students" style={{ fontWeight: '500', color: '#fff' }}>Students</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown
              title={user ? `User: ${user.username}` : 'Dropdown'}
              id="basic-nav-dropdown"
              align="end"
              style={{ fontWeight: '500', color: '#fff' }}
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-5" style={{ paddingTop: '20px' }}>
        <h3 style={{ textAlign: 'center', fontFamily: "'Roboto', sans-serif", color: '#333' }}>
          Welcome to Dashboard, {user ? user.username : 'User'}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div className="card" style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: '#ffffff',
            padding: '30px',
            width: '80%',
            textAlign: 'center',
          }}>
            <h4 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
              Dashboard Overview
            </h4>
            <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
              Here you can manage users, departments, courses, and students.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
