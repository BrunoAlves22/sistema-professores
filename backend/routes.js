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
const {
  CreateClassroomController,
} = require("./controllers/CreateClassroomController");
const {
  ListClassroomsController,
} = require("./controllers/ListClassroomsController");
const {
  CreateClassScheduleController,
} = require("./controllers/CreateClassScheduleController");
const {
  ListClassSchedulesController,
} = require("./controllers/ListClassSchedulesController");
const {
  CreateClassAssignmentController,
} = require("./controllers/CreateClassAssignmentController");
const {
  ListClassAssignmentsController,
} = require("./controllers/ListClassAssignmentsController");
const {
  UpdateAssignmentStatusController,
} = require("./controllers/UpdateAssignmentStatusController");
const {
  UpdateTeacherController,
} = require("./controllers/UpdateTeacherController");
const {
  DeleteTeacherController,
} = require("./controllers/DeleteTeacherController");
const {
  UpdateClassroomController,
} = require("./controllers/UpdateClassroomController");
const {
  DeleteClassroomController,
} = require("./controllers/DeleteClassroomController");
const {
  UpdateClassScheduleController,
} = require("./controllers/UpdateClassScheduleController");
const {
  DeleteClassScheduleController,
} = require("./controllers/DeleteClassScheduleController");
const {
  DeleteClassAssignmentController,
} = require("./controllers/DeleteClassAssignmentController");

const createAdminController = new CreateAdminController();
const authAdminController = new AuthAdminController();
const registerTeacherController = new RegisterTeacherController();
const listTeachersController = new ListTeachersController();
const createClassroomController = new CreateClassroomController();
const listClassroomsController = new ListClassroomsController();
const createClassScheduleController = new CreateClassScheduleController();
const listClassSchedulesController = new ListClassSchedulesController();
const createClassAssignmentController = new CreateClassAssignmentController();
const listClassAssignmentsController = new ListClassAssignmentsController();
const updateAssignmentStatusController = new UpdateAssignmentStatusController();
const updateTeacherController = new UpdateTeacherController();
const deleteTeacherController = new DeleteTeacherController();
const updateClassroomController = new UpdateClassroomController();
const deleteClassroomController = new DeleteClassroomController();
const updateClassScheduleController = new UpdateClassScheduleController();
const deleteClassScheduleController = new DeleteClassScheduleController();
const deleteClassAssignmentController = new DeleteClassAssignmentController();

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

// Criar turma
router.post("/create-classroom", authMiddleware, (req, res, next) =>
  createClassroomController.handle(req, res, next),
);

// Listar turmas
router.get("/list-classrooms", authMiddleware, (req, res, next) =>
  listClassroomsController.handle(req, res, next),
);

// Criar horário de aula
router.post("/create-schedule", authMiddleware, (req, res, next) =>
  createClassScheduleController.handle(req, res, next),
);

// Listar horários de aula
router.get("/list-schedules", authMiddleware, (req, res, next) =>
  listClassSchedulesController.handle(req, res, next),
);

// Criar atribuição de aula
router.post("/create-assignment", authMiddleware, (req, res, next) =>
  createClassAssignmentController.handle(req, res, next),
);

// Listar atribuições de aula
router.get("/list-assignments", authMiddleware, (req, res, next) =>
  listClassAssignmentsController.handle(req, res, next),
);

// Atualizar status da atribuição de aula
router.patch("/update-assignment/:id", authMiddleware, (req, res, next) =>
  updateAssignmentStatusController.handle(req, res, next),
);

// Professores
router.patch("/update-teacher/:id", authMiddleware, (req, res, next) =>
  updateTeacherController.handle(req, res, next),
);
router.delete("/delete-teacher/:id", authMiddleware, (req, res, next) =>
  deleteTeacherController.handle(req, res, next),
);

// Turmas
router.patch("/update-classroom/:id", authMiddleware, (req, res, next) =>
  updateClassroomController.handle(req, res, next),
);
router.delete("/delete-classroom/:id", authMiddleware, (req, res, next) =>
  deleteClassroomController.handle(req, res, next),
);

// Horários
router.patch("/update-schedule/:id", authMiddleware, (req, res, next) =>
  updateClassScheduleController.handle(req, res, next),
);
router.delete("/delete-schedule/:id", authMiddleware, (req, res, next) =>
  deleteClassScheduleController.handle(req, res, next),
);

// Atribuições
router.delete("/delete-assignment/:id", authMiddleware, (req, res, next) =>
  deleteClassAssignmentController.handle(req, res, next),
);

module.exports = router;
