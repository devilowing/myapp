// backend/models/transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('กิน', 'ของใช้', 'บริการต่างๆ', 'ช่วยที่บ้าน', 'น้ำมัน', 'ใช้หนี้','หนี้แม่','เงินเดือน','กดบัตร','ขายของ','ยืม','ให้'),
      allowNull: false,
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    timestamps: true,
  });

  return Transaction;
};
