const Transaction = require('../models/transaction');
const Category = require('../models/category');

exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, categoryId, details } = req.body;
    const transaction = await Transaction.create({ amount, type, categoryId, details });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const income = await Transaction.sum('amount', { where: { type: 'income' } });
    const expense = await Transaction.sum('amount', { where: { type: 'expense' } });
    const balance = (income || 0) - (expense || 0);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
