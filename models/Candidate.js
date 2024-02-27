const database = require("../config/connection");

const Candidate = database.sequelize.define("tb_candidates", {
  
  id: {
    type: database.Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  dateBirth: {
    type: database.Sequelize.DATE,
    allowNull: false,
  },

  CPF: {
    type: database.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: database.Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  street: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },

  numberStreet: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },

  neighborhood: {
    type: database.Sequelize.STRING,
    allowNull: false,
  },

  userId: {
    type: database.Sequelize.INTEGER,
    allowNull: false,
  },
});

Candidate.sync();
module.exports = Candidate;
