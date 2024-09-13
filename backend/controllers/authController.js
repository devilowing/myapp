const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // นำเข้าจากไฟล์ที่สร้างโมเดล User


// ฟังก์ชันล็อกอิน

exports.test = async (req, res) => {
  return res.json({ message: 'Hello World' })
};

exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // ค้นหาผู้ใช้ตาม username
      const user = await User.findOne({ where: { username } });
      
      // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
      if (!user) {
        return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
      
      // ตรวจสอบรหัสผ่าน
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
      }
      
      // สร้าง token
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '3d' });
      // const userId = user.id 

      res.status(200).json({ token});
    } catch (error) {
      res.status(500).json({ message: 'เกิดข้อผิดพลาดในการล็อกอิน', error });
    }
  };

// ฟังก์ชันสร้างผู้ใช้ใหม่
exports.createUser = async (req, res) => {
    try {
      const { username, password, email, isAdmin } = req.body;
  
      // เข้ารหัสรหัสผ่านก่อนเก็บลงในฐานข้อมูล
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.create({ username, password: hashedPassword, email, isAdmin });
      res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error); // Log error for debugging
      res.status(400).json({ message: 'เกิดข้อผิดพลาดในการสร้างผู้ใช้', error });
    }
  };
