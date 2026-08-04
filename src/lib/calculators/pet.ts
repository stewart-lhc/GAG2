import type { PetRecord } from "@/data/game/entities";

export const PET_CALCULATOR_IMPLEMENTATION_ID = "calculatePetValue";
export const PET_CALCULATOR_FORMULA_VERSION = "pet-per-row-evidence-v3";
export type PetVariant = "normal" | "big" | "mega" | "rainbow";

export type PetCalculatorInput = {
  pet: Pick<PetRecord, "id" | "name" | "rarity" | "baselineAbility" | "variantAbilityEvidence" | "verificationState" | "sourceUrl">;
  variant: PetVariant;
};

export type PetCalculatorResult =
  | {
      ok: true;
      available: false;
      petName: string;
      rarity: string;
      ability: string;
      variant: PetVariant;
      marketValue: null;
      estimatedAbilityAmount: null;
      reason: string;
      formulaVersion: string;
      sourceUrl: string;
    }
  | { ok: false; available: false; errors: Partial<Record<"pet" | "variant", string>>; formulaVersion: string };

export const PET_CALCULATOR_CONFIG = {
  formulaVersion: PET_CALCULATOR_FORMULA_VERSION,
  calculationAvailable: false as const,
  evidenceModel: "per_pet_source_row" as const
};
export const petCalculatorConfig = PET_CALCULATOR_CONFIG;
export const PET_FORMULA_CONFIG = PET_CALCULATOR_CONFIG;

/**
 * The current source records variant facts per pet and includes non-linear
 * rows. Therefore this function reports the selected evidence context but
 * deliberately does not derive a numeric ability, weight, or market value.
 */
export function calculatePetValue(input: PetCalculatorInput): PetCalculatorResult {
  const errors: Partial<Record<"pet" | "variant", string>> = {};
  if (!input.pet || input.pet.verificationState !== "confirmed" || input.pet.variantAbilityEvidence !== "per_pet_source_row") {
    errors.pet = "Choose a confirmed GAG2 pet with per-pet variant evidence.";
  }
  if (!(["normal", "big", "mega", "rainbow"] as const).includes(input.variant)) {
    errors.variant = "Choose Normal, Big, Mega, or Rainbow.";
  }
  if (Object.keys(errors).length) {
    return { ok: false, available: false, errors, formulaVersion: PET_CALCULATOR_FORMULA_VERSION };
  }
  return {
    ok: true,
    available: false,
    petName: input.pet.name,
    rarity: input.pet.rarity,
    ability: input.pet.baselineAbility,
    variant: input.variant,
    marketValue: null,
    estimatedAbilityAmount: null,
    reason: "Numeric calculation unavailable: variant effects are recorded per pet and no universal GAG2 formula is verified.",
    formulaVersion: PET_CALCULATOR_FORMULA_VERSION,
    sourceUrl: input.pet.sourceUrl
  };
}

export const calculatePetEstimate = calculatePetValue;
