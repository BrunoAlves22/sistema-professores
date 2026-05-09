const { z } = require("zod");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const registerTeacherSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório" }).min(1),
  email: z.string().email("Email inválido").optional(),
  phone: z
    .string()
    .optional()
    .transform((val, ctx) => {
      if (!val) return undefined;

      const parsed = parsePhoneNumberFromString(val, "BR");
      if (!parsed || !parsed.isValid()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Telefone inválido",
        });
        return z.NEVER;
      }
      return parsed.formatNational();
    }),
  type: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["FIXED", "SUBSTITUTE"]))
    .optional()
    .default("SUBSTITUTE"),
  subject: z.string().optional(),
});

module.exports = { registerTeacherSchema };
