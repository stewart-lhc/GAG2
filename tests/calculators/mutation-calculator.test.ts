import { describe, expect, it } from "vitest";
import { mutationRecords, plantRecords } from "../../src/data/game/entities";
import {
  calculateMutationValue,
  MUTATION_CALCULATOR_FORMULA_VERSION
} from "../../src/lib/calculators/mutation";

const gold = mutationRecords.find((item) => item.name === "Gold")!;
const none = mutationRecords.find((item) => item.name === "None")!;
const bamboo = plantRecords.find((item) => item.name === "Bamboo")!;
const acorn = plantRecords.find((item) => item.name === "Acorn")!;

describe("mutation calculator", () => {
  it("uses the raw multiplier for a multi-harvest plant", () => {
    const result = calculateMutationValue({ baseValue: 100, plant: acorn, mutation: gold });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(1000);
      expect(result.rawMultiplier).toBe(10);
      expect(result.effectiveMultiplier).toBe(10);
      expect(result.harvestType).toBe("multi");
      expect(result.formulaVersion).toBe(MUTATION_CALCULATOR_FORMULA_VERSION);
    }
  });

  it("reduces the mutation bonus for a single-harvest plant", () => {
    const result = calculateMutationValue({ baseValue: 100, plant: bamboo, mutation: gold });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.rawMultiplier).toBe(10);
      expect(result.effectiveMultiplier).toBe(2.35);
      expect(result.value).toBe(235);
      expect(result.harvestType).toBe("single");
    }
  });

  it("keeps None neutral for either harvest type", () => {
    expect(calculateMutationValue({ baseValue: 125, plant: acorn, mutation: none }))
      .toMatchObject({ ok: true, value: 125, effectiveMultiplier: 1 });
    expect(calculateMutationValue({ baseValue: 125, plant: bamboo, mutation: none }))
      .toMatchObject({ ok: true, value: 125, effectiveMultiplier: 1 });
  });

  it("rejects invalid values, plants, and mutation records", () => {
    expect(calculateMutationValue({ baseValue: -1, plant: acorn, mutation: gold }).ok).toBe(false);
    expect(calculateMutationValue({ baseValue: Number.NaN, plant: acorn, mutation: gold }).ok).toBe(false);
    expect(
      calculateMutationValue({
        baseValue: 1,
        plant: { ...acorn, verificationState: "unknown" },
        mutation: gold
      }).ok
    ).toBe(false);
    expect(
      calculateMutationValue({
        baseValue: 1,
        plant: acorn,
        mutation: { ...gold, verificationState: "unknown" }
      }).ok
    ).toBe(false);
  });

  it("floors the final in-game estimate", () => {
    const aurora = mutationRecords.find((item) => item.name === "Aurora")!;
    const result = calculateMutationValue({ baseValue: 1.005, plant: acorn, mutation: aurora });
    expect(result.ok && result.value).toBe(1);
  });
});
