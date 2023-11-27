const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../models/usuarios.js")(sequelize, Sequelize);
const cartuchoModel = require("../models/cartuchos.js")(sequelize, Sequelize);
const adminModel = require("../models/admins.js")(sequelize, Sequelize);
const emprestimoModel = require("../models/emprestimos.js")(
  sequelize,
  Sequelize
);

usuarioModel.hasOne(adminModel, { onDelete: "CASCADE" });
adminModel.belongsTo(usuarioModel);

usuarioModel.hasOne(emprestimoModel, { onDelete: "CASCADE" });
emprestimoModel.belongsTo(usuarioModel);

cartuchoModel.hasOne(emprestimoModel, { onDelete: "CASCADE" });
emprestimoModel.belongsTo(cartuchoModel);

module.exports = {
  usuario: usuarioModel,
  cartucho: cartuchoModel,
  admin: adminModel,
  emprestimo: emprestimoModel,
};
