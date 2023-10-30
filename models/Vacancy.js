const database = require("../configs/connection");

const Vacancy = database.sequelize.define("tb_vacancies", {

    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    status: {
        type: database.Sequelize.STRING,
        allowNull: false,
    },

    description: {
        type: database.Sequelize.STRING,
        allowNull: false,
    },

    jobTitle: {
        type: database.Sequelize.STRING,
        allowNull: false,
    },

    company_id: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },


    candidateId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },

});

Vacancy.sync();
module.exports = Vacancy;
