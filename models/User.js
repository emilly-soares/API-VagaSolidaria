const { Sequelize } = require("sequelize");
const database = require("../config/connection");

const User = database.sequelize.define("tb_users", {

  id: {
    type: database.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: database.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },

  role: {
    type: Sequelize.ENUM('business', 'candidate', 'admin'),
    allowNull: false,
    defaultValue: 'candidate'
  },  

  resetToken:{
    type: database.Sequelize.STRING,
    unique: true,
  }
});

User.sync();
module.exports = User;