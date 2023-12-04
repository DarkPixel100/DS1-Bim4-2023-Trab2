const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewcontroller");
const authController = require("../controllers/authcontroller");
const generalController = require("../controllers/generalcontroller");
const { body } = require("express-validator");

router.post(
  "/cadastro",
  [
    body("nome").isString().notEmpty(),
    body("email").isEmail(),
    body("password")
      .isLength({ min: 8 }) // Minimum length of 8 characters
      .matches(/[A-Z]/),
  ],
  authController.criarUsuario
);
router.post(
  "/login",
  [body("email").notEmpty(), body("password").notEmpty()],
  authController.attemptLogin
);

router.post(
  "/addCartucho",
  [
    authController.authenticateToken,
    body("nome").isString().notEmpty(),
    body("sistema").isString().notEmpty(),
    body("ano").isInt().notEmpty(),
  ],
  generalController.addCartucho
);

router.post(
  "/deletarCartucho",
  authController.authenticateToken,
  generalController.deletarCartucho
);
router.post(
  "/deletarUsuario",
  authController.authenticateToken,
  authController.deletarUsuario
);

router.get("/userData", viewController.fetchUserData);
router.get("/cartuchos", viewController.searchResults);
router.get("/usuarios", viewController.listUsers);

module.exports = router;
