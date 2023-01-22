const dbConfig = require("./config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.dbName, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: dbConfig.operatorsAliases,
  port: dbConfig.port
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./models/Post")(sequelize, Sequelize);
db.users = require("./models/User")(sequelize, Sequelize);

db.users.sync({force: true});

module.exports = db;