import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Navbar, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_ENDPOINT } from './Api';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('token'));
    if (user) {
      navigate('/Dashboard', { replace: true }); // Avoid adding to history stack
    }
  }, [navigate]); // Ensure this only runs once when the component is mounted

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_ENDPOINT}/api/auth/login`, {
        username,
        passwordx: password, // Keep passwordx intentional here
      });

      // Set token to localStorage if login is successful
      localStorage.setItem('token', JSON.stringify(response.data));

      // Ensure navigation happens only after login completes
      setIsLoading(false);
      navigate('/Dashboard', { replace: true });
    } catch (err) {
      setIsLoading(false);
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Navbar bg="success" variant="dark">
        <Container>
          <Navbar.Brand>Naga College Foundation, Inc.</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row className="justify-content-md-center">
          <Col md={4}>
            <div className="login-form">
              <div className="card">
                <div className="card-body">
                  <center>
                    <h4>NCFi: Proposed Enrollment System</h4>
                  </center>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formPassword" className="mt-3">
                      <Form.Label>Password:</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={isPasswordVisible ? 'text' : 'password'}
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                          {isPasswordVisible ? 'Hide' : 'Show'}
                        </Button>
                      </div>
                    </Form.Group>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 mt-3"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Logging in...' : 'Login Now'}
                    </Button>

                    <div className="text-center mt-3">
                      <Link to="/register">Don't have an account? Register</Link>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
