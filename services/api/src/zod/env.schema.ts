import { z } from "zod";

const environmentSchema = z.object({
  PORT: z.coerce
    .number()
    .int("PORT must be an integer")
    .min(1, "PORT must be atleast 1")
    .max(65535, "PORT must be most 65535")
    .default(3000),
  SUPABASE_DIRECT_CONNECTION_STRING: z.url(),
  SUPABASE_URL: z.url(),
  SUPABASE_KEY: z.string(),
});

export default environmentSchema;
