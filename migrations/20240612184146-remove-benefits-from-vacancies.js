'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_vacancies', 'Benefits');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_vacancies', 'Benefits', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
