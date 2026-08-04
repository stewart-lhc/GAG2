import { describe, expect, it } from "vitest";
import { calculateValueCoverage } from "@/lib/calculators/value-list";

describe("calculateValueCoverage", () => {
  it("counts unique verified entities instead of observations", () => {
    expect(
      calculateValueCoverage(
        ["plant-a", "plant-a", "plant-b"],
        ["plant-a", "plant-b", "plant-c"],
      ),
    ).toEqual({
      verifiedEntityCount: 2,
      selectableEntityCount: 3,
      observationCount: 3,
      percentage: 67,
    });
  });

  it("ignores verified observations for entities outside the selectable manifest", () => {
    expect(calculateValueCoverage(["plant-a", "hidden-x"], ["plant-a", "plant-b"])).toEqual({
      verifiedEntityCount: 1,
      selectableEntityCount: 2,
      observationCount: 2,
      percentage: 50,
    });
  });

  it("returns zero percent when no selectable entities exist", () => {
    expect(calculateValueCoverage(["hidden-x"], [])).toEqual({
      verifiedEntityCount: 0,
      selectableEntityCount: 0,
      observationCount: 1,
      percentage: 0,
    });
  });
});
