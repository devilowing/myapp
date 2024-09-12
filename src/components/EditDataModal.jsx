// src/components/EditDataModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditDataModal = ({ show, onClose, data, onUpdate }) => {
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/data/${formData.id}`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'สำเร็จ!',
                'ข้อมูลของคุณได้ถูกอัปเดตแล้ว.',
                'success'
            );
            onUpdate(response.data);
            onClose();
        })
        .catch(error => {
            Swal.fire(
                'ข้อผิดพลาด!',
                'ไม่สามารถอัปเดตข้อมูลได้.',
                'error'
            );
        });
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>แก้ไขข้อมูล</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>ชื่อ</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="ชื่อ"
                        />
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>สถานที่ทำ</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="สถานที่ทำ"
                        />
                    </Form.Group>
                    <Form.Group controlId="startDate">
                        <Form.Label>วันที่ทำบัตร</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={formData.startDate.slice(0, 10)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="expireDate">
                        <Form.Label>วันหมดอายุ</Form.Label>
                        <Form.Control
                            type="date"
                            name="expireDate"
                            value={formData.expireDate.slice(0, 10)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="detail">
                        <Form.Label>รายละเอียดเพิ่มเติม</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="detail"
                            value={formData.detail}
                            onChange={handleChange}
                            placeholder="รายละเอียดเพิ่มเติม"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        อัปเดต
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditDataModal;
