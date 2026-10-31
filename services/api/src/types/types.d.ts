import type { User } from "@supabase/supabase-js";
import type { randomUUID } from "node:crypto";

declare global {
  namespace Express {
    interface Locals {
      requestId?: string | ReturnType<typeof randomUUID>;
    }
    interface Request {
      user?: User;
      accessToken?: string | undefined;
    }
  }
}
