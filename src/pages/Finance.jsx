import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Modal, Button, Form, Table } from 'react-bootstrap';

const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    amount: '',
    category: '',
    details: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterDate, setFilterDate] = useState({
    month: new Date().toISOString().split('T')[0].slice(0, 7), // Default to current month
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ส่ง JWT token เพื่อพิสูจน์ตัวตน
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      if (editMode) {
        await axios.put(`/api/transactions/${editId}`, form, config);
      } else {
        await axios.post('/api/transactions', form, config);
        if (form.category === 'หนี้แม่') {
        await axios.put('/api/debts/', { amount: form.amount }, config);
        }
      }
      fetchTransactions();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving transaction:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
    setEditId(transaction.id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/transactions/${editId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTransactions();
      handleCloseModal();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditMode(false);
    setForm({ amount: '', category: '', details: '', type: '', date: new Date().toISOString().split('T')[0] });
    setEditId(null);
  };

  const handleShowIncomeModal = () => {
    setForm({ ...form, type: 'income', category: 'เงินเดือน' });
    setShowModal(true);
  };

  const handleShowExpenseModal = () => {
    setForm({ ...form, type: 'expense', category: 'กิน' });
    setShowModal(true);
  };

  const handleRowClick = (transaction) => {
    handleEdit(transaction);
  };

  const handleFilterChange = (e) => {
    setFilterDate({ month: e.target.value });
  };

  const incomeCategories = ['เงินเดือน', 'กดบัตร', 'ขายของ', 'ยืม', 'ให้'];
  const expenseCategories = ['กิน', 'ของใช้', 'บริการต่างๆ', 'ช่วยที่บ้าน', 'น้ำมัน', 'ใช้หนี้', 'หนี้แม่'];

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      (!filterDate.month || transactionDate.toISOString().slice(0, 7) === filterDate.month)
    );
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const incomeSummary = {};
  const expenseSummary = {};

  transactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      incomeSummary[transaction.category] = (incomeSummary[transaction.category] || 0) + parseFloat(transaction.amount);
    } else if (transaction.type === 'expense') {
      expenseSummary[transaction.category] = (expenseSummary[transaction.category] || 0) + parseFloat(transaction.amount);
    }
  });

  const totalIncome = Object.values(incomeSummary).reduce((sum, amount) => sum + amount, 0);
  const totalExpense = Object.values(expenseSummary).reduce((sum, amount) => sum + amount, 0);

  return (
    <Container>
      <div className="finance">
        <h2>จัดการบัญชี</h2>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <Button variant="success" onClick={handleShowIncomeModal}>
              รายรับ
            </Button>{' '}
            <Button variant="danger" onClick={handleShowExpenseModal}>
              จ่าย
            </Button>
          </div>
          <div className="d-flex align-items-center">
            <Form.Control
              type="month"
              value={filterDate.month}
              onChange={handleFilterChange}
              style={{ maxWidth: '150px' }}
            />
          </div>
        </div>

        <div className="table-container mt-3">
          <Table striped bordered hover className="scrollable-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('date')}>วันที่</th>
                <th onClick={() => handleSort('amount')}>จำนวนเงิน</th>
                <th onClick={() => handleSort('category')}>หมวดหมู่</th>
                <th onClick={() => handleSort('details')}>รายละเอียด</th>
                <th onClick={() => handleSort('type')}>ประเภท</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} onClick={() => handleRowClick(transaction)}>
                  <td>{new Date(transaction.date).toLocaleDateString('th-TH', { day: 'numeric' })}</td>
                  <td>{parseFloat(transaction.amount).toFixed(0)}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.details}</td>
                  <td>{transaction.type === 'income' ? 'รายรับ' : 'จ่าย'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="mt-4">
          <Table >
            <thead>
              <tr>
                <th>รายรับ</th>
                <th>รายจ่าย</th>
              </tr>
            </thead>
            <tbody>
              {incomeCategories.length >= expenseCategories.length ? (
                incomeCategories.map((category, index) => (
                  <tr key={category}>
                    <td>
                      {category ? `${category}: ${incomeSummary[category] || 0}` : ''}
                    </td>
                    <td>
                      {expenseCategories[index] ? `${expenseCategories[index]}: ${expenseSummary[expenseCategories[index]] || 0}` : ''}
                    </td>
                  </tr>
                ))
              ) : (
                expenseCategories.map((category, index) => (
                  <tr key={category}>
                    <td>
                      {incomeCategories[index] ? `${incomeCategories[index]}: ${incomeSummary[incomeCategories[index]] || 0}` : ''}
                    </td>
                    <td>
                      {category ? `${category}: ${expenseSummary[category] || 0}` : ''}
                    </td>
                  </tr>
                ))
              )}

              <tr>
                <td style={{ fontWeight: 'bold', color: 'green' }}>
                  รวม: {totalIncome.toFixed(0)}
                </td>
                <td style={{ fontWeight: 'bold', color: 'red' }}>
                  รวม: {totalExpense.toFixed(0)}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editMode ? 'แก้ไขรายการ' : form.type === 'income' ? 'เพิ่มรายรับ' : 'เพิ่มรายจ่าย'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>จำนวนเงิน</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>หมวดหมู่</Form.Label>
                <Form.Select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  required
                >
                  {(form.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รายละเอียด</Form.Label>
                <Form.Control
                  type="text"
                  name="details"
                  value={form.details}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>วันที่</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editMode ? 'อัพเดต' : 'บันทึก'}
              </Button>
              {editMode && (
                <Button variant="danger" onClick={handleDelete} className="ms-2">
                  ลบ
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default Finance;
