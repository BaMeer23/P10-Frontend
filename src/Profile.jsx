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
        // Fetch gender from localStorage or use default 'male'
        const storedGender = localStorage.getItem('gender') || 'male';
        setUserData({ username: user.username, gender: storedGender });
      }
    }
  }, []);

  const toggleGender = () => {
    const newGender = userData.gender === 'male' ? 'female' : 'male';
    
    // Update the state and store the new gender in localStorage
    setUserData((prevData) => ({
      ...prevData,
      gender: newGender,
    }));

    // Persist the gender change in localStorage
    localStorage.setItem('gender', newGender);
  };

  return (
    <Row className="mt-5 justify-content-center">
      <Col md={6} className="text-center">
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem', // Increase font size for bigger emoji
            border: '3px solid #6a11cb', // Change border color
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
            margin: '0 auto',
          }}
        >
          {userData.gender === 'female' ? '👧' : '👦'}
        </div>
        <p
          style={{
            marginTop: '15px',
            fontWeight: '700', // Increase font weight for better visibility
            color: '#333',
            fontSize: '1.8rem', // Larger font size for the name
            fontFamily: "'Roboto', sans-serif", // Set a more elegant font family
            letterSpacing: '1px', // Add some letter spacing for clarity
          }}
        >
          {userData.username}
        </p>
        <Button
          variant="primary"
          onClick={toggleGender}
          style={{
            marginTop: '2px',
            borderRadius: '50%',
            fontSize: '2rem', // Adjust font size for the symbol
            padding: '10px 15px',
            backgroundColor: '#2575fc', // Modify button color
            border: 'none',
          }}
        >
          🔄
        </Button>
      </Col>
    </Row>
  );
}

export default Profile;
