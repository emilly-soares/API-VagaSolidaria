'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tb_users', 'isAdmin');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tb_users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    });
  }
};
