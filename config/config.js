require('dotenv').config()

const { DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "sequelize_db_dev",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "sequelize_db_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "sequelize_db_prod",
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
