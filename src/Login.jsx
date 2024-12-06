import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('token'));
    if (user) {
      setTimeout(() => {
        navigate('/Dashboard', { replace: true });
      }, 5000); // Delay of 5000ms (5 seconds)
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_ENDPOINT}/api/auth/login`, {
        username,
        passwordx: password,
      });
      localStorage.setItem('token', JSON.stringify(response.data));
      setIsLoading(false);
      setTimeout(() => {
        navigate('/Dashboard', { replace: true });
      }, 10000); // Delay of 10000ms (10 seconds)
    } catch (err) {
      setIsLoading(false);
      setError('Invalid username or password');
    }
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
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center" style={{ marginTop: '10vh' }}>
          <Col md={4}>
            <div
              className="card"
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                background: '#ffffff',
                padding: '20px',
              }}
            >
              <div className="card-body">
                <h4
                  className="text-center"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: '700',
                    color: '#333',
                  }}
                >
                  Login/10sDelay
                </h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      style={{
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        padding: '10px',
                      }}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        style={{
                          borderRadius: '5px',
                          border: '1px solid #ddd',
                          padding: '10px',
                        }}
                        required
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={{
                          borderRadius: '0 5px 5px 0',
                          background: '#6a11cb',
                          color: '#fff',
                          border: 'none',
                        }}
                      >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </Form.Group>
                  {error && (
                    <p
                      className="text-danger mt-2"
                      style={{
                        fontSize: '0.9rem',
                        textAlign: 'center',
                        fontFamily: "'Roboto', sans-serif",
                      }}
                    >
                      {error}
                    </p>
                  )}
                  <Button
                    variant="dark"
                    type="submit"
                    className="w-100 mt-3"
                    style={{
                      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '12px 0',
                      fontWeight: 'bold',
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                  <div className="text-center mt-3">
                    <Link
                      to="/Register"
                      className="text-decoration-none"
                      style={{
                        color: '#6a11cb',
                        fontWeight: 'bold',
                      }}
                    >
                      Don't have an account? Register
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
