'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_candidate_vacancies', 'grade');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_candidate_vacancies', 'grade', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
