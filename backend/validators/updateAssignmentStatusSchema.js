const { z } = require("zod");

const updateAssignmentStatusSchema = z.object({
  status: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"])),
});

module.exports = { updateAssignmentStatusSchema };
