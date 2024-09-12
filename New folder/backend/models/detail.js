const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Detail = sequelize.define('Detail', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
});

module.exports = Detail;
