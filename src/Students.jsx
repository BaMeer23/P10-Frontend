import React from 'react';
import { Container, Row, Col, ProgressBar, Card } from 'react-bootstrap';
import { FaUserGraduate, FaSchool, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

function Students() {
  return (
    <Container className="mt-5">
      <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '16px' }}>
        <Card.Body>
          <Row className="text-center">
            <Col>
              <h1 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
                <FaUserGraduate style={{ fontSize: '2.5rem', color: '#6a11cb' }} /> Students Dashboard
              </h1>
              <p style={{ color: '#555', marginTop: '10px', fontSize: '1rem' }}>
                Manage student records, track academic progress, and view important statistics.
              </p>
            </Col>
          </Row>

          {/* Summary Row */}
          <Row className="mt-4">
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaSchool style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Total Students:</div>
                  <strong>300</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUserGraduate style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Enrolled Students:</div>
                  <strong>250</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaCalendarAlt style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Upcoming Events:</div>
                  <strong>Orientation on Dec 25</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaTrophy style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Top Achiever:</div>
                  <strong>Ikaw</strong>
                </div>
              </div>
            </Col>
          </Row>

          {/* Graduation & Risk Status Row */}
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
                <strong>📈 Graduation Rate</strong><br />
                85% Graduated
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
                <strong>🛡️ At-Risk Students</strong><br />
                10 students
              </div>
            </Col>
          </Row>

          {/* Progress Bars */}
          <Row className="mt-5">
            <Col>
              <ProgressBar now={85} label="Graduation Rate (85%)" variant="success" style={{ borderRadius: '10px' }} />
            </Col>
            <Col>
              <ProgressBar now={25} label="At-Risk Students (25%)" variant="danger" style={{ borderRadius: '10px' }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Students;
