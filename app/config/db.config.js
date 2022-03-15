const env = require('./env.js');
var mysql = require('mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
var ExchangeMD = sequelize.define('ExchangeMD', {
  // Here are the columns of the table
  EUR: {type: Sequelize.FLOAT},
  GBP: {type: Sequelize.FLOAT},
  Base: {type: Sequelize.STRING},
  dateExchnage: {type: Sequelize.DATE},
  createdAt: {type: Sequelize.DATE},
  updatedAt: {type: Sequelize.DATE},
});
ExchangeMD.sync().then(function () {
  // Table created
  
});

 
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;
 
db.exChangeMD = require('../models/ExchangeMD')(sequelize, Sequelize);

module.exports = db;