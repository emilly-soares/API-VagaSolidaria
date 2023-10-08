require("dotenv").config();

module.exports = {
  development: {
    url: process.env.database,
    dialect: "postgresql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgresql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgresql",
  },
};
