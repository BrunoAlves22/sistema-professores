const {
  ListClassAssignmentsService,
} = require("../services/ListClassAssignmentsService");

class ListClassAssignmentsController {
  async handle(req, res, next) {
    try {
      const listClassAssignmentsService = new ListClassAssignmentsService();
      const assignments = await listClassAssignmentsService.execute();

      return res.status(200).json({ assignments });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { ListClassAssignmentsController };
