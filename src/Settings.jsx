import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCog, FaPaintBrush } from 'react-icons/fa';
import NavbarComponent from './NavbarComponent';

function Settings({ setBgColor }) {
  // Function to handle the background color change
  const handleBackgroundChange = () => {
    // Get the current background color from localStorage (or default to empty string)
    const currentBgColor = localStorage.getItem('bgColor');

    if (currentBgColor === 'black') {
      // If the background color is black, reset to the default background color
      setBgColor(''); // Reset the background color to default
      localStorage.removeItem('bgColor'); // Remove from localStorage
    } else {
      // If the background color is not black, set it to black
      setBgColor('black'); // Set background to black
      localStorage.setItem('bgColor', 'black'); // Store black background in localStorage
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-5">
        <div
          className="card"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: '#ffffff',
            padding: '30px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontWeight: '700',
              color: '#333',
            }}
          >
            <FaCog style={{ fontSize: '2rem', color: '#6a11cb' }} /> Settings
          </h1>
          <p style={{ color: '#555', marginTop: '15px', fontSize: '1rem' }}>
            Update your preferences and change background color.
          </p>
        </div>

        {/* Background Color Change */}
        <Row className="mt-4">
          <Col md={12}>
            <Card
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              }}
            >
              <Card.Body>
                <Card.Title>
                  <FaPaintBrush style={{ fontSize: '1.5rem', color: '#6a11cb' }} /> Change
                  Background
                </Card.Title>
                <Button
                  variant="primary"
                  onClick={handleBackgroundChange}
                  className="mt-3"
                >
                  {localStorage.getItem('bgColor') === 'black'
                    ? 'Revert to Default Background'
                    : 'Change Background Color to Black'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Settings;
