const {
  CreateClassroomService,
} = require("../services/CreateClassroomService");
const {
  createClassroomSchema,
} = require("../validators/CreateClassroomSchema");

class CreateClassroomController {
  async handle(req, res, next) {
    try {
      const parsed = createClassroomSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, grade, room } = parsed.data;

      const createClassroomService = new CreateClassroomService();
      const classroom = await createClassroomService.execute({
        name,
        grade,
        room,
      });

      return res.status(201).json({
        mensagem: "Turma cadastrada com sucesso!",
        classroom,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CreateClassroomController };
