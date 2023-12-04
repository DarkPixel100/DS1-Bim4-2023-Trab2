const { Sequelize } = require("../config/database");

const usuarioModel = require("../config/associations").usuario;
const cartuchoModel = require("../config/associations").cartucho;
const adminModel = require("../config/associations").admin;

const Op = Sequelize.Op;

const jwt = require("jsonwebtoken");

const secret = "wow, so secret";

const isAdmin = async (id) => {
  let isAdmin = false;
  if (
    await adminModel.findOne({
      where: { usuarioId: id },
    })
  )
    isAdmin = true;

  return isAdmin;
};

exports.fetchUserData = async (req, res, next) => {
  jwt.verify(req.headers.authorization, secret, async (err, decoded) => {
    if (err) res.status(500).send(err);
    // Fetch user information from the database based on the user ID
    else
      try {
        const userData = await usuarioModel.findOne({
          where: { id: decoded.id },
        });
        if (!userData) return res.sendStatus(403);

        const admin = await isAdmin(userData.id);
        // Attach user information to the request object
        res.status(201).send({
          id: userData.id,
          nome: userData.nome,
          isAdmin: admin,
        });

        next();
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send(error);
      }
  });
};

exports.searchResults = async (req, res) => {
  const searchQuery = req.query.query ? req.query.query : "";
  const searchCartuchos = await cartuchoModel.findAndCountAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [
            {
              nome: {
                [Op.like]: `%${searchQuery}%`,
              },
            },
            { ano: searchQuery },
          ],
        },
        { usuarioId: req.query.userID },
      ],
    },
  });

  res.status(201).send(searchCartuchos);
};

exports.listUsers = async (req, res) => {
  const usuarios = await usuarioModel.findAll();
  res.status(201).send(usuarios);
};
