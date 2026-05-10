const {
  CreateClassScheduleService,
} = require("../services/CreateClassScheduleService");
const {
  createClassScheduleSchema,
} = require("../validators/CreateClassScheduleSchema");

class CreateClassScheduleController {
  async handle(req, res, next) {
    try {
      const parsed = createClassScheduleSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { lessonNumber, dayOfWeek, period, startTime, endTime } =
        parsed.data;

      const createClassScheduleService = new CreateClassScheduleService();
      const schedule = await createClassScheduleService.execute({
        lessonNumber,
        dayOfWeek,
        period,
        startTime,
        endTime,
      });

      return res.status(201).json({
        mensagem: "Horário cadastrado com sucesso!",
        schedule,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { CreateClassScheduleController };
