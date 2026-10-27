import { z } from "zod";

const environmentSchema = z.object({
  PORT: z.coerce
    .number()
    .int("PORT must be an integer")
    .min(1, "PORT must be atleast 1")
    .max(65535, "PORT must be most 65535")
    .default(3000),
});

export function loadEnvironment(
  input: Record<string, string | undefined>,
): z.infer<typeof environmentSchema> {
  return environmentSchema.parse({
    PORT: input.PORT,
  });
}

const environment = loadEnvironment(process.env);

export default environment;
