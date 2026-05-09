const {
  RegisterTeacherService,
} = require("../services/RegisterTeacherService");
const {
  registerTeacherSchema,
} = require("../validators/registerTeacherSchema");

class RegisterTeacherController {
  async handle(req, res, next) {
    try {
      const parsed = registerTeacherSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, email, phone, type, subject } = parsed.data;

      const registerTeacherService = new RegisterTeacherService();

      const teacher = await registerTeacherService.execute({
        name,
        email,
        phone,
        type,
        subject,
      });
      return res.status(201).json({
        mensagem: "Professor cadastrado com sucesso!",
        teacher,
      });
    } catch (error) {
      next(error); // passa o erro pro middleware central
    }
  }
}

module.exports = { RegisterTeacherController };
