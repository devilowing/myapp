// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import { format } from 'date-fns';
// import 'react-datepicker/dist/react-datepicker.css';
// import Swal from 'sweetalert2';

// const InputForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         state: '',
//         startDate: new Date(),
//         expireDate: new Date(),
//         detail: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleDateChange = (date, field) => {
//         setFormData({
//             ...formData,
//             [field]: date
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//         Swal.fire({
//             title: 'บันทึกข้อมูล',
//             text: "คุณต้องการบันทึกข้อมูลใช่ไหม ?",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonText: 'ใช่ ! บันทึกเลย',
//             cancelButtonText: 'ไม่ ! ยกเลิกก่อน',
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axios.post('/api/data', {
//                     ...formData,
//                     startDate: format(formData.startDate, 'yyyy-MM-dd'),
//                     expireDate: format(formData.expireDate, 'yyyy-MM-dd'),
//                 }, {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json'
//                     }
//                 })
//                 .then(response => {
//                     Swal.fire({
//                         title: 'บันทึกข้อมูล',
//                         text: 'บันทึกข้อมูลแล้ว',
//                         icon: 'success',
//                         timer: 1500
//                     });
//                     setFormData({
//                         name: '',
//                         state: '',
//                         startDate: new Date(),
//                         expireDate: new Date(),
//                         detail: '',
//                     });
//                 })
//                 .catch(error => {
//                     console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error.response?.data || error);
//                     Swal.fire(
//                         'ข้อผิดพลาด!',
//                         error.response?.data?.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล',
//                         'error'
//                     );
//                 });
//             }
//         });
//     };
    

//     return (
//         <Container>
//             <Row className="justify-content-center">
//                 <Col md={6}>
//                     <h2 className="mb-4">ฟอร์มข้อมูล</h2>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className='mt-2' controlId="formName">
//                             <Form.Label><strong>ชื่อ</strong></Form.Label>
//                             <Form.Control 
//                                 type="text" 
//                                 placeholder="กรุณากรอกชื่อ" 
//                                 name="name" 
//                                 value={formData.name} 
//                                 onChange={handleChange} 
//                                 required 
//                             />
//                         </Form.Group>

//                         <Form.Group className='mt-2' controlId="state">
//                             <Form.Label><strong>สถานที่</strong></Form.Label>
//                             <Form.Control 
//                                 type="text" 
//                                 placeholder="กรุณากรอกสถานที่สมัคร" 
//                                 name="state" 
//                                 value={formData.state} 
//                                 onChange={handleChange} 
//                                 required 
//                             />
//                         </Form.Group>

//                         <Form.Group className='mt-3 d-flex flex-column' controlId="formStartDate">
//                             <Form.Label><strong>วันที่ทำบัตร</strong></Form.Label>
//                             <DatePicker
//                                 selected={formData.startDate}
//                                 onChange={(date) => handleDateChange(date, 'startDate')}
//                                 dateFormat="dd/MM/yyyy"
//                                 className="form-control"
//                                 placeholderText="Select start date"
//                             />
//                         </Form.Group>

//                         <Form.Group className='mt-3 d-flex flex-column' controlId="formExpireDate">
//                             <Form.Label><strong>วันหมดอายุ</strong></Form.Label>
//                             <DatePicker
//                                 selected={formData.expireDate}
//                                 onChange={(date) => handleDateChange(date, 'expireDate')}
//                                 dateFormat="dd/MM/yyyy"
//                                 className="form-control"
//                                 placeholderText="Select expire date"
//                             />
//                         </Form.Group>

//                         <Form.Group className='mt-2' controlId="formDetail">
//                             <Form.Label><strong>รายละเอียดเพิ่มเติม</strong></Form.Label>
//                             <Form.Control 
//                                 type="text" 
//                                 placeholder="กรุณากรอกรายละเอียด" 
//                                 name="detail" 
//                                 value={formData.detail} 
//                                 onChange={handleChange} 
//                             />
//                         </Form.Group>

//                         <Button className='mt-3' variant="primary" type="submit">
//                             ส่งข้อมูล
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default InputForm;
