const Sequelize = require("sequelize");
const db = require("../database/db");

module.exports = db.sequelize.define('users',{
  uid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncreament: true
  },
  avatar: {
    type: Sequelize.STRING
  },
  nick_name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING 
  },
  phone: {
    type: Sequelize.STRING 
  },
  sex: {
    type: Sequelize.INET
  },
  birth: {
    type: Sequelize.STRING 
  },
  sign: {
    type: Sequelize.STRING 
  }
},{
  timestamps: false
}, {
  define: { 
    freezeTableName: true 
  }
})