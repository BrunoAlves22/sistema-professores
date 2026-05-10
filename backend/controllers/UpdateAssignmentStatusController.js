const {
  UpdateAssignmentStatusService,
} = require("../services/UpdateAssignmentStatusService");
const {
  updateAssignmentStatusSchema,
} = require("../validators/UpdateAssignmentStatusSchema");

class UpdateAssignmentStatusController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const parsed = updateAssignmentStatusSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { status } = parsed.data;

      const updateAssignmentStatusService = new UpdateAssignmentStatusService();
      const assignment = await updateAssignmentStatusService.execute({
        id,
        status,
      });

      return res.status(200).json({
        mensagem: "Status atualizado com sucesso!",
        assignment,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UpdateAssignmentStatusController };
