'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //await queryInterface.removeColumn('tb_candidates', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.addColumn('tb_candidates', 'name', {
    //   type: Sequelize.STRING,
    //   allowNull: true, 
    // });
  }
};
