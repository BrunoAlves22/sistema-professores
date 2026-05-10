const { ListClassroomsService } = require("../services/ListClassroomsService");

class ListClassroomsController {
  async handle(req, res, next) {
    try {
      const listClassroomsService = new ListClassroomsService();
      const classrooms = await listClassroomsService.execute();

      return res.status(200).json({ classrooms });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ListClassroomsController };
