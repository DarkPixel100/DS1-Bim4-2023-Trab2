const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../models/usuarios.js")(sequelize, Sequelize);
const cartuchoModel = require("../models/cartuchos.js")(sequelize, Sequelize);
const adminModel = require("../models/admins.js")(sequelize, Sequelize);

usuarioModel.hasOne(adminModel, { onDelete: "CASCADE" });
adminModel.belongsTo(usuarioModel);

usuarioModel.hasOne(cartuchoModel, { onDelete: "CASCADE" });
cartuchoModel.belongsTo(usuarioModel);

module.exports = {
  usuario: usuarioModel,
  cartucho: cartuchoModel,
  admin: adminModel,
};
