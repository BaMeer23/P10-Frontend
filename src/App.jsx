import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';

import Dashboard from './Dashboard';
import Login from './login';
import Register from './Register';

function App() {
  return (
    <Router>
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
}

export default App;
