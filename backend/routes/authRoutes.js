// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route ไม่ต้องใช้ middleware
router.post('/login', authController.loginUser);
router.post('/register', authController.createUser); 
router.get('/test',authController.test)

// app.post("/api/auth/login", authRoutes); // ควรใช้ POST สำหรับ login
// app.post("/api/auth/register", authRoutes); // ควรใช้ POST สำหรับ register

module.exports = router;
