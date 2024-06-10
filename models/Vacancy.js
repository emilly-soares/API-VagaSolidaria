const database = require("../config/connection");

const Vacancy = database.sequelize.define("tb_vacancies", {

    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    status: {
        type: database.Sequelize.BOOLEAN,
        defaultValue: true,
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
    },

    workload: {
        type: database.Sequelize.STRING,
        allowNull: true,
    },

});

Vacancy.sync();
module.exports = Vacancy;
