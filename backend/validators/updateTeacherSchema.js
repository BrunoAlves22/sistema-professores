const { z } = require("zod");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const updateTeacherSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email("Email inválido").optional(),
  phone: z
    .string()
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
    })
    .optional(),
  subject: z.string().min(1).optional(),
  type: z
    .string()
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(["FIXED", "SUBSTITUTE"]))
    .optional(),
});

module.exports = { updateTeacherSchema };
