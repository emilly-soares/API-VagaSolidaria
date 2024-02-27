const { Sequelize } = require('sequelize');
const config = require('../config/config.js');
require('dotenv').config();

const sequelize = new Sequelize(config.development);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

module.exports = { Sequelize, sequelize };