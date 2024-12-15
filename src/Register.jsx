import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { API_ENDPOINT } from './Api'; // Adjust the import path if necessary

function Register() {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (fullname.trim() === '' || username.trim() === '' || password.trim() === '') {
      setError('All fields are required.');
      return;
    }
    if (password.length < 5) {
      setError('Password must be at least 5 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_ENDPOINT}/api/auth/register`, {
        fullname,
        username,
        passwordx: password,
      });
      navigate('/Login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid style={{ paddingTop: '5vh', minHeight: '100vh' }}>
      <Row className="justify-content-md-center" style={{ marginTop: '0vh' }}>
        <Col md={5} lg={4}>
          <div
            className="card"
            style={{
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff, #f7f7f7)',
              padding: '30px',
            }}
          >
            <div className="card-body">
              <h3
                className="text-center"
                style={{
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: '800',
                  color: '#4A4A4A',
                  marginBottom: '20px',
                }}
              >
                Create an Account
              </h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullname">
                  <Form.Label style={{ fontWeight: '500', color: '#555' }}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Enter your full name"
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      padding: '12px',
                      fontSize: '14px',
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formUsername" className="mt-3">
                  <Form.Label style={{ fontWeight: '500', color: '#555' }}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      padding: '12px',
                      fontSize: '14px',
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label style={{ fontWeight: '500', color: '#555' }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      padding: '12px',
                      fontSize: '14px',
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label style={{ fontWeight: '500', color: '#555' }}>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      padding: '12px',
                      fontSize: '14px',
                    }}
                    required
                  />
                </Form.Group>
                {error && (
                  <Alert variant="danger" className="mt-3">
                    {error}
                  </Alert>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mt-4"
                  style={{
                    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 0',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </Button>
                <Button
                  variant="outline-secondary"
                  className="w-100 mt-3"
                  onClick={() => navigate('/Login')}
                  disabled={loading}
                  style={{
                    borderRadius: '8px',
                    padding: '12px 0',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: '#555',
                    border: '1px solid #ddd',
                  }}
                >
                  Back to Login
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
