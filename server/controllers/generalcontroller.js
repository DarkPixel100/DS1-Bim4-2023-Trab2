const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;
const emprestimoModel = require("../config/associations").emprestimo;
const cartuchoModel = require("../config/associations").cartucho;

const { validationResult } = require("express-validator");

exports.addLivro = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("formError", { errors: errors.array() });
    res.send(400, req.flash("formError"));
  }

  const cartucho = req.body;
  cartuchoModel
    .create(cartucho)
    .then((data) => {
      req.flash("dataRegister", "Data saved:" + data);
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};

exports.alugarLivro = async (req, res) => {
  const emprestimo = {
    usuarioId: req.session.user.id,
    cartuchoId: parseInt(req.body.cartuchoID),
  };

  const qtde = (await cartuchoModel.findOne({ where: { id: emprestimo.cartuchoId } }))
    .quantidade;

  if (qtde == 0) {
    req.flash(
      "lendError",
      "Esse cartucho não pode ser emprestado (quantidade insuficiente)."
    );
    res.send(req.flash("lendError"));
  } else if (
    await emprestimoModel.findOne({
      where: { usuarioId: emprestimo.usuarioId, cartuchoId: emprestimo.cartuchoId },
    })
  ) {
    req.flash(
      "lendError",
      "Esse cartucho não pode ser emprestado (você já possui esse cartucho)."
    );
    res.send(req.flash("lendError"));
  } else
    emprestimoModel
      .create(emprestimo)
      .then((data) => {
        cartuchoModel.update(
          { quantidade: qtde - 1 },
          { where: { id: emprestimo.cartuchoId } }
        );
        req.flash("dataRegister", "Data saved:" + data);
        res.redirect("/");
      })
      .catch((err) => {
        req.flash("addError", err);
        res.send(req.flash("addError"));
      });
};

exports.devolverLivro = async (req, res) => {
  const emprestimo = {
    usuarioId: req.session.user.id,
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
      req.flash("dataRegister", "Data deleted:" + data);
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};

exports.deletarLivro = (req, res) => {
  cartuchoModel
    .destroy({ where: { id: req.body.cartuchoID } })
    .then((data) => {
      req.flash("dataRegister", "Data deleted:" + data);
      res.redirect("/admin");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
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
      req.flash("dataRegister", "Data deleted:" + data);
      if (req.session.user.id == req.body.userID) res.redirect("/logout");
      else res.redirect("/admin");
    })
    .catch((err) => {
      req.flash("addError", err);
      res.send(req.flash("addError"));
    });
};
