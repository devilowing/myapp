const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// สร้างการทำงานที่จำเป็น
router.post('/add', categoryController.addCategory);
router.get('/list', categoryController.getCategories);

module.exports = router;
