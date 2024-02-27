const database = require("../config/connection");

const CandidateVacancy = database.sequelize.define("tb_candidate_vacancy", {

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
        allowNull: false,
    },

    grade: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },

    vacancyId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },

    candidateId: {
        type: database.Sequelize.INTEGER,
        allowNull: false,
    },

});

CandidateVacancy.sync();
module.exports = CandidateVacancy;