const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewcontroller");
const authController = require("../controllers/authcontroller");
const generalController = require("../controllers/generalcontroller");
const { body } = require("express-validator");

// router.get("/login", viewController.showLogin);
// router.get("/cadastro", viewController.showCadastro);

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
// router.get("/logout", authController.logout);XXXXXXXXXXX

// router.post("/", authController.verifyAuthToken, viewController.showHome);
// router.get("/admin", authController.verifyAuthToken, viewController.showAdmin);
router.post("/admin", authController.verifyAuthToken, viewController.showAdmin);

router.post(
  "/addLivro",
  [
    authController.verifyAuthToken,
    body("titulo").isString().notEmpty(),
    body("autores").isString().notEmpty(),
    body("ano").isInt().notEmpty(),
    body("editora").isString().notEmpty(),
    body("quantidade").isInt().notEmpty(),
  ],
  generalController.addLivro
);
router.post(
  "/alugarLivro",
  authController.verifyAuthToken,
  generalController.alugarLivro
);
router.post(
  "/devolverLivro",
  authController.verifyAuthToken,
  generalController.devolverLivro
);

router.post(
  "/deletarLivro",
  authController.verifyAuthToken,
  generalController.deletarLivro
);
router.post(
  "/deletarUser",
  authController.verifyAuthToken,
  generalController.deletarUser
);

module.exports = router;
