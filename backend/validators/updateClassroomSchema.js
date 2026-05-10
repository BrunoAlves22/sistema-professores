const { z } = require("zod");

const updateClassroomSchema = z.object({
  name: z.string().min(1).optional(),
  grade: z.string().min(1).optional(),
  room: z.string().min(1).optional(),
});

module.exports = { updateClassroomSchema };
