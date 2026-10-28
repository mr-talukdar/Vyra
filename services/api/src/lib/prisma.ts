import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import environment from "../config/env.js";

const prismaPgAdapter = new PrismaPg({
  connectionString: environment.SUPABASE_DIRECT_CONNECTION_STRING,
});

const prismaClient = new PrismaClient({ adapter: prismaPgAdapter });

export default prismaClient;
