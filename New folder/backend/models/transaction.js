const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // ตรวจสอบให้แน่ใจว่าการเชื่อมต่อกับฐานข้อมูลถูกต้อง

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories', // ชื่อของโมเดล Category
      key: 'id'
    }
  },
  details: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = Transaction;
