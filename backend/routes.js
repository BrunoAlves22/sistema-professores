const express = require("express");
const router = express.Router();

const prisma = require("./prisma");
const {
  CreateAdminController,
} = require("./controllers/CreateAdminController");
const {
  RegisterTeacherController,
} = require("./controllers/RegisterTeacherController");
const {
  ListTeachersController,
} = require("./controllers/ListTeachersController");
const { AuthAdminController } = require("./controllers/AuthAdminController");
const { authMiddleware } = require("./middlewares/authMiddleware");

const createAdminController = new CreateAdminController();
const authAdminController = new AuthAdminController();
const registerTeacherController = new RegisterTeacherController();
const listTeachersController = new ListTeachersController();

// Criar Admin
router.post("/create-admin", (req, res, next) => {
  return createAdminController.handle(req, res, next);
});

// Login Admin
router.post("/login", (req, res, next) =>
  authAdminController.handle(req, res, next),
);

// Registrar Professor
router.post("/register-teacher", authMiddleware, (req, res, next) => {
  return registerTeacherController.handle(req, res, next);
});

// Listar professores

router.get("/list-teachers", authMiddleware, (req, res, next) => {
  return listTeachersController.handle(req, res, next);
});

module.exports = router;
