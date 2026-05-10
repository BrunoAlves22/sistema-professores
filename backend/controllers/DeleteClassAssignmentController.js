const {
  DeleteClassAssignmentService,
} = require("../services/DeleteClassAssignmentService");

class DeleteClassAssignmentController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const deleteClassAssignmentService = new DeleteClassAssignmentService();
      const result = await deleteClassAssignmentService.execute({ id });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { DeleteClassAssignmentController };
