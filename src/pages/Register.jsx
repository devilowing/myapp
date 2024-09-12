// src/pages/Register.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import SweetAlert2 from 'sweetalert2';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password, email });
      SweetAlert2.fire({
        icon: 'success',
        title: 'ลงทะเบียนสำเร็จ',
        text: 'คุณสามารถเข้าสู่ระบบได้แล้ว.',
      }).then(() => {
        window.location.href = '/login'; // Redirect to login page
      });
    } catch (err) {
      setError('การลงทะเบียนล้มเหลว กรุณาลองใหม่อีกครั้ง.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">ลงทะเบียน</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>ชื่อผู้ใช้</Form.Label>
          <Form.Control
            type="text"
            placeholder="กรอกชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>รหัสผ่าน</Form.Label>
          <Form.Control
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>อีเมล</Form.Label>
          <Form.Control
            type="email"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          ลงทะเบียน
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
