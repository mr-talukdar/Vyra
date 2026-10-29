import { z } from "zod";
import environmentSchema from "../zod/env.schema.js";
import "dotenv/config";

export function loadEnvironment(
  input: Record<string, string | undefined>,
): z.infer<typeof environmentSchema> {
  return environmentSchema.parse({
    PORT: input.PORT,
    SUPABASE_DIRECT_CONNECTION_STRING: input.SUPABASE_DIRECT_CONNECTION_STRING,
    SUPABASE_URL: input.SUPABASE_PROJECT_URL,
    SUPABASE_KEY: input.SUPABASE_PUBLISHABLE_KEY,
  });
}

const environment = loadEnvironment(process.env);

export default environment;
