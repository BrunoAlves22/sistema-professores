const {
  DeleteClassroomService,
} = require("../services/DeleteClassroomService");

class DeleteClassroomController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const deleteClassroomService = new DeleteClassroomService();
      const result = await deleteClassroomService.execute({ id });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { DeleteClassroomController };
