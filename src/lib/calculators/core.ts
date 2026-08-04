export const CORE_CALCULATOR_IMPLEMENTATION_ID = "calculateCropValue";
export const CORE_CALCULATOR_FORMULA_VERSION = "gag2-mechanics-r6865-2026-08-02";
export const CORE_CALCULATOR_DATA_VERSION = "gag2-fandom-r6906-2026-08-03";
export const CORE_CALCULATOR_MAX_INPUT = 1_000_000_000;
export const CORE_CALCULATOR_MAX_RESULT = 1_000_000_000_000_000;

export type CoreCalculatorInput = {
  baseValue: number;
  baseWeight: number;
  weight: number;
  quantity: number;
  fruitStockMultiplier: number;
  mutationMultiplier: number;
  friendCount: number;
  decayFraction: number;
  singleHarvest: boolean;
  sizeExponent?: number;
  sizeMultiplier?: number;
  sellTimeMultiplier?: number;
  minimumValue?: number;
  applyDecayToMutated?: boolean;
};

export type ReverseWeightInput = Omit<CoreCalculatorInput, "weight"> & {
  targetValue: number;
};

export type CoreCalculatorField =
  | "baseValue"
  | "baseWeight"
  | "weight"
  | "targetValue"
  | "quantity"
  | "fruitStockMultiplier"
  | "mutationMultiplier"
  | "friendCount"
  | "decayFraction"
  | "sizeExponent"
  | "sizeMultiplier"
  | "sellTimeMultiplier"
  | "minimumValue";

export type CoreCalculatorValidation = {
  valid: boolean;
  errors: Partial<Record<CoreCalculatorField | "result", string>>;
};

export type CropValueResult =
  | {
      ok: true;
      value: number;
      unitValue: number;
      rawUnitValue: number;
      size: number;
      sizeFactor: number;
      effectiveMutationMultiplier: number;
      friendsBonus: number;
      decayPenalty: number;
      mutationDecayExempted: boolean;
    }
  | { ok: false; errors: CoreCalculatorValidation["errors"] };

export type WeightFromValueResult =
  | {
      ok: true;
      weight: number;
      size: number;
      targetUnitValue: number;
      requiredSizeFactor: number;
      effectiveMutationMultiplier: number;
      friendsBonus: number;
      decayPenalty: number;
      mutationDecayExempted: boolean;
    }
  | { ok: false; errors: CoreCalculatorValidation["errors"] };

const DEFAULT_EXPONENT = 2.5;
const DEFAULT_KNEE = 5;
const DEFAULT_TAIL_EXPONENT = 1.5;

const fieldLabels: Record<CoreCalculatorField, string> = {
  baseValue: "Base value",
  baseWeight: "Base weight",
  weight: "Weight",
  targetValue: "Target value",
  quantity: "Quantity",
  fruitStockMultiplier: "Fruit Stock multiplier",
  mutationMultiplier: "Mutation multiplier",
  friendCount: "Friends in server",
  decayFraction: "Decay",
  sizeExponent: "Size exponent",
  sizeMultiplier: "Size multiplier",
  sellTimeMultiplier: "Sell-time multiplier",
  minimumValue: "Minimum value"
};

function finiteError(field: CoreCalculatorField, value: number) {
  if (!Number.isFinite(value)) return `${fieldLabels[field]} must be a number.`;
  if (value < 0) return `${fieldLabels[field]} cannot be negative.`;
  if (value > CORE_CALCULATOR_MAX_INPUT) {
    return `${fieldLabels[field]} must be ${CORE_CALCULATOR_MAX_INPUT.toLocaleString()} or less.`;
  }
  return undefined;
}

