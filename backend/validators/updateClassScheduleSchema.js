const { z } = require("zod");

const updateClassScheduleSchema = z.object({
  lessonNumber: z.number().int().min(1).max(6).optional(),
  dayOfWeek: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]))
    .optional(),
  period: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["MORNING", "AFTERNOON"]))
    .optional(),
  startTime: z.string().min(1).optional(),
  endTime: z.string().min(1).optional(),
});

module.exports = { updateClassScheduleSchema };
