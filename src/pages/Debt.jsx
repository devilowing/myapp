import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Modal, Button, Form } from 'react-bootstrap';

const Debt = () => {
  const [debts, setDebts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [newDebt, setNewDebt] = useState({
    principalAmount: '',
    interestRate: '',
    startDate: '',
    remainingAmount: '',
    detail: ''
  });


  useEffect(() => {
    fetchDebts();
  }, []);

  const fetchDebts = async () => {
    try {
      const response = await axios.get('/api/debts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ส่ง JWT token เพื่อพิสูจน์ตัวตน
        },
      });
      setDebts(response.data);
    } catch (error) {
      console.error('Error fetching debts:', error);
    }
  };

  const handleCalculate = (debt) => {
    const today = new Date();
    const lastInterestDate = new Date(debt.lastInterestDate);
    const daysDiff = Math.ceil((today - lastInterestDate) / (1000 * 60 * 60 * 24));
    const dailyInterestRate = debt.interestRate / 100 / 365;
    const interest = (debt.remainingAmount * dailyInterestRate * (daysDiff - 1));
    const totalAmount = parseFloat(debt.remainingAmount) + interest;

    setModalContent(`ยอดปิดบัญชี: ${totalAmount.toFixed(2)} บาท`);
    setSelectedDebt(debt);
    setShowModal(true);
  };

  const handleAddDebt = async () => {
    try {
      await axios.post('/api/debts', newDebt, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ส่ง JWT token เพื่อพิสูจน์ตัวตน
        },
      });
      setNewDebt({
        principalAmount: '',
        interestRate: '',
        startDate: '',
        remainingAmount: '',
        detail: ''
      });
      fetchDebts(); // อัพเดตข้อมูลหนี้หลังจากเพิ่มหนี้ใหม่
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding debt:', error);
    }
  };

  const handleDelete = async (debt) => {
    try {
      await axios.delete(`/api/debts/${debt.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchDebts();
      // handleCloseModal();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };



  return (
    <Container>
      <div className="finance">
        <h2>จัดการหนี้</h2>

        <div className="mb-3">
          {debts.map((debt) => (
            <div key={debt.id} className="mb-3">
              <h5 style={{ color: 'blue' }}>{debt.detail}</h5>

              <h4>
                <p>{parseFloat(debt.remainingAmount).toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</p>
              </h4>
              <Button variant="primary" onClick={() => handleCalculate(debt)}>
                คำนวณยอดปิด
              </Button>
              <Button className="ms-1" variant="danger" onClick={() => handleDelete(debt)}>
                ลบ
              </Button>
            </div>
          ))}
        </div>
        <Button variant="success" onClick={() => { setShowAddModal(true); }}>
          เพิ่มหนี้
        </Button>

        {/* Modal สำหรับคำนวณยอดปิด */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>ยอดปิดบัญชี</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal สำหรับเพิ่มหนี้ */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มหนี้</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formPrincipalAmount">
                <Form.Label>จำนวนเงินต้น</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="กรุณากรอกจำนวนเงินต้น"
                  value={newDebt.principalAmount}
                  onChange={(e) => setNewDebt({ ...newDebt, principalAmount: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formInterestRate">
                <Form.Label>อัตราดอกเบี้ย (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="กรุณากรอกอัตราดอกเบี้ย"
                  value={newDebt.interestRate}
                  onChange={(e) => setNewDebt({ ...newDebt, interestRate: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label>วันที่เริ่มต้น</Form.Label>
                <Form.Control
                  type="date"
                  value={newDebt.startDate}
                  onChange={(e) => setNewDebt({ ...newDebt, startDate: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDetail">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="กรุณากรอกรายละเอียด เช่น หนี้แม่ หนี้บัตร หนี้พี่"
                  value={newDebt.detail}
                  onChange={(e) => setNewDebt({ ...newDebt, detail: e.target.value })}
                />
              </Form.Group>
              {console.log(newDebt)}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              ปิด
            </Button>
            <Button variant="primary" onClick={handleAddDebt}>
              เพิ่มหนี้
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default Debt;
