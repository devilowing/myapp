const express = require('express');
const router = express.Router();
const debtController = require('../controllers/debtController');
const authenticateToken = require('../middleware/authMiddleware'); // Import the middleware

// ใช้ middleware สำหรับการพิสูจน์ตัวตนในทุกๆ route
router.use(authenticateToken);

// Route ที่ต้องการการพิสูจน์ตัวตน
router.get('/', debtController.getDebts);
router.post('/', debtController.createDebt);
router.put('/', debtController.updateDebt); // แก้ไขหนี้
router.delete('/:id', debtController.deleteDebt);

module.exports = router;
