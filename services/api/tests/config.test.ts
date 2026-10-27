import { describe, it, expect } from "vitest";
import { loadEnvironment } from "../src/config/env.js";

describe("environment config", () => {
  it("tests if it is an valid number", () => {
    const environment = loadEnvironment({
      PORT: "8080",
    });
    expect(environment.PORT).toBe(8080);
  });
  it("rejects nonnumeric port", () => {
    expect(() => {
      loadEnvironment({
        PORT: "notanumber",
      });
    }).toThrow();
  });
  it("rejects a decimal port", () => {
    expect(() =>
      loadEnvironment({
        PORT: "3000.5",
      }),
    ).toThrow();
  });

  it("rejects a port outside the valid range", () => {
    expect(() =>
      loadEnvironment({
        PORT: "70000",
      }),
    ).toThrow();
  });
});
