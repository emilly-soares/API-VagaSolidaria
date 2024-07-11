'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_candidate_vacancies', 'availability', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_candidate_vacancies', 'availability');
  }
};
