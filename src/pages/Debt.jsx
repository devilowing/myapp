import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Modal, Button, Form } from 'react-bootstrap';

const Debt = () => {
  const [debts, setDebts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [selectedDebt, setSelectedDebt] = useState(null);

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
    const interest = (debt.remainingAmount * dailyInterestRate * (daysDiff-1));
    const totalAmount = parseFloat(debt.remainingAmount) + interest;

    setModalContent(`ยอดปิดบัญชี: ${totalAmount.toFixed(2)} บาท`);
    setSelectedDebt(debt);
    setShowModal(true);
  };

  return (
    <Container>
      <div className="finance">
        <h2>จัดการหนี้</h2>
        
        <div className="mb-3">
          {debts.map((debt) => (
            <div key={debt.id} className="mb-3">
              {/* <h4>หมายเลขหนี้: {debt.id}</h4> */}
              <h4><p> {parseFloat(debt.remainingAmount).toLocaleString('th-TH', { style: 'currency', currency: 'THB' })}</p></h4>
              <Button variant="primary" onClick={() => handleCalculate(debt)}>
                คำนวณยอดปิด
              </Button>
            </div>
          ))}
        </div>

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
      </div>
    </Container>
  );
};

export default Debt;
