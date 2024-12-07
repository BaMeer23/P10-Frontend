import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function NavbarComponent({ user, handleLogout }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (!storedToken) {
      handleLogout();
    }

    return () => {
      // Cleanup function (optional if no subscriptions are added)
    };
  }, [handleLogout]);

  const handleLogoutAndRedirect = () => {
    handleLogout();
    navigate('/Login');
  };

  return (
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
          <Nav.Link as={Link} to="/Users" style={{ fontWeight: '500', color: '#fff' }}>
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="/Departments" style={{ fontWeight: '500', color: '#fff' }}>
            Departments
          </Nav.Link>
          <Nav.Link as={Link} to="/Courses" style={{ fontWeight: '500', color: '#fff' }}>
            Courses
          </Nav.Link>
          <Nav.Link as={Link} to="/Students" style={{ fontWeight: '500', color: '#fff' }}>
            Students
          </Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <NavDropdown
            title={user ? `User: ${user.username}` : 'Dropdown'}
            id="basic-nav-dropdown"
            align="end"
            style={{ fontWeight: '500', color: '#fff' }}
          >
            <NavDropdown.Item as={Link} to="/Profile">
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/Settings">
              Settings
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogoutAndRedirect}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
