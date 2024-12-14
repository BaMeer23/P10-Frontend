import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Named import for jwt-decode
import { Container, Row, Col, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import { FaCog, FaPaintBrush } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { API_ENDPOINT } from './Api';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center">
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function Settings({ setBgColor }) {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [passwordx, setPasswordx] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('bgColor') || '');
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);

  // Retrieve and decode token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
    } else {
      try {
        const decoded_token = jwtDecode(token); // Directly decode token
        console.log('Decoded Token:', decoded_token);
        setDecodedToken(decoded_token); // Set decoded token if needed
        setToken(token);  // Set token value (no need for decoded_token.token)
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  // Set headers for API calls
  const headers = token ? { accept: 'application/json', Authorization: `Bearer ${token}` } : { accept: 'application/json' };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/api/user/`, { headers });
      console.log('Fetched Users:', data);
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Invalid response format: Expected an array of users.');
        Swal.fire({
          text: 'Error fetching users. Invalid response format.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('API request error:', error); // Log the entire error object
      if (error.response) {
        console.error('Error Response:', error.response); // Log the error response from the server
        const errorMessage = error.response.data?.message || 'Error fetching users';
        Swal.fire({
          text: errorMessage,
          icon: 'error',
        });
      } else if (error.request) {
        console.error('No response received:', error.request); // Log the request if no response was received
        Swal.fire({
          text: 'No response from the server. Please try again later.',
          icon: 'error',
        });
      } else {
        console.error('Error setting up request:', error.message); // Log if the error occurred during request setup
        Swal.fire({
          text: 'Error setting up the request.',
          icon: 'error',
        });
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Create a user
  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ENDPOINT}/api/user`, { fullname, username, passwordx }, { headers });
      console.log('User created response:', response.data);
      Swal.fire({ icon: 'success', text: 'User created successfully!' });
      fetchUsers();
      setShowCreateModal(false);
      setFullname('');
      setUsername('');
      setPasswordx('');
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error creating user';
        if (error.response?.status === 409) {
          Swal.fire({
            text: 'Username already exists.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            text: errorMessage,
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          text: 'Network error or no response',
          icon: 'error',
        });
      }
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => result.isConfirmed);

    if (isConfirm) {
      try {
        await axios.delete(`${API_ENDPOINT}/api/user/${id}`, { headers });
        Swal.fire({ icon: 'success', text: 'User deleted successfully' });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire({
          text: error.response?.data?.message || 'Error deleting user',
          icon: 'error',
        });
      }
    }
  };

  const handleBackgroundChange = () => {
    const newColor = backgroundColor === 'black' ? '' : 'black';
    setBackgroundColor(newColor);
    setBgColor(newColor);
    localStorage.setItem('bgColor', newColor);
  };

  return (
    <ErrorBoundary>
      <Container className="mt-5">
        <div
          className="card"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: '#ffffff',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700', color: '#333' }}>
            <FaCog style={{ fontSize: '2rem', color: '#6a11cb' }} /> Settings
          </h1>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Update your preferences and manage users.
          </p>
        </div>

        <Row className="mt-4">
          <Col md={12}>
            <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
              <Card.Body>
                <Card.Title>
                  <FaPaintBrush style={{ fontSize: '1.5rem', color: '#6a11cb' }} /> Change Background
                </Card.Title>
                <Button variant="primary" onClick={handleBackgroundChange} className="mt-3">
                  {backgroundColor === 'black' ? 'Revert to Default Background' : 'Change Background Color to Black'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <Button variant="success" className="mb-2 float-end" onClick={() => setShowCreateModal(true)}>
              Create User
            </Button>
            <Table bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                    <td>
                      <Button variant="danger" onClick={() => deleteUser(user.user_id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {/* Create User Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={createUser}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={passwordx}
                onChange={(e) => setPasswordx(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </ErrorBoundary>
  );
}

export default Settings;
