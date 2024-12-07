import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { FaUser, FaUsersCog } from 'react-icons/fa'; // Font Awesome Icons

function Users() {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <div className="card" style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          borderRadius: '12px',
          background: '#ffffff',
          padding: '30px',
          textAlign: 'center',
        }}>
          <h1 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
            <FaUser style={{ fontSize: '2rem', color: '#6a11cb' }} /> Users
          </h1>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Manage users, monitor activity, and handle account settings here.
          </p>
          
          {/* Stats and Progress */}
          <Row className="mt-4">
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                👥 Total Users: 150
              </div>
              <ProgressBar now={80} label="Active Users" style={{ marginTop: '10px' }} />
            </Col>
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🔒 Active Users: 120 <Badge bg="success">80%</Badge>
              </div>
              <div style={{ marginTop: '20px' }}>
                <FaUsersCog style={{ color: '#28a745', fontSize: '2rem' }} />
                <p>Manage Permissions</p>
              </div>
            </Col>
          </Row>

          {/* Additional Info */}
          <Row className="mt-5">
            <Col>
              <div style={{ fontSize: '1.2rem', color: '#6a11cb' }}>
                💬 User Messages: 200
              </div>
              <div style={{ fontSize: '1.2rem', color: '#2575fc' }}>
                🔧 Last Update: 3 days ago
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Users;
