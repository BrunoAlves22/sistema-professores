const { DeleteTeacherService } = require("../services/DeleteTeacherService");

class DeleteTeacherController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const deleteTeacherService = new DeleteTeacherService();
      const result = await deleteTeacherService.execute({ id });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { DeleteTeacherController };
