// backend/routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const authenticateToken = require('../middleware/authMiddleware'); // ตรวจสอบการ import

// ใช้ middleware ตรวจสอบการพิสูจน์ตัวตนสำหรับเส้นทางที่ต้องการการพิสูจน์ตัวตน
router.use(authenticateToken);

// เส้นทางที่ต้องการการพิสูจน์ตัวตน
router.get('/', dataController.getAllData);
router.post('/', dataController.createData);
router.put('/:id', dataController.updateData);
router.delete('/:id', dataController.deleteData);

module.exports = router;
