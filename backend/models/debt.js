module.exports = (sequelize, DataTypes) => {
  const Debt = sequelize.define('Debt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    detail: {
      type: DataTypes.STRING, // ตรวจสอบให้แน่ใจว่ามีคอลัมน์ detail ด้วย
      unique: true,
      allowNull: false,        // สามารถกำหนดเป็น `false` หากต้องการให้ค่านี้ต้องมี
    },
    principalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    interestRate: {
      type: DataTypes.FLOAT,
      defaultValue: 16.0 // อัตราดอกเบี้ย 16% ต่อปี
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastInterestDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remainingAmount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true // สามารถ null ได้ ถ้าไม่ได้เชื่อมกับผู้ใช้
    }
  }, {
    timestamps: true
  });

  return Debt;
};
