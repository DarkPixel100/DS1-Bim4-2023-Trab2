const { sequelize, Sequelize } = require("../config/database");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const secret = "wow, so secret";

const { validationResult } = require("express-validator");

const usuarioModel = require("../config/associations").usuario;

exports.verifyAuthToken = (req, res, next) => {
  const { authToken } = req.cookies;

  // verify the token
  jwt.verify(authToken, secret, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .send({ message: "Authentication failed! Please try again :(" });
    }

    // save to request object for later use
    req.userId = decoded.id;
    next();
  });
};

exports.criarUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).send({ errors: errors.array() });
  else {
    const userInfo = {
      nome: req.body.nome,
      email: req.body.email,
      password: req.body.password,
    };
    usuarioModel
      .create(userInfo)
      .then((data) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.status(400).send({ errors: err });
      });
  }
};

exports.attemptLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).send({ errors: errors.array() });
  else {
    let formData = {
      email: req.body.email,
      password: req.body.password,
    };

    usuarioModel
      .findOne({ where: { email: formData.email } })
      .then(async function (user) {
        if (!user) {
          res.status(401).send({ errors: "Email ou senha incorreto(s)" });
          next();
        } else if (!(await user.validarSenha(formData.password))) {
          res.status(401).send({ errors: "Email ou senha incorreto(s)" });
          next();
        } else {
          // token is created and shared with the client
          const token = jwt.sign({ id: user._id }, secret, {
            expiresIn: 600, // expires in 24 hours
          });
          console.log("Login realizado com sucesso!");
          // return the information including token as JSON
          res
            .status(200)
            .send({ message: `Authenticated as ${user.name}!`, token });
        }
      });
  }
};

// exports.logout = (req, res) => {
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) res.status(400).send("Falha no logout!");
//       else {
//         console.log("Logout realizado com sucesso!");
//         res.redirect("/login");
//       }
//     });
//   } else res.end();
// };
