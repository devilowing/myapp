module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
  // กำหนดฟิลด์ที่คุณต้องการในโมเดล
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  timestamps: true // เพิ่มข้อมูล timestamp (createdAt, updatedAt) โดยอัตโนมัติ
});

  
return User;
};