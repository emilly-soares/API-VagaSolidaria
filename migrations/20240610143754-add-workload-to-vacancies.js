'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.addColumn('tb_vacancies', 'workload', {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('tb_vacancies', 'workload');
    }
};