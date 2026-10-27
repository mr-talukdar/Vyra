import type { randomUUID } from "node:crypto";

declare global {
  namespace Express {
    interface Locals {
      requestId?: string | ReturnType<typeof randomUUID>;
    }
  }
}
