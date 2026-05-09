const { CreateAdminService } = require("../services/CreateAdminService");
const { createAdminSchema } = require("../validators/createAdminSchema");

class CreateAdminController {
  async handle(req, res, next) {
    try {
      const parsed = createAdminSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { name, email, password } = parsed.data;

      const createAdminService = new CreateAdminService();

      const admin = await createAdminService.execute({
        name,
        email,
        password,
      });

      return res.status(201).json({
        mensagem: "Administrador cadastrado com sucesso!",
        admin,
      });
    } catch (error) {
      next(error); // passa o erro pro middleware central
    }
  }
}

module.exports = { CreateAdminController };
