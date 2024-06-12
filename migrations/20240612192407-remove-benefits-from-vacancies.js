'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_vacancies', 'benefits');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_vacancies', 'benefits', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
