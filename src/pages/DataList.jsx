import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import InputForm from '../components/InputForm';
import EditDataModal from '../components/EditDataModal';
import './DataList.css'; // Import your CSS for layout
import card from '../assets/card.png';

const DataList = () => {
    const [data, setData] = useState([]);
    const [showInputForm, setShowInputForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/data', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                Swal.fire(
                    'ข้อผิดพลาด!',
                    'ไม่สามารถดึงข้อมูลได้',
                    'error'
                );
            });
        } else {
            Swal.fire(
                'ข้อผิดพลาด!',
                'ไม่พบ token. กรุณาล็อกอินใหม่.',
                'error'
            );
        }
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: "การลบข้อมูลจะไม่สามารถกู้คืนได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/data/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(response => {
                    Swal.fire(
                        'ลบแล้ว!',
                        'ข้อมูลของคุณได้ถูกลบแล้ว.',
                        'success'
                    );
                    setData(data.filter(item => item.id !== id));
                })
                .catch(error => {
                    Swal.fire(
                        'ข้อผิดพลาด!',
                        'ไม่สามารถลบข้อมูลได้.',
                        'error'
                    );
                });
            }
        });
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleInputFormClose = () => setShowInputForm(false);
    const handleEditModalClose = () => setShowEditModal(false);

    const handleSuccess = (updatedItem) => {
        handleEditModalClose();
        setData(data.map(dataItem => (dataItem.id === updatedItem.id ? updatedItem : dataItem)));
    };

    return (
        <Container>
            <h2 className="my-4">Data List</h2>
            <Button variant="primary" onClick={() => setShowInputForm(true)}>
                เพิ่มข้อมูล
            </Button>
            <Row className="mt-3">
                {data.length > 0 ? data.map((item) => (
                    item ? (
                        <Col md={3} key={item.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={card} />
                                <Card.Body>
                                    <Card.Title>{item.name || 'ไม่มีชื่อ'}</Card.Title>
                                    <Card.Text>
                                        <strong>สถานที่:</strong> {item.state || 'ไม่มีสถานที่'}<br />
                                        <strong>Start Date:</strong> {item.startDate ? new Date(item.startDate).toLocaleDateString() : 'ไม่มีวันที่เริ่มต้น'} <br />
                                        <strong>Expire Date:</strong> {item.expireDate ? new Date(item.expireDate).toLocaleDateString() : 'ไม่มีวันที่หมดอายุ'} <br />
                                        <strong>รายละเอียดเพิ่มเติม:</strong> {item.detail ? (item.detail.length > 50 ? `${item.detail.substring(0, 50)}...` : item.detail) : 'ไม่มีรายละเอียด'}
                                    </Card.Text>
                                    <Button variant="warning" onClick={() => handleEdit(item)}>
                                        แก้ไข
                                    </Button>
                                    <Button variant="danger" className="ms-2" onClick={() => handleDelete(item.id)}>
                                        ลบ
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ) : null
                )) : (
                    <Col>
                        <p>ไม่มีข้อมูล</p>
                    </Col>
                )}
            </Row>

            {/* Modal for InputForm */}
            <Modal show={showInputForm} onHide={handleInputFormClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputForm onClose={handleInputFormClose} onSuccess={(addedData) => {
                        handleInputFormClose();
                        setData(data => [...data, addedData]); // ใช้ addedData ที่ได้รับจาก InputForm
                    }} />
                </Modal.Body>
            </Modal>

            {/* Modal for Editing Data */}
            {selectedItem && (
                <EditDataModal
                    show={showEditModal}
                    onClose={handleEditModalClose}
                    data={selectedItem}
                    onUpdate={handleSuccess}
                />
            )}
        </Container>
    );
};

export default DataList;