function validateShared(input: Omit<CoreCalculatorInput, "weight">) {
  const errors: CoreCalculatorValidation["errors"] = {};
  const numericFields: Array<[CoreCalculatorField, number]> = [
    ["baseValue", input.baseValue],
    ["baseWeight", input.baseWeight],
    ["quantity", input.quantity],
    ["fruitStockMultiplier", input.fruitStockMultiplier],
    ["mutationMultiplier", input.mutationMultiplier],
    ["friendCount", input.friendCount],
    ["decayFraction", input.decayFraction],
    ["sizeExponent", input.sizeExponent ?? DEFAULT_EXPONENT],
    ["sizeMultiplier", input.sizeMultiplier ?? 1],
    ["sellTimeMultiplier", input.sellTimeMultiplier ?? 1],
    ["minimumValue", input.minimumValue ?? 0]
  ];

  for (const [field, value] of numericFields) {
    const error = finiteError(field, value);
    if (error) errors[field] = error;
  }

  if (input.baseValue <= 0 && !errors.baseValue) errors.baseValue = "Base value must be greater than 0.";
  if (input.baseWeight <= 0 && !errors.baseWeight) errors.baseWeight = "Base weight must be greater than 0.";
  if ((!Number.isInteger(input.quantity) || input.quantity < 1) && !errors.quantity) {
    errors.quantity = "Quantity must be a whole number of 1 or more.";
  }
  if ((!Number.isInteger(input.friendCount) || input.friendCount < 0) && !errors.friendCount) {
    errors.friendCount = "Friends in server must be a whole number of 0 or more.";
  }
  if (
    (input.fruitStockMultiplier < 0.8 || input.fruitStockMultiplier > 4) &&
    !errors.fruitStockMultiplier
  ) {
    errors.fruitStockMultiplier = "Fruit Stock multiplier must be between 0.8 and 4.";
  }
  if (input.mutationMultiplier < 1 && !errors.mutationMultiplier) {
    errors.mutationMultiplier = "Mutation multiplier must be 1 or more.";
  }
  if ((input.decayFraction < 0 || input.decayFraction > 1) && !errors.decayFraction) {
    errors.decayFraction = "Decay must be between 0% and 100%.";
  }
  if ((input.sizeExponent ?? DEFAULT_EXPONENT) <= 0 && !errors.sizeExponent) {
    errors.sizeExponent = "Size exponent must be greater than 0.";
  }
  if ((input.sizeMultiplier ?? 1) <= 0 && !errors.sizeMultiplier) {
    errors.sizeMultiplier = "Size multiplier must be greater than 0.";
  }
  if ((input.sellTimeMultiplier ?? 1) <= 0 && !errors.sellTimeMultiplier) {
    errors.sellTimeMultiplier = "Sell-time multiplier must be greater than 0.";
  }

  return errors;
}

export function calculateSizeFactor(
  size: number,
  exponent = DEFAULT_EXPONENT,
  knee = DEFAULT_KNEE,
  tailExponent = DEFAULT_TAIL_EXPONENT
) {
  if (size <= knee) return size ** exponent;
  return knee ** exponent * (size / knee) ** Math.min(tailExponent, exponent);
}

export function calculateSizeFromFactor(
  factor: number,
  exponent = DEFAULT_EXPONENT,
  knee = DEFAULT_KNEE,
  tailExponent = DEFAULT_TAIL_EXPONENT
) {
  const kneeFactor = knee ** exponent;
  if (factor <= kneeFactor) return factor ** (1 / exponent);
  return knee * (factor / kneeFactor) ** (1 / Math.min(tailExponent, exponent));
}

export function calculateEffectiveMutation(multiplier: number, singleHarvest: boolean) {
  if (!singleHarvest) return multiplier;

  // Normalize the documented decimal formula so UI/API consumers receive 2.35,
  // not the binary floating-point artifact 2.3499999999999996.
  return Number((1 + (multiplier - 1) * 0.15).toFixed(12));
}

