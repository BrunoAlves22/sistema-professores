const {
  CreateClassAssignmentService,
} = require("../services/CreateClassAssignmentService");
const {
  createClassAssignmentSchema,
} = require("../validators/CreateClassAssignmentSchema");

class CreateClassAssignmentController {
  async handle(req, res, next) {
    try {
      const parsed = createClassAssignmentSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { teacherId, scheduleId, classRoomId, date, notes } = parsed.data;

      const createClassAssignmentService = new CreateClassAssignmentService();
      const assignment = await createClassAssignmentService.execute({
        teacherId,
        scheduleId,
        classRoomId,
        date,
        notes,
      });

      return res.status(201).json({
        mensagem: "Atribuição criada com sucesso!",
        assignment,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CreateClassAssignmentController };
