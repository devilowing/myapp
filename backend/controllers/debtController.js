const { Debt } = require('../models'); // นำเข้าจากไฟล์ที่สร้างโมเดล Debt

// ฟังก์ชันดึงข้อมูล debts ทั้งหมดสำหรับผู้ใช้
exports.getDebts = async (req, res) => {
  try {
    const userId = req.user.id; // ดึง userId จาก token ที่ผ่านการตรวจสอบ
    const debts = await Debt.findAll({ where: { userId } });
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching debts', error });
  }
};

// Create a new debt
exports.createDebt = async (req, res) => {
  const { principalAmount, interestRate, startDate, remainingAmount,detail } = req.body;
  const userId = req.user.id; // ดึง userId จาก req.user
  
    // ตรวจสอบว่ามี userId หรือไม่
    if (!userId) {
      return res.status(400).json({ error: "ต้องมี ID ของผู้ใช้" });
    }

  try {
    const newDebt = await Debt.create({
      principalAmount,
      interestRate,
      startDate,
      remainingAmount: principalAmount,
      lastInterestDate: new Date(startDate).toISOString().slice(0, 10), // Set to the same day as startDate
      detail, 
      userId
    });
    res.status(201).json(newDebt);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create debt', error });
  }
};


// ฟังก์ชันอัปเดต debt ตามเงื่อนไขที่ระบุ
exports.updateDebt = async (req, res) => {
  try {
    const { amount, category } = req.body;
    const userId = req.user.id; // ดึง userId จาก token ที่ผ่านการตรวจสอบ

    // ดึงข้อมูล debt ทั้งหมดของผู้ใช้
    const debts = await Debt.findAll({ where: { userId } });

    // หา debt ที่มี detail ตรงกับ category ที่ส่งมา
    const debt = debts.find(d => d.detail === category);

    // หากไม่พบ debt ที่ตรงกัน
    if (!debt) {
      return res.status(404).json({ message: 'ไม่พบ debt ที่มี detail ตรงกับ category ที่ส่งมา' });
    }

    // คำนวณดอกเบี้ย
    const today = new Date();
    const lastInterestDate = new Date(debt.lastInterestDate);
    const daysSinceLastInterest = Math.floor((today - lastInterestDate) / (1000 * 60 * 60 * 24));

    let interest = 0;
    if (daysSinceLastInterest > 0) {
      const interestRatePerDay = (debt.interestRate / 365) / 100;
      interest = debt.remainingAmount * interestRatePerDay * daysSinceLastInterest;
    }

    // คำนวณยอดเงินต้น + ดอกเบี้ย
    const principalPlusInterest = debt.remainingAmount + interest;

    // คำนวณยอดเงินต้นหลังหัก
    const newRemainingAmount = principalPlusInterest - amount;

    // อัปเดต debt ในฐานข้อมูล
    debt.remainingAmount = newRemainingAmount;
    debt.lastInterestDate = today; // อัปเดตวันที่ดอกเบี้ยล่าสุด
    await debt.save();

    res.status(200).json({ message: 'อัปเดตหนี้เรียบร้อยแล้ว', debt });
  } catch (error) {
    console.error('Error updating debt:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการอัปเดตหนี้', error });
  }
};

// // Delete a debt by ID
// exports.deleteDebt = async (req, res) => {
//   try {
//     // Ensure both debt ID and user ID are matched
//     const result = await Debt.destroy({ where: { id: req.params.id, userId: req.userId } });

//     if (result === 0) {
//       return res.status(404).json({ message: 'Debt not found or not authorized' });
//     }
//     res.status(204).send();

//   } catch (error) {
//     console.error('Failed to delete debt:', error);
//     res.status(500).json({ message: 'Failed to delete debt', error });
//   }
// };

// คอนโทรลเลอร์สำหรับการลบข้อมูล
exports.deleteDebt = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    console.log(id)

    // ค้นหาข้อมูลโดย id
    const debt = await Debt.findByPk(id);
    if (!debt) {
      return res.status(404).json({ error: "ไม่พบข้อมูล" });
    }

    // ลบข้อมูล
    await debt.destroy();
    res.json({ message: "ลบข้อมูลเรียบร้อยแล้ว" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
