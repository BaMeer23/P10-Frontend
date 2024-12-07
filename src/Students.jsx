import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { FaUserGraduate, FaSchool } from 'react-icons/fa';

function Students() {
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
            <FaUserGraduate style={{ fontSize: '2rem', color: '#6a11cb' }} /> Students
          </h1>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Manage student records, track academic progress, and view enrolled courses.
          </p>
          <Row className="mt-4">
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🎓 Total Students: 300
              </div>
            </Col>
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🏫 Enrolled Students: 250
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                📈 Graduation Rate: 85%
              </div>
            </Col>
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🛡️ At-Risk Students: 10
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
                borderRadius: '8px',
                color: '#fff',
                padding: '15px',
                fontSize: '1.2rem',
              }}>
                📅 Upcoming Events: Orientation on Dec 25
              </div>
            </Col>
            <Col>
              <div style={{
                background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
                borderRadius: '8px',
                color: '#fff',
                padding: '15px',
                fontSize: '1.2rem',
              }}>
                🏆 Top Achiever: Ikaw
              </div>
            </Col>
          </Row>
          <div className="mt-5">
            <ProgressBar now={85} label="Graduation Rate (85%)" className="mt-3" />
            <ProgressBar now={10} label="At-Risk Students (10%)" className="mt-3" variant="danger" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Students;
