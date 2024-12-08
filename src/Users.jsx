import React from 'react';
import { Container, Row, Col, ProgressBar, Badge, Card } from 'react-bootstrap';
import { FaUser, FaUsersCog, FaUserTie } from 'react-icons/fa';

function Users() {
  return (
    <Container className="mt-5">
      <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '16px' }}>
        <Card.Body>
          <Row className="text-center">
            <Col>
              <h1 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
                <FaUser style={{ fontSize: '2.5rem', color: '#6a11cb' }} /> Users Dashboard
              </h1>
              <p style={{ color: '#555', marginTop: '10px', fontSize: '1rem' }}>
                Manage users, track activity, handle account settings, and monitor permissions.
              </p>
            </Col>
          </Row>

          {/* Summary Row */}
          <Row className="mt-4">
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUser style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Total Users:</div>
                  <strong>150</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUsersCog style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Active Users:</div>
                  <strong>120</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUserTie style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Admin Users:</div>
                  <strong>10</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUser style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Pending Approvals:</div>
                  <strong>5</strong>
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
                <strong>🔒 Permissions Management</strong><br />
                Available
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
                3 days ago
              </div>
            </Col>
          </Row>

          {/* Progress Bars */}
          <Row className="mt-5">
            <Col>
              <ProgressBar now={80} label="Active Users (80%)" variant="success" style={{ borderRadius: '10px' }} />
            </Col>
            <Col>
              <ProgressBar now={90} label="Pending Approvals (90%)" variant="info" style={{ borderRadius: '10px' }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Users;
