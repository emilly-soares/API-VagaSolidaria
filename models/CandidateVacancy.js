const database = require("../config/connection");

const CandidateVacancy = database.sequelize.define("tb_candidate_vacancies", {

    id: {
        type: database.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    conclusion: {
        type: database.Sequelize.DATE,
    },

    evaluation: {
        type: database.Sequelize.STRING,
        allowNull: true,
    },

    vacancyId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },

    candidateId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },

    availability:{
        type: database.Sequelize.STRING,
        allowNull: false,
    }

});

CandidateVacancy.sync();
module.exports = CandidateVacancy;