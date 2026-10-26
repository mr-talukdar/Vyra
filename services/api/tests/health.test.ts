import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";

describe("health routes", () => {
  it("reports the process is alive", async () => {
    const response = await request(app).get("/health/live");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Health check passed");
  });

  it("reports the db is ready", async () => {
    const response = await request(app).get("/health/ready");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: "VYRA",
      ready: true,
    });
  });
  it("tests 404 for non existing route", async () => {
    const response = await request(app).get("/doesnt-exist");
    expect(response.status).toBe(404);
  });
});
