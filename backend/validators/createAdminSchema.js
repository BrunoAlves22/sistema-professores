const { z } = require("zod");

const createAdminSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(1),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

module.exports = { createAdminSchema };
