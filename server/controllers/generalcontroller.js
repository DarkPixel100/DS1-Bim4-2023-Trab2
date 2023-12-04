// const { sequelize, Sequelize } = require("../config/database");
const cartuchoModel = require("../config/associations").cartucho;

const { validationResult } = require("express-validator");

exports.addCartucho = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  }

  const cartucho = {
    nome: req.body.nome,
    sistema: req.body.sistema,
    ano: req.body.ano,
    usuarioId: req.body.usuarioId
  };
  cartuchoModel
    .create(cartucho)
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.deletarCartucho = (req, res) => {
  cartuchoModel
    .destroy({ where: { id: req.body.id } })
    .then((data) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(400).send({ errors: err });
    });
};
