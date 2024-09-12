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
// นำเข้าโมเดล Transaction
db.Transaction = require('./transaction')(sequelize, Sequelize.DataTypes);
// นำเข้าโมเดล Debt
db.Debt = require('./debt')(sequelize, Sequelize.DataTypes);

module.exports = db;
