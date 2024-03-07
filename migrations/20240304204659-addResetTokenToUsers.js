'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_users', 'resetToken', {
      type: Sequelize.STRING,
      allowNull: true, 
      defaultValue: null 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_users', 'resetToken');
  }
};
