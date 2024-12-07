import React, { useState, useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import { Container, Row, Col, Card, Form, Button, Alert, Image } from 'react-bootstrap';
import { FaUserCircle, FaEdit } from 'react-icons/fa'; 
import axios from 'axios';

const API_ENDPOINT = 'https://myschoolcode.onrender.com/api';

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    gender: 'male', // Default gender
    currentPassword: '',
    newPassword: '',
  });

  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch user data from localStorage after login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserData({ username: user.username, gender: user.gender || 'male', currentPassword: '', newPassword: '' });
        setProfilePicture(user.gender === 'female' ? '/female-profile.png' : '/male-profile.png');
      }
    }
  }, []);

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setUserData({ ...userData, gender: selectedGender });
    setProfilePicture(selectedGender === 'female' ? '/female-profile.png' : '/male-profile.png');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!userData.username) {
      setError('Username is required!');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_ENDPOINT}/user/`,
        {
          username: userData.username,
          gender: userData.gender,
          currentPassword: userData.currentPassword,
          newPassword: userData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setSuccess('Profile updated successfully!');
        setError('');
        const updatedUser = { ...userData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        setError('Failed to update profile.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Card
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              }}
            >
              <Card.Body>
                <Card.Title>
                  <FaUserCircle style={{ fontSize: '2rem', color: '#6a11cb' }} /> Profile
                </Card.Title>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row className="text-center mb-4">
                    <Col>
                      <Image
                        src={profilePicture}
                        roundedCircle
                        style={{ width: '100px', height: '100px', objectFit: 'cover', border: '2px solid #6a11cb' }}
                      />
                    </Col>
                  </Row>

                  <Form.Group controlId="formUsername" className="mt-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGender" className="mt-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      value={userData.gender}
                      onChange={handleGenderChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="formCurrentPassword" className="mt-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your current password"
                      value={userData.currentPassword}
                      onChange={(e) => setUserData({ ...userData, currentPassword: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group controlId="formNewPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your new password"
                      value={userData.newPassword}
                      onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                    <FaEdit style={{ marginRight: '5px' }} /> Update Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
