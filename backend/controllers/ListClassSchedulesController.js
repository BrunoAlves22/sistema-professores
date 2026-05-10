const {
  ListClassSchedulesService,
} = require("../services/ListClassSchedulesService");

class ListClassSchedulesController {
  async handle(req, res, next) {
    try {
      const listClassSchedulesService = new ListClassSchedulesService();
      const schedules = await listClassSchedulesService.execute();

      return res.status(200).json({ schedules });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ListClassSchedulesController };
