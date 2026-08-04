import { describe, expect, it } from "vitest";

describe("test infrastructure", () => {
  it("runs a basic fixture", () => {
    const fixture = { ready: true };

    expect(fixture.ready).toBe(true);
  });
});
