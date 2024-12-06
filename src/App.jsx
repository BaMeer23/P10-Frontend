import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

import Dashboard from './Dashboard';
import Login from './login';  // Check the casing of the import path
import Register from './Register';

function App() {
  return (
    <Router>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />  {/* Updated to lowercase */}
            <Route path="/dashboard" element={<Dashboard />} />  {/* Updated to lowercase */}
            <Route path="*" element={<Login />} />  {/* Fallback to Login if no match */}
          </Routes>
        </Col>
      </Row>
    </Router>
  );
}

export default App;
