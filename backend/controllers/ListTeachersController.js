const { ListTeachersService } = require("../services/ListTeachersService");

class ListTeachersController {
  async handle(req, res, next) {
    try {
      const listTeachersService = new ListTeachersService();
      const teachers = await listTeachersService.execute();
      res.json({
        mensagem: "Professores listados com sucesso!",
        teachers,
      });
    } catch (error) {
      next(error); // passa o erro pro middleware central
    }
  }
}

module.exports = { ListTeachersController };
