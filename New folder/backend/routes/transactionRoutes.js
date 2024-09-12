const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// สร้างการทำงานที่จำเป็น
router.post('/add', transactionController.addTransaction);
router.get('/list', transactionController.getTransactions);
router.get('/balance', transactionController.getBalance);

module.exports = router;
