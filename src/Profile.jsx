import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    gender: 'male', // Default gender
  });

  // Fetch user data from localStorage after login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setUserData({ username: user.username, gender: user.gender || 'male' });
      }
    }
  }, []);

  const toggleGender = () => {
    setUserData((prevData) => ({
      ...prevData,
      gender: prevData.gender === 'male' ? 'female' : 'male',
    }));
  };

  return (
    <Row className="mt-5 justify-content-center">
      <Col md={6} className="text-center">
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            border: '2px solid #6a11cb',
            margin: '0 auto',
          }}
        >
          {userData.gender === 'female' ? '👧' : '👦'}
        </div>
        <p
          style={{
            marginTop: '10px',
            fontWeight: 'bold',
            color: '#333',
            fontSize: '1.2rem',
          }}
        >
          {userData.username}
        </p>
        <Button
          variant="primary"
          onClick={toggleGender}
          style={{
            marginTop: '20px',
            borderRadius: '50%',
            fontSize: '1.5rem', // Adjust font size for the symbol
          }}
        >
          🔄
        </Button>
      </Col>
    </Row>
  );
}

export default Profile;
