const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;

const { validationResult } = require("express-validator");

exports.criarUsuario = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("formError", { errors: errors.array() });
        res.send(400, req.flash("formError"));
    }

    const userInfo = {
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password,
    };
    usuarioModel
        .create(userInfo)
        .then((data) => {
            req.flash("dataRegister", "Data saved:" + data);
            res.redirect("/login");
        })
        .catch((err) => {
            req.flash("regError", err);
        });
};

exports.attemptLogin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("formError", { errors: errors.array() });
        res.send(400, req.flash("formError"));
    }

    let formData = {
        email: req.body.email,
        password: req.body.password,
    };
    res.send({ token: 1234 });/*
    usuarioModel
        .findOne({ where: { email: formData.email } })
        .then(async function (user) {
            if (!user) {
                req.flash("loginError", "Email ou senha incorreto(s)");
                // res.redirect("/login");
                // next();
            } else if (!(await user.validarSenha(formData.password))) {
                req.flash("loginError", "Email ou senha incorreto(s)");
                // res.redirect("/login");
                // next();
            } else {
                req.session.user = user;
                console.log("Login realizado com sucesso!");
                req.session.success =
                    "Authenticated as " +
                    user.name +
                    ' click to <a href="/logout">logout</a>. ';
                res.send({token: 1234});
            }
        });*/
};

exports.logout = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) res.status(400).send("Falha no logout!");
            else {
                console.log("Logout realizado com sucesso!");
                res.redirect("/login");
            }
        });
    } else res.end();
};
