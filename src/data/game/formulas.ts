import type { EntityType } from "./entities";

export type FormulaKind = "crop_value" | "trade_total" | "mutation_value" | "pet_weight" | "pet_value";
export type FormulaImplementationId =
  | "calculateCropValue"
  | "calculateTradeComparison"
  | "calculateMutationValue"
  | "calculatePetWeight"
  | "calculatePetValue";

export type FormulaParameter = { name: string; unit: string; required: boolean; min?: number; max?: number };
export type FormulaRecord = {
  id: string;
  formulaVersion: string;
  gameVersion: string | "unknown";
  formulaKind: FormulaKind;
  implementationId: FormulaImplementationId;
  displayExpression: string;
  parameters: FormulaParameter[];
  rounding: { mode: "half_up" | "floor" | "ceil"; decimals: number };
  fairRange?: { lowerRatio: number; upperRatio: number };
  compatibleEntityTypes: EntityType[];
  compatibilityRules: Array<{ leftId: string; rightId: string; allowed: boolean }>;
  evidenceIds: string[];
  goldenExamples: Array<{ id: string; inputs: Record<string, number | string>; expected: number; tolerance: number }>;
};

const gameVersion = "GAG2-live-2026-08-03";

/**
 * This describes the current supported calculator model, not an invented
 * game API. One crop can carry exactly one selected mutation.
 */
export const formulaRecords: FormulaRecord[] = [
  {
    id: "gag2-crop-value-r6865",
    formulaVersion: "fandom-mechanics-r6865",
    gameVersion,
    formulaKind: "crop_value",
    implementationId: "calculateCropValue",
    displayExpression: "floor(baseSellValue × sizeFactor × fruitStock × effectiveMutation × decayPenalty × friendsBonus × sellTimeMultiplier)",
    parameters: [
      { name: "baseSellValue", unit: "Sheckles", required: true, min: 0 },
      { name: "baseWeightKg", unit: "kg", required: true, min: 0 },
      { name: "weightKg", unit: "kg", required: true, min: 0 },
      { name: "fruitStockMultiplier", unit: "multiplier", required: true, min: 0.8, max: 4 },
      { name: "mutationMultiplier", unit: "multiplier", required: true, min: 1 },
      { name: "friendCount", unit: "players", required: true, min: 0 },
      { name: "decayFraction", unit: "fraction", required: true, min: 0, max: 1 }
    ],
    rounding: { mode: "floor", decimals: 0 },
    compatibleEntityTypes: ["plant", "mutation"],
    compatibilityRules: [{ leftId: "plant-*", rightId: "mutation-*", allowed: true }],
    evidenceIds: ["fandom-mechanics-r6865", "fandom-mutations-r6848"],
    goldenExamples: [
      { id: "average-weight-no-modifiers", inputs: { baseSellValue: 200, baseWeightKg: 1.5, weightKg: 1.5, fruitStockMultiplier: 1, mutationMultiplier: 1, friendCount: 0, decayFraction: 0 }, expected: 200, tolerance: 0 },
      { id: "two-times-size-default-exponent", inputs: { baseSellValue: 200, baseWeightKg: 1.5, weightKg: 3, fruitStockMultiplier: 1, mutationMultiplier: 1, friendCount: 0, decayFraction: 0 }, expected: 1131, tolerance: 0 },
      { id: "single-harvest-gold-effective-mutation", inputs: { baseSellValue: 200, baseWeightKg: 1, weightKg: 1, rawMutationMultiplier: 10, singleHarvest: "true" }, expected: 470, tolerance: 0 }
    ]
  }
];

export const formulas = formulaRecords;
