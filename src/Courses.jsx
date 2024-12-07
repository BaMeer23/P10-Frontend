import React from 'react';
import NavbarComponent from './NavbarComponent';
import { Container, Row, Col, ProgressBar, Badge } from 'react-bootstrap';
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa'; // Font Awesome Icons

function Courses() {
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
            <FaBook style={{ fontSize: '2rem', color: '#6a11cb' }} /> Courses
          </h1>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Manage courses, add new ones, and track student progress.
          </p>
          
          {/* Stats and Progress */}
          <Row className="mt-4">
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                📚 Total Courses: 20
              </div>
              <ProgressBar now={75} label="Active Courses" style={{ marginTop: '10px' }} />
            </Col>
            <Col>
              <div style={{ fontSize: '1.5rem', color: '#2575fc' }}>
                🖥️ Online Courses: 15 <Badge bg="primary">75%</Badge>
              </div>
              <div style={{ marginTop: '20px' }}>
                <FaChalkboardTeacher style={{ color: '#28a745', fontSize: '2rem' }} />
                <p>Course Instructor Availability</p>
              </div>
            </Col>
          </Row>

          {/* Additional Info */}
          <Row className="mt-5">
            <Col>
              <div style={{ fontSize: '1.2rem', color: '#6a11cb' }}>
                💻 Students Enrolled: 300
              </div>
              <div style={{ fontSize: '1.2rem', color: '#2575fc' }}>
                📅 Last Update: 1 week ago
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Courses;
