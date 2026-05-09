const { z } = require("zod");

const authAdminSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

module.exports = { authAdminSchema };
