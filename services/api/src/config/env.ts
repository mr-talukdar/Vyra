import { z } from "zod";

import "dotenv/config";

const environmentSchema = z.object({
  PORT: z.coerce
    .number()
    .int("PORT must be an integer")
    .min(1, "PORT must be atleast 1")
    .max(65535, "PORT must be most 65535")
    .default(3000),
  SUPABASE_DIRECT_CONNECTION_STRING: z.url(),
});

export function loadEnvironment(
  input: Record<string, string | undefined>,
): z.infer<typeof environmentSchema> {
  return environmentSchema.parse({
    PORT: input.PORT,
    SUPABASE_DIRECT_CONNECTION_STRING: input.SUPABASE_DIRECT_CONNECTION_STRING,
  });
}

const environment = loadEnvironment(process.env);

export default environment;
