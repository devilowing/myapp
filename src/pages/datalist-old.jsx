import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import cardImage from '../assets/card.jpg';
import './DataList.css'; // Create this CSS file for styling

const DataList = () => {
    const [data, setData] = useState([]);

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
        Swal.fire({
            title: 'แก้ไขข้อมูล',
            html: `
                <input id="swal-input1" class="swal2-input" value="${item.name}" placeholder="ชื่อ">
                <input id="swal-input2" class="swal2-input" value="${item.state}" placeholder="สถานที่ทำ">
                <input id="swal-input3" class="swal2-input" type="date" value="${item.startDate.slice(0, 10)}" placeholder="วันที่ทำบัตร">
                <input id="swal-input4" class="swal2-input" type="date" value="${item.expireDate.slice(0, 10)}" placeholder="วันหมดอายุ">
                <input id="swal-input5" class="swal2-input" value="${item.detail}" placeholder="รายละเอียดเพิ่มเติม">
            `,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    state: document.getElementById('swal-input2').value,
                    startDate: document.getElementById('swal-input3').value,
                    expireDate: document.getElementById('swal-input4').value,
                    detail: document.getElementById('swal-input5').value,
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`/api/data/${item.id}`, result.value, {
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
                    setData(data.map(dataItem => (dataItem.id === item.id ? response.data : dataItem)));
                })
                .catch(error => {
                    Swal.fire(
                        'ข้อผิดพลาด!',
                        'ไม่สามารถอัปเดตข้อมูลได้.',
                        'error'
                    );
                });
            }
        });
    };

    return (
        <Container>
            <h2 className="my-4">Data List</h2>
            <div className="data-list-grid">
                {data.map((item) => (
                    <Card key={item.id} className="data-card">
                        <Card.Img variant="top" src={cardImage} />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                <strong>สถานที่:</strong> {item.state}<br />
                                <strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()} <br />
                                <strong>Expire Date:</strong> {new Date(item.expireDate).toLocaleDateString()} <br />
                                <strong>รายละเอียดเพิ่มเติม:</strong> {item.detail.length > 100 ? `${item.detail.substring(0, 100)}...` : item.detail}
                            </Card.Text>
                            <Button variant="warning" onClick={() => handleEdit(item)}>
                                แก้ไข
                            </Button>
                            <Button variant="danger" className="ms-2" onClick={() => handleDelete(item.id)}>
                                ลบ
                            </Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default DataList;
