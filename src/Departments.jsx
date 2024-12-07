import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { FaBuilding, FaUniversity } from 'react-icons/fa'; // Font Awesome Icons

function Departments() {
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
            <FaBuilding style={{ fontSize: '2rem', color: '#6a11cb' }} /> Departments
          </h1>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Manage departments, track department growth, and allocate resources.
          </p>
          
          {/* Stats and Progress */}
          <Row className="mt-4">
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🏢 Total Departments: 5
              </div>
              <ProgressBar now={60} label="Operational" style={{ marginTop: '10px' }} />
            </Col>
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🏫 Active Departments: 4 <Badge bg="success">80%</Badge>
              </div>
              <div style={{ marginTop: '20px' }}>
                <FaUniversity style={{ color: '#28a745', fontSize: '2rem' }} />
                <p>New Department Setup</p>
              </div>
            </Col>
          </Row>

          {/* Additional Info */}
          <Row className="mt-5">
            <Col>
              <div style={{ fontSize: '1.2rem', color: '#6a11cb' }}>
                📝 Department Budget: $200,000
              </div>
              <div style={{ fontSize: '1.2rem', color: '#2575fc' }}>
                🗓️ Last Review: 2 weeks ago
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Departments;
 