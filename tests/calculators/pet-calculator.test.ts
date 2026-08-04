import { describe, expect, it } from "vitest";
import { petRecords } from "../../src/data/game/entities";
import { calculatePetValue, PET_CALCULATOR_CONFIG } from "../../src/lib/calculators/pet";

const bunny = petRecords.find((item) => item.name === "Bunny")!;

describe("pet evidence browser", () => {
  it("returns confirmed per-pet facts without a numeric calculation", () => {
    const result = calculatePetValue({ pet: bunny, variant: "big" });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.available).toBe(false);
      expect(result.petName).toBe("Bunny");
      expect(result.ability).toBe("Walk Speed");
      expect(result.estimatedAbilityAmount).toBeNull();
      expect(result.marketValue).toBeNull();
      expect(result.reason).toContain("no universal GAG2 formula");
    }
  });

  it.each(["normal", "big", "mega", "rainbow"] as const)("does not infer a global %s multiplier", (variant) => {
    const result = calculatePetValue({ pet: bunny, variant });
    expect(result.ok && result.available).toBe(false);
    expect(result.ok && result.estimatedAbilityAmount).toBeNull();
  });

  it("rejects unconfirmed or non-per-pet evidence", () => {
    expect(calculatePetValue({ pet: { ...bunny, verificationState: "unknown" }, variant: "normal" }).ok).toBe(false);
    expect(calculatePetValue({ pet: { ...bunny, variantAbilityEvidence: "wrong" as "per_pet_source_row" }, variant: "normal" }).ok).toBe(false);
  });

  it("exposes that calculation is unavailable in the versioned config", () => {
    expect(PET_CALCULATOR_CONFIG.calculationAvailable).toBe(false);
    expect(PET_CALCULATOR_CONFIG.evidenceModel).toBe("per_pet_source_row");
  });
});
