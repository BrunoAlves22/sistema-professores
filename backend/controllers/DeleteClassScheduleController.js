const {
  DeleteClassScheduleService,
} = require("../services/DeleteClassScheduleService");

class DeleteClassScheduleController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const deleteClassScheduleService = new DeleteClassScheduleService();
      const result = await deleteClassScheduleService.execute({ id });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { DeleteClassScheduleController };
