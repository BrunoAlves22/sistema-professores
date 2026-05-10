const { z } = require("zod");

const createClassroomSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(1),
  grade: z.string({ required_error: "Série é obrigatória" }).min(1),
  room: z.string({ required_error: "Sala é obrigatória" }).min(1),
});

module.exports = { createClassroomSchema };
