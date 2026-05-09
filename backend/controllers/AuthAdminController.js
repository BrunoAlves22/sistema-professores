const { AuthAdminService } = require("../services/AuthAdminService");
const { authAdminSchema } = require("../validators/AuthAdminSchema");

class AuthAdminController {
  async handle(req, res, next) {
    try {
      const parsed = authAdminSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          erro: "Dados inválidos",
          detalhes: parsed.error.flatten().fieldErrors,
        });
      }

      const { email, password } = parsed.data;

      const authAdminService = new AuthAdminService();
      const { admin, token } = await authAdminService.execute({
        email,
        password,
      });

      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        admin,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { AuthAdminController };
