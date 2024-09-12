// backend/models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// นำเข้าโมเดล Data
db.Data = require('./data')(sequelize, Sequelize.DataTypes);
// นำเข้าโมเดล User
db.User = require('./user')(sequelize, Sequelize.DataTypes);

// นำเข้าโมเดล Category
db.Category = require('./category')(sequelize, Sequelize.DataTypes);

// นำเข้าโมเดล Detail
db.Detail = require('./detail')(sequelize, Sequelize.DataTypes);

// นำเข้าโมเดล Category
// db.Category = require('./category')(sequelize, Sequelize.DataTypes);

// ตั้งค่า associations
// db.User.associate(db);
// db.Category.associate(db);

module.exports = db;
