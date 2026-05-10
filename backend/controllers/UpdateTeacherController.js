const { UpdateTeacherService } = require("../services/UpdateTeacherService");
const { updateTeacherSchema } = require("../validators/UpdateTeacherSchema");

class UpdateTeacherController {
  async handle(req, res, next) {
    try {
      const { id } = req.params;

      const parsed = updateTeacherSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, email, phone, subject, type } = parsed.data;

      const updateTeacherService = new UpdateTeacherService();
      const teacher = await updateTeacherService.execute({
        id,
        name,
        email,
        phone,
        subject,
        type,
      });

      return res.status(200).json({
        mensagem: "Professor atualizado com sucesso!",
        teacher,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { UpdateTeacherController };
