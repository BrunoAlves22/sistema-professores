const { z } = require("zod");

const createClassAssignmentSchema = z.object({
  teacherId: z.string({ required_error: "Professor é obrigatório" }).min(1),
  scheduleId: z.string({ required_error: "Horário é obrigatório" }).min(1),
  classRoomId: z.string({ required_error: "Turma é obrigatória" }).min(1),
  date: z
    .string({ required_error: "Data é obrigatória" })
    .transform((val) => new Date(val)),
  notes: z.string().optional(),
});

module.exports = { createClassAssignmentSchema };
