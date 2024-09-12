// backend/controllers/transactionController.js
const { Transaction } = require('../models');

// สร้าง transaction
exports.createTransaction = async (req, res) => {
  try {
    const userId = req.user.id; // ใช้ userId จาก token ที่พิสูจน์ตัวตนแล้ว
    const newTransaction = await Transaction.create({ ...req.body, userId });
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

// ดึง transaction เฉพาะของผู้ใช้ที่เข้าสู่ระบบ
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // ดึง userId จาก token ที่ผ่านการตรวจสอบ
    const transactions = await Transaction.findAll({ where: { userId } });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

// ดึง transaction ตาม id
exports.getTransactionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction', error });
  }
};

// อัปเดต transaction ตาม id
exports.updateTransactionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.update(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction', error });
  }
};

// ลบ transaction ตาม id
exports.deleteTransactionById = async (req, res) => {
  try {
    const userId = req.user.id;
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction', error });
  }
};
