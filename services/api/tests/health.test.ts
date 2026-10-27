import express from "express";
import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.js";
import { genericErrorHandler } from "../src/middleware/error.middleware.js";
import { requestIdMiddleware } from "../src/middleware/requestID.middleware.js";

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
    expect(response.body).toStrictEqual({
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
        requestId: expect.any(String),
      },
    });
  });
  it("tests for error", async () => {
    const testapp = express();
    testapp.use(requestIdMiddleware);
    testapp.get("/test", (req, res, next) => {
      next(new Error("Test crash"));
    });

    testapp.use(genericErrorHandler);
    const response = await request(testapp).get("/test");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: {
        code: "INTERNAL SERVER ERROR",
        message: "An internal server error occurred",
        requestId: expect.any(String),
      },
    });
  });
});
