const { DataTypes } = require("sequelize");
const database = require("../configs/connection");

const User = database.sequelize.define("tb_users", {

  id: {
    type: database.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
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

  isAdmin: {
    type: database.Sequelize.BOOLEAN,
    defaultValue: false,
  }

});

User.sync();
module.exports = User;