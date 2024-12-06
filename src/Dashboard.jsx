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
      const token = localStorage.getItem('token');
      if (!token) {
        setTimeout(() => {
          navigate("/login");  // Delay navigation to login
        }, 5000);  // 2000ms = 2 seconds delay
      } else {
        try {
          const response = JSON.parse(token);
          const decoded_token = jwtDecode(response.data.token);
          setUser(decoded_token);
        } catch (error) {
          setTimeout(() => {
            navigate("/login");  // Delay navigation to login in case of decoding error
          }, 6000);  // 2000ms = 2 seconds delay
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate("/login");  // Delay navigation after logout
    }, 2000);  // 2000ms = 2 seconds delay
  };

  return (
    <>
      <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Naga College Foundation, Inc.</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#Departments">Departments</Nav.Link>
            <Nav.Link href="#Courses">Courses</Nav.Link>
            <Nav.Link href="#Students">Students</Nav.Link>
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
