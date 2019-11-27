"use strict";
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
// changed this in order to no longer have to worry about public pushes to git hub 
const localkeys = require("../keys").localServerKeys;
const prodkeys = require("../keys").productionServerKeys;

var env = process.env.JAWSDB_URL || localkeys || prodkeys;
// const config = require(__dirname + "/../config/config.json")[env]; //dev only
const db = {};
const bcrypt = require("bcrypt");

  


const sequelize = new Sequelize(env);



fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function (file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;