'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_vacancies', 'responsibilities', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
    await queryInterface.addColumn('tb_vacancies', 'benefits', {
      type: Sequelize.TEXT,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_vacancies', 'responsibilities');
    await queryInterface.removeColumn('tb_vacancies', 'benefits');
  }
};
