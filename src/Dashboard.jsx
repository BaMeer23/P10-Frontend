import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import * as jwtDecode from 'jwt-decode';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setTimeout(() => {
          navigate('/Login');
        }, 10000);
      } else {
        try {
          const decoded_token = jwtDecode(token); // Directly decode token
          setUser(decoded_token);
        } catch (error) {
          setTimeout(() => {
            navigate('/Login');
          }, 180000);
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <Container className="mt-5" style={{ paddingTop: '20px' }}>
      <h3 style={{ textAlign: 'center', fontFamily: "'Roboto', sans-serif", color: '#333' }}>
        Welcome to Dashboard, {user ? user.username : 'User'}
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div
          className="card"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: '#ffffff',
            padding: '30px',
            width: '80%',
            textAlign: 'center',
          }}
        >
          <h4 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
            Dashboard Overview
          </h4>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Here you can manage users, departments, courses, and students.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
