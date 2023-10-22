const { Sequelize } = require('sequelize');
const config = require('../configs/config.js');
require('dotenv').config();

const sequelize = new Sequelize(config.development);

try {
  sequelize.authenticate();
  console.log('Connect Sequelize');
} catch (error) {
  console.error('Error Connect', error);
}

module.exports = { Sequelize, sequelize };