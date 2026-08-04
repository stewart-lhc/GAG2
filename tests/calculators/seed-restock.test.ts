import { describe, expect, it } from "vitest";
import {
  calculateNextRestock,
  RESTOCK_CALCULATOR_VERSION
} from "../../src/lib/calculators/restock";
import { restockCycleRecords } from "../../src/data/game/restock-cycles";

const cycle = {
  cycleVersion: "sandbox-1",
  anchorAt: "2026-01-01T23:50:00Z",
  intervalSeconds: 20 * 60,
  effectiveFrom: "2026-01-01T23:50:00Z",
  lastObservedAt: "2026-01-01T23:50:00Z",
  staleAfterSeconds: 90 * 60,
  verificationState: "confirmed" as const,
  gameVersion: "2.0.0"
};

describe("calculateNextRestock", () => {
  it("matches the verified 5-minute shop and 10-minute fruit boundaries", () => {
    const seed = restockCycleRecords.find((item) => item.entityOrShopId === "seed-shop")!;
    const fruit = restockCycleRecords.find((item) => item.entityOrShopId === "fruit-stock")!;
    expect(calculateNextRestock(seed, "2026-08-04T12:03:14Z").candidateNextRestockAt).toBe("2026-08-04T12:05:00.000Z");
    expect(calculateNextRestock(fruit, "2026-08-04T12:03:14Z").candidateNextRestockAt).toBe("2026-08-04T12:10:00.000Z");
  });
  it("returns the exact boundary at now and the next boundary just after it", () => {
    expect(calculateNextRestock(cycle, "2026-01-02T00:10:00Z").nextRestockAt).toBe(
      "2026-01-02T00:10:00.000Z"
    );
    expect(calculateNextRestock(cycle, "2026-01-02T00:10:00.001Z").nextRestockAt).toBe(
      "2026-01-02T00:30:00.000Z"
    );
  });

  it("handles a cycle crossing midnight", () => {
    const result = calculateNextRestock(cycle, "2026-01-01T23:55:00Z");
    expect(result.status).toBe("scheduled");
    expect(result.nextRestockAt).toBe("2026-01-02T00:10:00.000Z");
    expect(result.formulaVersion).toBe(RESTOCK_CALCULATOR_VERSION);
  });

  it("normalizes offset timestamps and DST expressions to UTC", () => {
    const result = calculateNextRestock(
      {
        ...cycle,
        anchorAt: "2026-03-08T01:30:00-05:00",
        effectiveFrom: "2026-03-08T01:30:00-05:00",
        lastObservedAt: "2026-03-08T01:30:00-05:00",
        staleAfterSeconds: 24 * 60 * 60
      },
      "2026-03-08T07:35:00Z"
    );
    expect(result.nextRestockAt).toBe("2026-03-08T07:50:00.000Z");
  });

  it("returns stale with the candidate retained at the freshness boundary", () => {
    const result = calculateNextRestock(cycle, "2026-01-02T01:20:00Z");
    expect(result.status).toBe("stale");
    expect(result.stale).toBe(true);
    expect(result.nextRestockAt).toBeNull();
    expect(result.candidateNextRestockAt).toBe("2026-01-02T01:30:00.000Z");
  });

  it("honors the half-open effective window", () => {
    const bounded = {
      ...cycle,
      effectiveFrom: "2026-01-02T00:00:00Z",
      effectiveTo: "2026-01-02T01:00:00Z"
    };
    expect(calculateNextRestock(bounded, "2026-01-01T23:59:59Z").status).toBe("outside-effective-window");
    expect(calculateNextRestock(bounded, "2026-01-02T01:00:00Z").status).toBe("outside-effective-window");
    expect(calculateNextRestock(bounded, "2026-01-02T00:01:00Z").status).toBe("scheduled");
  });

  it("rejects negative, zero, and NaN intervals", () => {
    for (const intervalSeconds of [-1, 0, Number.NaN]) {
      expect(calculateNextRestock({ ...cycle, intervalSeconds }, "2026-01-02T00:00:00Z").status).toBe("invalid");
    }
  });

  it("rejects invalid dates and malformed effective windows", () => {
    expect(calculateNextRestock({ ...cycle, anchorAt: "not-a-date" }, "2026-01-02T00:00:00Z").status).toBe("invalid");
    expect(calculateNextRestock(cycle, "not-a-date").status).toBe("invalid");
    expect(
      calculateNextRestock(
        { ...cycle, effectiveFrom: "2026-01-02T01:00:00Z", effectiveTo: "2026-01-02T00:00:00Z" },
        "2026-01-02T00:00:00Z"
      ).status
    ).toBe("invalid");
  });

  it("does not forecast an unverified or unknown-version cycle", () => {
    expect(calculateNextRestock({ ...cycle, verificationState: "unknown" }, "2026-01-02T00:00:00Z").status).toBe("unknown");
    expect(calculateNextRestock({ ...cycle, gameVersion: "unknown" }, "2026-01-02T00:00:00Z").status).toBe("unknown");
  });
});
