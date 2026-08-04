import { describe, expect, it } from "vitest";
import {
  calculateCropValue,
  calculateEffectiveMutation,
  calculateSizeFactor,
  calculateSizeFromFactor,
  calculateWeightFromValue,
  CORE_CALCULATOR_MAX_INPUT
} from "../../src/lib/calculators/core";

const baseInput = {
  baseValue: 200,
  baseWeight: 1.5,
  weight: 1.5,
  quantity: 1,
  fruitStockMultiplier: 1,
  mutationMultiplier: 1,
  friendCount: 0,
  decayFraction: 0,
  singleHarvest: false
};

describe("Grow a Garden 2 core calculator", () => {
  it("uses the documented weight-to-size formula and floors each item", () => {
    expect(calculateCropValue(baseInput)).toMatchObject({
      ok: true,
      value: 200,
      unitValue: 200,
      size: 1,
      sizeFactor: 1
    });

    const larger = calculateCropValue({ ...baseInput, weight: 3, quantity: 2 });
    expect(larger).toMatchObject({ ok: true, value: 2262, unitValue: 1131, size: 2 });
  });

  it("applies the diminishing-return branch above size 5", () => {
    const factor = calculateSizeFactor(10, 2.5);
    expect(factor).toBeCloseTo(5 ** 2.5 * 2 ** 1.5, 10);
    expect(calculateSizeFromFactor(factor, 2.5)).toBeCloseTo(10, 10);
  });

  it("supports Fruit Stock, friends, decay, and a single selected mutation", () => {
    const result = calculateCropValue({
      ...baseInput,
      fruitStockMultiplier: 2,
      mutationMultiplier: 30,
      friendCount: 2,
      decayFraction: 0.5,
      applyDecayToMutated: true
    });
    expect(result).toMatchObject({
      ok: true,
      value: 8640,
      effectiveMutationMultiplier: 30,
      friendsBonus: 1.2,
      decayPenalty: 0.6,
      mutationDecayExempted: false
    });
  });

  it("uses the wiki decay exemption by default for mutated crops and reports it", () => {
    const result = calculateCropValue({
      ...baseInput,
      mutationMultiplier: 10,
      decayFraction: 1
    });
    expect(result).toMatchObject({
      ok: true,
      value: 2000,
      decayPenalty: 1,
      mutationDecayExempted: true
    });
  });

  it("reduces mutation bonuses for single-harvest crops", () => {
    expect(calculateEffectiveMutation(30, true)).toBe(5.35);
    expect(calculateCropValue({ ...baseInput, mutationMultiplier: 30, singleHarvest: true }))
      .toMatchObject({ ok: true, value: 1070, effectiveMutationMultiplier: 5.35 });
  });

  it("calculates Value to Weight on both sides of the size knee", () => {
    const below = calculateWeightFromValue({
      ...baseInput,
      targetValue: 200,
      quantity: 1
    });
    expect(below).toMatchObject({ ok: true, weight: 1.5, size: 1 });

    const targetFactor = calculateSizeFactor(10, 2.5);
    const above = calculateWeightFromValue({
      ...baseInput,
      targetValue: 200 * targetFactor,
      quantity: 1
    });
    expect(above.ok).toBe(true);
    if (above.ok) expect(above.weight).toBeCloseTo(15, 8);
  });

  it("applies Mushroom's exponent and sell-time multiplier when supplied", () => {
    const result = calculateCropValue({
      ...baseInput,
      baseValue: 13000,
      baseWeight: 5,
      weight: 10,
      sizeExponent: 1.9,
      sellTimeMultiplier: 0.5
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe(Math.floor(13000 * 2 ** 1.9 * 0.5));
  });

  it("validates quantity, stock range, decay, weight, and input ceilings", () => {
    expect(
      calculateCropValue({
        ...baseInput,
        weight: 0,
        quantity: 1.5,
        fruitStockMultiplier: 5,
        decayFraction: -0.1
      })
    ).toEqual({
      ok: false,
      errors: {
        quantity: "Quantity must be a whole number of 1 or more.",
        fruitStockMultiplier: "Fruit Stock multiplier must be between 0.8 and 4.",
        decayFraction: "Decay cannot be negative.",
        weight: "Weight must be greater than 0."
      }
    });

    expect(
      calculateCropValue({ ...baseInput, baseValue: CORE_CALCULATOR_MAX_INPUT + 1 })
    ).toMatchObject({ ok: false, errors: { baseValue: expect.any(String) } });
  });

  it("rejects reverse targets below a documented minimum floor", () => {
    expect(
      calculateWeightFromValue({
        ...baseInput,
        minimumValue: 180,
        targetValue: 100,
        quantity: 1
      })
    ).toEqual({
      ok: false,
      errors: { targetValue: "Target value is below this crop's minimum value for the quantity." }
    });
  });

  it("defensively floors a fractional minimum value", () => {
    expect(
      calculateCropValue({
        ...baseInput,
        weight: 0.01,
        minimumValue: 180.9
      })
    ).toMatchObject({ ok: true, unitValue: 180, value: 180 });
  });
});
