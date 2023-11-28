// const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;
const emprestimoModel = require("../config/associations").emprestimo;
const cartuchoModel = require("../config/associations").cartucho;

const { validationResult } = require("express-validator");

exports.addLivro = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400, { errors: errors.array() });
  }

  const cartucho = req.body;
  cartuchoModel
    .create(cartucho)
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.alugarLivro = async (req, res) => {
  const emprestimo = {
    usuarioId: req.userId,
    cartuchoId: parseInt(req.body.cartuchoID),
  };

  const qtde = (
    await cartuchoModel.findOne({ where: { id: emprestimo.cartuchoId } })
  ).quantidade;

  if (qtde === 0) {
    req.send(400).send({
      lendError:
        "Esse cartucho não pode ser emprestado (quantidade insuficiente).",
    });
  } else if (
    await emprestimoModel.findOne({
      where: {
        usuarioId: emprestimo.usuarioId,
        cartuchoId: emprestimo.cartuchoId,
      },
    })
  ) {
    req.send(400).send({
      lendError:
        "Esse cartucho não pode ser emprestado (você já possui esse cartucho).",
    });
  } else
    emprestimoModel
      .create(emprestimo)
      .then((data) => {
        cartuchoModel.update(
          { quantidade: qtde - 1 },
          { where: { id: emprestimo.cartuchoId } }
        );
        res.redirect("/");
      })
      .catch((err) => {
        res.status(400).send(err);
      });
};

exports.devolverLivro = async (req, res) => {
  const emprestimo = {
    usuarioId: req.userId,
    cartuchoId: req.body.cartuchoID,
  };

  emprestimoModel
    .destroy({ where: { cartuchoId: emprestimo.cartuchoId } })
    .then(async (data) => {
      const qtde = (
        await cartuchoModel.findOne({ where: { id: emprestimo.cartuchoId } })
      ).quantidade;
      cartuchoModel.update(
        { quantidade: qtde + 1 },
        { where: { id: emprestimo.cartuchoId } }
      );
      res.redirect("/");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.deletarLivro = (req, res) => {
  cartuchoModel
    .destroy({ where: { id: req.body.cartuchoID } })
    .then((data) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

exports.deletarUser = async (req, res) => {
  const emprestimos = await emprestimoModel.findAll({
    where: { usuarioId: req.body.userID },
  });
  emprestimos.forEach(async (emprestimo) => {
    const qtde = (
      await cartuchoModel.findOne({ where: { id: emprestimo.cartuchoId } })
    ).quantidade;
    cartuchoModel.update(
      { quantidade: qtde + 1 },
      { where: { id: emprestimo.cartuchoId } }
    );
  });

  usuarioModel
    .destroy({ where: { id: req.body.userID } })
    .then((data) => {
      if (req.userId === req.body.userID) res.redirect("/logout");
      else res.redirect("/admin");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
