const { z } = require("zod");

const createClassScheduleSchema = z.object({
  lessonNumber: z
    .number({ required_error: "Número da aula é obrigatório" })
    .int()
    .min(1)
    .max(6),
  dayOfWeek: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"])),
  period: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["MORNING", "AFTERNOON"])),
  startTime: z
    .string({ required_error: "Horário de início é obrigatório" })
    .min(1),
  endTime: z
    .string({ required_error: "Horário de término é obrigatório" })
    .min(1),
});

module.exports = { createClassScheduleSchema };
