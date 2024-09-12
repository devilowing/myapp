const { Data } = require("../models"); // นำเข้าโมเดล Data จาก models/index.js

// คอนโทรลเลอร์สำหรับการดึงข้อมูลทั้งหมดสำหรับผู้ใช้เฉพาะ
exports.getAllData = async (req, res) => {
  try {
    const userId = req.user.id; // ดึง userId จากข้อมูลผู้ใช้ที่พิสูจน์ตัวตนแล้ว
    const data = await Data.findAll({ where: { userId } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// คอนโทรลเลอร์สำหรับการสร้างข้อมูลใหม่
exports.createData = async (req, res) => {
  try {
    const { name, state, startDate, expireDate, detail } = req.body;
    const userId = req.user.id; // ดึง userId จาก req.user

    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
      return res.status(400).json({ error: "ต้องมี ID ของผู้ใช้" });
    }

    // สร้างข้อมูลใหม่
    const newData = await Data.create({
      name,
      state,
      startDate,
      expireDate,
      detail,
      userId,
    });
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// คอนโทรลเลอร์สำหรับการอัปเดตข้อมูลที่มีอยู่
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, state, startDate, expireDate, detail } = req.body;

    // ค้นหาข้อมูลโดย id
    const data = await Data.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    // อัปเดตข้อมูล
    await data.update({ name, state, startDate, expireDate, detail });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// คอนโทรลเลอร์สำหรับการลบข้อมูล
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    // ค้นหาข้อมูลโดย id
    const data = await Data.findByPk(id);
    if (!data) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    // ลบข้อมูล
    await data.destroy();
    res.json({ message: "ลบข้อมูลเรียบร้อยแล้ว" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
