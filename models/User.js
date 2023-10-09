const database = require("../configs/connection");

const User = database.sequelize.define("users", {
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
});

User.sync();
module.exports = User;