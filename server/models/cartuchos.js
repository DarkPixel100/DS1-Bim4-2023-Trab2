const { sequelize } = require("../config/database");

module.exports = (sequelize, DataTypes) => {
  var cartuchos = sequelize.define(
    "cartucho",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
      sistema: {
        type: DataTypes.STRING(1234),
      },
      ano: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  return cartuchos;
};
