import { describe, it, expect, afterAll } from "vitest";
import prismaClient from "../src/lib/prisma.js";

type DbResponse = { result: number }[];

describe("Checks on the basis of a configured DB", () => {
  it("Checks if the db is connected", async () => {
    const response = await prismaClient.$queryRaw<DbResponse>`
     SELECT 1 AS result
    `;
    const data = response[0].result;
    expect(data).toBe(1);
  });
  afterAll(async () => {
    prismaClient.$disconnect();
  });
});
