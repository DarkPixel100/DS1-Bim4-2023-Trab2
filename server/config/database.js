const Sequelize = require("sequelize");

let sequelize = new Sequelize("cartuchos", "root", "", {
  host: "localhost",
  password: "mysqluser",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
