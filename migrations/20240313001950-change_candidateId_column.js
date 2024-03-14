'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tb_companies', 'candidateId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tb_companies', 'candidateId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
