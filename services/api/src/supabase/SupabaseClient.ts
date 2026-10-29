import { createClient } from "@supabase/supabase-js";
import environment from "../config/env.js";

const SupabaseClient = createClient(
  environment.SUPABASE_URL,
  environment.SUPABASE_KEY,
);

export default SupabaseClient;
