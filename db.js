const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('firstBase', 'user', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: 0,
  port: 54320,
  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => console.log('Connected.'))
  .catch(error => console.error(error))

module.exports = sequelize