function modifiers(input: Omit<CoreCalculatorInput, "weight">) {
  const effectiveMutationMultiplier = calculateEffectiveMutation(
    input.mutationMultiplier,
    input.singleHarvest
  );
  const mutationDecayExempted =
    input.mutationMultiplier > 1 && input.decayFraction > 0 && !input.applyDecayToMutated;
  const effectiveDecayFraction = mutationDecayExempted ? 0 : input.decayFraction;
  return {
    effectiveMutationMultiplier,
    friendsBonus: 1 + input.friendCount * 0.1,
    decayPenalty: 1 - Math.min(1, Math.max(0, effectiveDecayFraction)) * 0.8,
    mutationDecayExempted
  };
}

export function validateCoreCalculatorInput(input: CoreCalculatorInput): CoreCalculatorValidation {
  const errors = validateShared(input);
  const weightError = finiteError("weight", input.weight);
  if (weightError) errors.weight = weightError;
  else if (input.weight <= 0) errors.weight = "Weight must be greater than 0.";
  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateCropValue(input: CoreCalculatorInput): CropValueResult {
  const validation = validateCoreCalculatorInput(input);
  if (!validation.valid) return { ok: false, errors: validation.errors };

  const size = input.weight / input.baseWeight;
  const sizeFactor = calculateSizeFactor(size, input.sizeExponent ?? DEFAULT_EXPONENT);
  const computedModifiers = modifiers(input);
  const rawUnitValue =
    input.baseValue *
    sizeFactor *
    (input.sizeMultiplier ?? 1) *
    computedModifiers.effectiveMutationMultiplier *
    computedModifiers.decayPenalty *
    computedModifiers.friendsBonus *
    input.fruitStockMultiplier *
    (input.sellTimeMultiplier ?? 1);
  const unitValue = Math.max(Math.floor(input.minimumValue ?? 0), Math.floor(rawUnitValue));
  const value = unitValue * input.quantity;

  if (!Number.isFinite(value) || value > CORE_CALCULATOR_MAX_RESULT) {
    return {
      ok: false,
      errors: { result: `Estimate must be ${CORE_CALCULATOR_MAX_RESULT.toLocaleString()} or less.` }
    };
  }

  return {
    ok: true,
    value,
    unitValue,
    rawUnitValue,
    size,
    sizeFactor,
    ...computedModifiers
  };
}

export function calculateWeightFromValue(input: ReverseWeightInput): WeightFromValueResult {
  const errors = validateShared(input);
  const targetError = finiteError("targetValue", input.targetValue);
  if (targetError) errors.targetValue = targetError;
  else if (input.targetValue <= 0) errors.targetValue = "Target value must be greater than 0.";
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const targetUnitValue = input.targetValue / input.quantity;
  if (targetUnitValue < (input.minimumValue ?? 0)) {
    return {
      ok: false,
      errors: { targetValue: "Target value is below this crop's minimum value for the quantity." }
    };
  }

  const computedModifiers = modifiers(input);
  const factorDenominator =
    input.baseValue *
    (input.sizeMultiplier ?? 1) *
    computedModifiers.effectiveMutationMultiplier *
    computedModifiers.decayPenalty *
    computedModifiers.friendsBonus *
    input.fruitStockMultiplier *
    (input.sellTimeMultiplier ?? 1);
  const requiredSizeFactor = targetUnitValue / factorDenominator;
  const size = calculateSizeFromFactor(requiredSizeFactor, input.sizeExponent ?? DEFAULT_EXPONENT);
  const weight = size * input.baseWeight;

  if (!Number.isFinite(weight) || weight > CORE_CALCULATOR_MAX_INPUT) {
    return {
      ok: false,
      errors: { result: `Required weight must be ${CORE_CALCULATOR_MAX_INPUT.toLocaleString()} kg or less.` }
    };
  }

  return {
    ok: true,
    weight,
    size,
    targetUnitValue,
    requiredSizeFactor,
    ...computedModifiers
  };
}

export function formatCropValue(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

export function formatWeight(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(value);
}
