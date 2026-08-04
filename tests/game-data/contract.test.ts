import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import {
  getSelectableMutations,
  getSelectablePlants,
  mutationRecords,
  petRecords,
  plantRecords,
  unverifiedEntityFixture
} from "../../src/data/game/entities";
import { evidenceRecords } from "../../src/data/game/evidence";
import { formulaRecords } from "../../src/data/game/formulas";
import { gameDataLedger, gameDataManifest, getSelectableEntities } from "../../src/data/game/manifest";
import { restockCycleRecords } from "../../src/data/game/restock-cycles";
import { gearShopRecords, seedShopRecords, shopObservations } from "../../src/data/game/shop";
import { relativeTradeValueObservations, valueObservations } from "../../src/data/game/values";
import { assertValidGameDataContract, validateGameDataContract } from "../../src/lib/game-data/validate";

describe("GAG2 game-data contract", () => {
  it("admits a sourced, selectable calculator set of at least 35 plants", () => {
    expect(getSelectablePlants()).toHaveLength(44);
    expect(getSelectablePlants().every((plant) => plant.category === "main_world")).toBe(true);
    expect(getSelectablePlants().every((plant) => plant.evidenceIds.length > 0 && plant.sourceUrl.startsWith("https://"))).toBe(true);
    expect(getSelectablePlants().every((plant) => plant.baseSellValue > 0 && plant.baseWeightKg > 0)).toBe(true);
  });

  it("has unique IDs and evidence for every published entity", () => {
    const ids = gameDataLedger.entities.map((entity) => entity.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    expect(duplicateIds).toEqual([]);
    expect(new Set(ids).size).toBe(ids.length);
    const evidenceIds = new Set(evidenceRecords.map((evidence) => evidence.id));
    expect(gameDataLedger.entities.filter((entity) => entity !== unverifiedEntityFixture).every((entity) => entity.evidenceIds.every((id) => evidenceIds.has(id)))).toBe(true);
    expect(validateGameDataContract()).toEqual([]);
    expect(() => assertValidGameDataContract()).not.toThrow();
  });

  it("keeps fixtures outside selectable and default calculator data", () => {
    expect(getSelectableEntities().map((entity) => entity.id)).not.toContain(unverifiedEntityFixture.id);
    expect(gameDataManifest.entries.find((entry) => entry.entityId === unverifiedEntityFixture.id)).toMatchObject({ selectable: false, defaultCalculationEligible: false });
  });

  it("matches documented crop exceptions and only applies an explicitly sourced minimum", () => {
    for (const name of ["Carrot", "Tulip", "Mushroom", "Bamboo"]) {
      expect(plantRecords.find((plant) => plant.name === name)?.harvestType).toBe("single");
    }
    expect(plantRecords.find((plant) => plant.name === "Carrot")?.minimumSellValue).toBe(4);
    expect(plantRecords.filter((plant) => plant.minimumSellValue !== undefined).map((plant) => plant.name)).toEqual(["Carrot"]);
    expect(plantRecords.find((plant) => plant.name === "Mushroom")).toMatchObject({ sizeExponentOverride: 1.9, sellTimeMultiplier: 0.5 });
    expect(plantRecords.find((plant) => plant.name === "Bamboo")?.sizeExponentOverride).toBe(1.75);
  });

  it("allows one released mutation selection and excludes unreleased names", () => {
    expect(getSelectableMutations()).toHaveLength(13);
    expect(mutationRecords.every((mutation) => mutation.stacking === "single_choice")).toBe(true);
    expect(getSelectableMutations().find((mutation) => mutation.name === "Glow")?.multiplier).toBe(100);
    expect(getSelectableMutations().map((mutation) => mutation.name)).not.toEqual(expect.arrayContaining(["Secret", "Solarflare", "Pizza", "Chained"]));
  });

  it("does not publish a universal pet age, weight, or ability-price formula", () => {
    expect(petRecords.length).toBeGreaterThanOrEqual(14);
    expect(petRecords.map((pet) => pet.name)).toEqual(expect.arrayContaining(["Raccoon", "Ice Serpent", "Bear", "Bee", "Black Dragon"]));
    expect(petRecords.every((pet) => pet.variantAbilityEvidence === "per_pet_source_row")).toBe(true);
    expect(formulaRecords.some((formula) => formula.formulaKind === "pet_weight" || formula.formulaKind === "pet_value")).toBe(false);
  });

  it("locks formula constants and globally aligned restock intervals", () => {
    const formula = formulaRecords[0];
    expect(formula?.rounding).toEqual({ mode: "floor", decimals: 0 });
    expect(formula?.parameters.find((parameter) => parameter.name === "fruitStockMultiplier")).toMatchObject({ min: 0.8, max: 4 });
    expect(formula?.goldenExamples.find((example) => example.id === "two-times-size-default-exponent")?.expected).toBe(1131);
    expect(restockCycleRecords.map((cycle) => cycle.intervalSeconds)).toEqual([300, 300, 600]);
    expect(restockCycleRecords.every((cycle) => cycle.timezone === "UTC" && cycle.serverBasis.includes("Globally aligned"))).toBe(true);
  });

  it("keeps real trade observations in a separate, non-Sheckles unit", () => {
    expect(relativeTradeValueObservations).toHaveLength(28);
    expect(relativeTradeValueObservations.every((value) => value.valueType === "relative_trade_value" && value.unit === "relative")).toBe(true);
    expect(relativeTradeValueObservations.find((value) => value.value === 120)).toMatchObject({ valueType: "relative_trade_value", unit: "relative" });
    expect(valueObservations.every((value) => value.valueType !== "relative_trade_value")).toBe(true);
  });

  it("publishes seed and gear shop numbers only through the revisioned shop ledger", () => {
    expect(seedShopRecords).toHaveLength(31);
    expect(seedShopRecords.find((record) => record.name === "Moon Bloom")).toMatchObject({ price: 85000000, currency: "Sheckles", restockChance: "0.35% (7/2,000)" });
    expect(gearShopRecords).toHaveLength(33);
    expect(gearShopRecords.find((record) => record.name === "Super Sprinkler")).toMatchObject({ price: 3000000, currency: "Sheckles", restockChance: "1.2%" });
    expect(shopObservations.every((record) => record.evidenceIds.length > 0 && record.verificationState === "confirmed" && record.gameVersion !== "unknown")).toBe(true);
  });

  it("keeps the public seed and gear components as ledger consumers, not secondary data stores", () => {
    const seedsPage = readFileSync(new URL("../../src/app/grow-a-garden-2-seeds/page.tsx", import.meta.url), "utf8");
    const gearPage = readFileSync(new URL("../../src/app/grow-a-garden-2-gear/page.tsx", import.meta.url), "utf8");
    expect(seedsPage).toContain('import { seedShopRecords } from "@/data/game/shop"');
    expect(gearPage).toContain('import { gearShopRecords } from "@/data/game/shop"');
    expect(seedsPage).not.toContain("const seedCosts");
    expect(gearPage).not.toContain("const gear =");
  });
});
