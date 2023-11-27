const { cartucho } = require("../config/associations");
const { sequelize, Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;
const cartuchoModel = require("../config/associations").cartucho;
const adminModel = require("../config/associations").admin;
const emprestimoModel = require("../config/associations").emprestimo;
const Op = Sequelize.Op;

const searchResults = async (req, res) => {
    let isAdmin = false;
    if (
        await adminModel.findOne({
            where: { usuarioId: req.session.user.id },
        })
    )
        isAdmin = true;
    const searchQuery = req.body.searchQuery ? req.body.searchQuery : "";
    const searchCartuchos = await cartuchoModel.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    titulo: {
                        [Op.like]: `%${searchQuery}%`,
                    },
                },
                { ano: searchQuery },
            ],
        },
    });

    return {
        admin: isAdmin,
        searchCartuchos: searchCartuchos,
    };
};

exports.showCadastro = (req, res) => {
    res.send({
        view: "cadastro",
        reqFlash: {
            errAuth: req.flash("regError"),
        },
    });
};

exports.showLogin = (req, res) => {
    res.render("login", {
        reqFlash: {
            noAuth: req.flash("authNecessary"),
            errAuth: req.flash("loginError"),
        },
    });
};

exports.showHome = async (req, res) => {
    if (req.session && req.session.user) {
        const emprestimos = await emprestimoModel.findAll({
            where: { usuarioId: req.session.user.id },
        });
        let cartuchosIDlist = [];
        emprestimos.forEach((emprestimo) => {
            cartuchosIDlist.push(emprestimo.cartuchoId);
        });

        let cartuchosResult = { rows: [], count: 0 };
        for (let cartuchoID of cartuchosIDlist) {
            cartuchosResult.rows.push(
                await cartuchoModel.findOne({ where: { id: cartuchoID } })
            );
            cartuchosResult.count++;
        }
        const results = await searchResults(req, res);
        res.send({
            view: "home",
            user: req.session.user,
            meusCartuchos: cartuchosResult,
            admin: results.admin,
            searchCartuchos: results.searchCartuchos,
        });
    } else {
        req.flash(
            "authNecessary",
            "Você precisa fazer login para acessar essa página!"
        );
        res.redirect("/login");
    }
};

exports.showAdmin = async (req, res) => {
    if (req.session && req.session.user) {
        const results = await searchResults(req, res);
        if (results.admin) {
            const users = await usuarioModel.findAll();

            res.send({
                view: "admin",
                user: req.session.user,
                admin: results.admin,
                searchCartuchos: results.searchCartuchos,
                usuarios: users,
            });
        } else {
            req.flash(
                "authForbidden",
                "Você não tem permissão para acessar essa página!"
            );
            res.send(403, req.flash("authForbidden"));
        }
    } else {
        req.flash(
            "authNecessary",
            "Você precisa fazer login para acessar essa página!"
        );
        res.redirect("/login");
    }
};
