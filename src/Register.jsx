import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

// Ensure this is the correct URL of your backend server
const API_ENDPOINT = 'https://myschoolcode.onrender.com/api';

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

    // Basic validation
    if (fullname.trim() === '' || username.trim() === '' || password.trim() === '') {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      await axios.post(`${API_ENDPOINT}/auth/register`, {
        fullname,
        username,
        passwordx: password, // Use the backend field name
      });
      navigate('/login'); // Redirect to login on success
    } catch (err) {
      // Error handling
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Show backend error message
      } else {
        setError('Registration failed. Please try again later.');
      }
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <div className="register-form">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Register</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFullname">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formUsername" className="mt-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 mt-3"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Register'}
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => navigate('/login')}
                    className="w-100 mt-2"
                    disabled={loading} // Disable button while loading
                  >
                    Back to Login
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
