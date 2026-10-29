import { z } from "zod";

const SignupDetailSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { error: " must be minimum 8 chars" })
    .max(12, { error: " must be maximum 12 chars" })
    .regex(/[^A-Za-z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});

export { SignupDetailSchema };
