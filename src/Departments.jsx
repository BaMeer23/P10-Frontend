import React from 'react';
import { Container, Row, Col, ProgressBar, Card } from 'react-bootstrap';
import { FaBuilding, FaUniversity, FaUsers } from 'react-icons/fa';

function Departments() {
  return (
    <Container className="mt-5">
      <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '16px' }}>
        <Card.Body>
          <Row className="text-center">
            <Col>
              <h1 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
                <FaBuilding style={{ fontSize: '2.5rem', color: '#6a11cb' }} /> Departments Dashboard
              </h1>
              <p style={{ color: '#555', marginTop: '10px', fontSize: '1rem' }}>
                Manage departments, track growth, allocate resources, and monitor staff performance.
              </p>
            </Col>
          </Row>

          {/* Summary Row */}
          <Row className="mt-4">
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaBuilding style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Total Departments:</div>
                  <strong>5</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUniversity style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Active Departments:</div>
                  <strong>4</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUsers style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Staff Strength:</div>
                  <strong>50</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUsers style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Pending Approvals:</div>
                  <strong>1</strong>
                </div>
              </div>
            </Col>
          </Row>

          {/* Additional Info */}
          <Row className="mt-5">
            <Col md={6}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '20px',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                }}
              >
                <strong>💼 Department Growth</strong><br />
                30% Growth
              </div>
            </Col>
            <Col md={6}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '20px',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                }}
              >
                <strong>🛠️ Last Update</strong><br />
                5 days ago
              </div>
            </Col>
          </Row>

          {/* Progress Bars */}
          <Row className="mt-5">
            <Col>
              <ProgressBar now={80} label="Department Growth (80%)" variant="success" style={{ borderRadius: '10px' }} />
            </Col>
            <Col>
              <ProgressBar now={50} label="Pending Approvals (50%)" variant="info" style={{ borderRadius: '10px' }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Departments;
