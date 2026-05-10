const {
  UpdateClassroomService,
} = require("../services/UpdateClassroomService");
const {
  updateClassroomSchema,
} = require("../validators/UpdateClassroomSchema");

class UpdateClassroomController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const parsed = updateClassroomSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, grade, room } = parsed.data;

      const updateClassroomService = new UpdateClassroomService();
      const classroom = await updateClassroomService.execute({
        id,
        name,
        grade,
        room,
      });

      return res.status(200).json({
        mensagem: "Turma atualizada com sucesso!",
        classroom,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UpdateClassroomController };
