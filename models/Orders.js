const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define('orders',{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncreament: true
  },
  name: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.DOUBLE
  },
  apply_unit: {
    type: Sequelize.STRING
  },
  apply_department: {
    type: Sequelize.STRING
  },
  bookkeeper_id: {
    type: Sequelize.INTEGER
  },
  created: {
    type: Sequelize.STRING
  },
  update: {
    type: Sequelize.STRING
  },
  lastkeeper_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
}, {
  define: { 
    freezeTableName: true 
  }
})