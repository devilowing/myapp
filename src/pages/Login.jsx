import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import SweetAlert2 from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import config from '../config'

const Login = ({ onLogin }) => { // รับ prop onLogin
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      const { token, userId } = response.data; // Assuming token is returned in response

      SweetAlert2.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'กำลังนำคุณไปยังหน้าโฮมเพจ.',
      }).then(() => {
        localStorage.setItem('token', token); // Save token to localStorage
        onLogin(); // Notify parent component of successful login
        navigate('/datalist'); // Redirect to data-list page
      });
    } catch (err) {
      setError('เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">เข้าสู่ระบบ</h2>
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
          <Form.Label className="mt-1">รหัสผ่าน</Form.Label>
          <Form.Control
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          เข้าสู่ระบบ
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
