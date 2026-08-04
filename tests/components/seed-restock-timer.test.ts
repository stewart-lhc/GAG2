import { describe, expect, it } from "vitest";
import { formatCountdown, formatShortLocalTime } from "../../src/components/SeedRestockTimer";

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
});
