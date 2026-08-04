import { describe, expect, it } from "vitest";
import {
  buildRestockRows,
  formatCountdown,
  formatIntervalMinutes,
  formatShortLocalTime
} from "../../src/components/SeedRestockTimer";

describe("SeedRestockTimer display helpers", () => {
  it("keeps the countdown compact and rolls to zero cleanly", () => {
    expect(formatCountdown(301.2)).toBe("5:02");
    expect(formatCountdown(60)).toBe("1:00");
    expect(formatCountdown(0)).toBe("0:00");
    expect(formatCountdown(null)).toBe("—:—");
  });

  it("shows only a short local clock time", () => {
    expect(formatShortLocalTime("2026-08-04T09:35:00.000Z", "en-US")).toMatch(/^\d{1,2}:\d{2}\s?(AM|PM)$/);
    expect(formatShortLocalTime(null)).toBe("Not available");
    expect(formatShortLocalTime("not-a-date")).toBe("Not available");
  });

  it("renders all cards and fixed intervals before the device clock is available", () => {
    const rows = buildRestockRows(null);

    expect(rows.map(({ cycle }) => cycle.entityOrShopId)).toEqual([
      "seed-shop",
      "gear-shop",
      "fruit-stock"
    ]);
    expect(rows.map(({ cycle }) => formatIntervalMinutes(cycle.intervalSeconds))).toEqual([
      "Every 5 min",
      "Every 5 min",
      "Every 10 min"
    ]);
    expect(rows.every(({ result, next, remaining }) => result === null && next === null && remaining === null)).toBe(true);
  });

  it("starts from the device time and fails closed for an invalid clock", () => {
    const rows = buildRestockRows(new Date("2026-08-04T12:03:14.000Z"));
    expect(rows.map(({ remaining }) => remaining)).toEqual([106, 106, 406]);

    const invalidRows = buildRestockRows(new Date("not-a-date"));
    expect(invalidRows.every(({ result, next, remaining }) => result === null && next === null && remaining === null)).toBe(true);
  });

  it("does not invent an interval when cycle data is malformed", () => {
    expect(formatIntervalMinutes(Number.NaN)).toBe("Timing unavailable");
    expect(formatIntervalMinutes(-300)).toBe("Timing unavailable");
    expect(formatIntervalMinutes(301)).toBe("Timing unavailable");
  });
});
