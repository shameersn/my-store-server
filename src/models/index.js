const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { db } = require("../config/config");

const DB = {};
const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  db.options
);

// eslint-disable-next-line no-undef
fs.readdirSync(__dirname)
  .filter(file => file !== "index.js")
  .forEach(file => {
    // eslint-disable-next-line no-undef
    const model = sequelize.import(path.join(__dirname, file));
    DB[model.name] = model;
  });

Object.keys(DB).forEach(modelName => {
  if ("associate" in DB[modelName]) {
    DB[modelName].associate(DB);
  }
});

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

module.exports = DB;
