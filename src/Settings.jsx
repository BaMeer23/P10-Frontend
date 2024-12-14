import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Row, Col, Card, Button, Modal, Form, Table } from 'react-bootstrap';
import { FaCog, FaPaintBrush, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { API_ENDPOINT } from './Api';

function Settings({ setBgColor }) {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [passwordx, setPasswordx] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('bgColor') || '');
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showReadModal, setShowReadModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded_token = jwtDecode(token);
      const expirationTime = decoded_token.exp * 1000;
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        Swal.fire({
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
        });
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        setDecodedToken(decoded_token);
        setToken(token);
      }
    } else {
      console.error('No token found in localStorage');
    }
  }, []);

  const headers = token ? { accept: 'application/json', Authorization: `Bearer ${token}` } : { accept: 'application/json' };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/api/user`, { headers });
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        Swal.fire({ text: 'Error fetching users. Invalid response format.', icon: 'error' });
      }
    } catch (error) {
      handleError(error, 'Error fetching users');
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  const createUser = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({ icon: 'error', text: 'No token found. Please log in again.' });
      return;
    }

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/api/user`,
        { fullname, username, passwordx },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({ icon: 'success', text: 'User created successfully!' });
      fetchUsers();
      setShowCreateModal(false);
      setFullname('');
      setUsername('');
      setPasswordx('');
    } catch (error) {
      handleError(error, 'Error creating user');
    }
  };

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
        handleError(error, 'Error deleting user');
      }
    }
  };

  const handleBackgroundChange = () => {
    const newColor = backgroundColor === '#2c2c2c' ? '' : '#2c2c2c'; // Light black
    setBackgroundColor(newColor);
    setBgColor(newColor);
    localStorage.setItem('bgColor', newColor);
  };
  
  const handleCloseReadModal = () => setShowReadModal(false);
  const handleShowReadModal = (user) => {
    setSelectedUser(user);
    setShowReadModal(true);
  };

  const handleShowUpdateModal = (user) => {
    setSelectedUser(user);
    setFullname(user.fullname);
    setUsername(user.username);
    setPasswordx('');
    setShowUpdateModal(true);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({ icon: 'error', text: 'No token found. Please log in again.' });
      return;
    }

    try {
      const response = await axios.put(
        `${API_ENDPOINT}/api/user/${selectedUser.user_id}`,
        { fullname, username, passwordx },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({ icon: 'success', text: 'User updated successfully!' });
      fetchUsers();
      setShowUpdateModal(false);
    } catch (error) {
      handleError(error, 'Error updating user');
    }
  };

  return (
    <Container className="mt-5">
      <div className="card" style={{ padding: '30px' }}>
        <h1>Settings</h1>
        <p>Update your preferences and manage users.</p>
      </div>

      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>
                <FaPaintBrush /> Change Background
              </Card.Title>
              <Button variant="primary" onClick={handleBackgroundChange}>
                {backgroundColor === 'black' ? 'Revert to Default Background' : 'Change Background Color to Black'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={12}>
          <Button variant="success" className="mb-2 float-end" onClick={() => setShowCreateModal(true)}>
            <FaCog /> Create User
          </Button>
          <Table bordered style={{ borderRadius: '10px', overflow: 'hidden' }}>
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">Username</th>
                <th className="text-center">Full Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id}>
                  <td className="text-center">{user.user_id}</td>
                  <td className="text-center">{user.username}</td>
                  <td className="text-center">{user.fullname}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <Button variant="info" size="sm" onClick={() => handleShowReadModal(user)} className="mx-1">
                      <FaEye /> Read
                    </Button>
                    <Button variant="warning" size="sm" onClick={() => handleShowUpdateModal(user)} className="mx-1">
                      <FaEdit /> Update
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteUser(user.user_id)} className="mx-1">
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Create User Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <Form onSubmit={createUser}>
    <Form.Group>
      <Form.Label>Full Name</Form.Label>
      <Form.Control
        type="text"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={passwordx}
        onChange={(e) => setPasswordx(e.target.value)}
        required
      />
    </Form.Group>
 
    <div className="mt-3">
      <Button type="submit">Create User</Button>
    </div>
  </Form>
</Modal.Body>
      </Modal>

      {/* Update User Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateUser}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordx}
                onChange={(e) => setPasswordx(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Update User</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Read User Modal */}
      <Modal show={showReadModal} onHide={handleCloseReadModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser ? (
            <div>
              <p><strong>Full Name:</strong> {selectedUser.fullname}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
            </div>
          ) : (
            <p>No user selected</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Settings;
