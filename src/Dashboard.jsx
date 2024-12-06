import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';  // Correct import for jwt-decode

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Decode the token to get user information
  useEffect(() => {
    const fetchUser = () => {
      try {
        const response = JSON.parse(localStorage.getItem('token'));
        const decoded_token = jwtDecode(response.data.token);
        setUser(decoded_token);
      } catch (error) {
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#departments">Departments</Nav.Link>
            <Nav.Link href="#courses">Courses</Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <NavDropdown 
              title={user ? `User: ${user.username}` : 'Dropdown'} 
              id="basic-nav-dropdown" 
              align="end"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Dashboard;
