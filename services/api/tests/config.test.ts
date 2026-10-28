import { describe, it, expect } from "vitest";
import { loadEnvironment } from "../src/config/env.js";

describe("environment config", () => {
  it("tests if it is an valid number", () => {
    const environment = loadEnvironment({
      PORT: "8080",
      SUPABASE_DIRECT_CONNECTION_STRING: "http://test.db.url",
    });
    expect(environment.PORT).toBe(8080);
  });
  it("rejects nonnumeric port", () => {
    expect(() => {
      loadEnvironment({
        PORT: "notanumber",
        SUPABASE_DIRECT_CONNECTION_STRING: "http://test.db.url",
      });
    }).toThrow();
  });
  it("rejects a decimal port", () => {
    expect(() =>
      loadEnvironment({
        PORT: "3000.5",
        SUPABASE_DIRECT_CONNECTION_STRING: "http://test.db.url",
      }),
    ).toThrow();
  });

  it("rejects a port outside the valid range", () => {
    expect(() =>
      loadEnvironment({
        PORT: "70000",
        SUPABASE_DIRECT_CONNECTION_STRING: "http://test.db.url",
      }),
    ).toThrow();
  });
  it("defaults to port 3000 when PORT is missing", () => {
    const environment = loadEnvironment({
      SUPABASE_DIRECT_CONNECTION_STRING: "http://test.db.url",
    });

    expect(environment.PORT).toBe(3000);
  });
});
