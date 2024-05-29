'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('tb_users', 'role', {
    //   type: Sequelize.ENUM('business', 'candidate', 'admin'),
    //   allowNull: false,
    //   defaultValue: 'candidate'
    // });
  },

  down: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn('tb_users', 'role');
  }
};
