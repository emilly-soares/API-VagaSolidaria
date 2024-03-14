const database = require("../config/connection");

const Company = database.sequelize.define("tb_companies", {

    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    cnpj: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    phone: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

    ie: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    corporateReason: {
        type: database.Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    fantasyName: {
        type: database.Sequelize.STRING,
        allowNull: false
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

    
  candidateId: {
    type: database.Sequelize.INTEGER,
    allowNull: true,
  },

});

Company.sync();
module.exports = Company;