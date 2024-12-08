import React from 'react';
import { Container, Row, Col, ProgressBar, Card } from 'react-bootstrap';
import { FaBookOpen, FaChalkboardTeacher, FaUsers, FaGraduationCap } from 'react-icons/fa';

function Courses() {
  return (
    <Container className="mt-5">
      <Card style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '16px' }}>
        <Card.Body>
          <Row className="text-center">
            <Col>
              <h1 style={{ fontFamily: "'Roboto', sans-serif", fontWeight: '700', color: '#333' }}>
                <FaBookOpen style={{ fontSize: '2.5rem', color: '#6a11cb' }} /> Courses Dashboard
              </h1>
              <p style={{ color: '#555', marginTop: '10px', fontSize: '1rem' }}>
                Manage courses, track enrollment, and monitor student progress.
              </p>
            </Col>
          </Row>

          {/* Summary Row */}
          <Row className="mt-4">
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaBookOpen style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Total Courses:</div>
                  <strong>50</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaChalkboardTeacher style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Active Courses:</div>
                  <strong>45</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaUsers style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Students Enrolled:</div>
                  <strong>1000</strong>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                <FaGraduationCap style={{ fontSize: '2rem', marginRight: '10px' }} />
                <div>
                  <div>Graduated Students:</div>
                  <strong>800</strong>
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
                <strong>📈 Enrollment Rate</strong><br />
                95% Enrollment
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
                2 days ago
              </div>
            </Col>
          </Row>

          {/* Progress Bars */}
          <Row className="mt-5">
            <Col>
              <ProgressBar now={80} label="Enrollment Rate (80%)" variant="success" style={{ borderRadius: '10px' }} />
            </Col>
            <Col>
              <ProgressBar now={90} label="Graduated Students (90%)" variant="info" style={{ borderRadius: '10px' }} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Courses;
