const { Sequelize } = require('sequelize');
const config = require('../configs/config.js');
const pg = require('pg');
require('dotenv').config();

const sequelize = new Sequelize(config.development.url, {
  define: {
    timetamps: true,
    underscored: true,
  },
  dialectModule: pg
});

try {
  sequelize.authenticate();
  console.log('Conected Sequelize');
} catch (error) {
  console.error('Error Conected', error);
}

module.exports = { Sequelize, sequelize };