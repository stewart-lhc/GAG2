import type { MutationRecord, PlantRecord } from "@/data/game/entities";
import { calculateEffectiveMutation } from "@/lib/calculators/core";

export const MUTATION_CALCULATOR_IMPLEMENTATION_ID = "calculateMutationValue";
export const MUTATION_CALCULATOR_FORMULA_VERSION = "mutation-single-choice-harvest-v3";
export const MUTATION_CALCULATOR_MAX_INPUT = 1_000_000_000_000;
export const MUTATION_CALCULATOR_MAX_RESULT = 1_000_000_000_000_000;

export type MutationCalculatorInput = {
  baseValue: number;
  plant: Pick<
    PlantRecord,
    "id" | "name" | "harvestType" | "verificationState" | "sourceUrl"
  >;
  mutation: Pick<
    MutationRecord,
    "id" | "name" | "multiplier" | "stacking" | "verificationState" | "sourceUrl"
  >;
};

export type MutationCalculatorResult =
  | {
      ok: true;
      baseValue: number;
      plantId: string;
      plantName: string;
      harvestType: PlantRecord["harvestType"];
      mutationId: string;
      mutationName: string;
      rawMultiplier: number;
      effectiveMultiplier: number;
      value: number;
      formulaVersion: string;
      sourceUrls: string[];
    }
  | {
      ok: false;
      errors: Partial<Record<"baseValue" | "plant" | "mutation" | "result", string>>;
      formulaVersion: string;
    };

export const MUTATION_CALCULATOR_CONFIG = {
  formulaVersion: MUTATION_CALCULATOR_FORMULA_VERSION,
  rounding: { mode: "floor" as const, decimals: 0 },
  maxInput: MUTATION_CALCULATOR_MAX_INPUT,
  maxResult: MUTATION_CALCULATOR_MAX_RESULT
};
export const mutationCalculatorConfig = MUTATION_CALCULATOR_CONFIG;
export const MUTATION_FORMULA_CONFIG = MUTATION_CALCULATOR_CONFIG;

export function calculateMutationValue(input: MutationCalculatorInput): MutationCalculatorResult {
  const errors: Partial<Record<"baseValue" | "plant" | "mutation" | "result", string>> = {};
  if (
    !Number.isFinite(input.baseValue) ||
    input.baseValue < 0 ||
    input.baseValue > MUTATION_CALCULATOR_MAX_INPUT
  ) {
    errors.baseValue = `Base value must be from 0 to ${MUTATION_CALCULATOR_MAX_INPUT.toLocaleString()}.`;
  }

  const plant = input.plant;
  if (
    !plant ||
    plant.verificationState !== "confirmed" ||
    !(["single", "multi"] as const).includes(plant.harvestType)
  ) {
    errors.plant = "Choose one confirmed GAG2 plant with a documented harvest type.";
  }

  const mutation = input.mutation;
  if (
    !mutation ||
    mutation.verificationState !== "confirmed" ||
    mutation.stacking !== "single_choice" ||
    !Number.isFinite(mutation.multiplier) ||
    mutation.multiplier < 1
  ) {
    errors.mutation = "Choose one confirmed GAG2 mutation.";
  }

  const effectiveMultiplier = calculateEffectiveMutation(
    mutation?.multiplier ?? Number.NaN,
    plant?.harvestType === "single"
  );
  const raw = input.baseValue * effectiveMultiplier;
  if (
    !errors.baseValue &&
    !errors.plant &&
    !errors.mutation &&
    (!Number.isFinite(raw) || raw > MUTATION_CALCULATOR_MAX_RESULT)
  ) {
    errors.result = `Result must be ${MUTATION_CALCULATOR_MAX_RESULT.toLocaleString()} or less.`;
  }
  if (Object.keys(errors).length) {
    return { ok: false, errors, formulaVersion: MUTATION_CALCULATOR_FORMULA_VERSION };
  }

  return {
    ok: true,
    baseValue: input.baseValue,
    plantId: plant.id,
    plantName: plant.name,
    harvestType: plant.harvestType,
    mutationId: mutation.id,
    mutationName: mutation.name,
    rawMultiplier: mutation.multiplier,
    effectiveMultiplier,
    value: Math.floor(raw),
    formulaVersion: MUTATION_CALCULATOR_FORMULA_VERSION,
    sourceUrls: Array.from(new Set([plant.sourceUrl, mutation.sourceUrl]))
  };
}

export const calculateMutationEstimate = calculateMutationValue;

export function formatMutationValue(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}
