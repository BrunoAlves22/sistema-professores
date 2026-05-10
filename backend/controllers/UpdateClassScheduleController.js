const {
  UpdateClassScheduleService,
} = require("../services/UpdateClassScheduleService");
const {
  updateClassScheduleSchema,
} = require("../validators/UpdateClassScheduleSchema");

class UpdateClassScheduleController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const parsed = updateClassScheduleSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { lessonNumber, dayOfWeek, period, startTime, endTime } =
        parsed.data;

      const updateClassScheduleService = new UpdateClassScheduleService();
      const schedule = await updateClassScheduleService.execute({
        id,
        lessonNumber,
        dayOfWeek,
        period,
        startTime,
        endTime,
      });

      return res.status(200).json({
        mensagem: "Horário atualizado com sucesso!",
        schedule,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UpdateClassScheduleController };
