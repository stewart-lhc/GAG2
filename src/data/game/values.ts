import { gearRecords, plantRecords, seedRecords } from "./entities";
import type { VerificationState } from "./entities";

/** `relative_trade_value` is intentionally not a Sheckle amount. */
export type ValueType = "base_value" | "trade_value" | "relative_trade_value" | "weight" | "price";

export type ValueObservation = {
  entityId: string;
  valueType: ValueType;
  value: number;
  unit?: string;
  evidenceIds: string[];
  verificationState: VerificationState;
  verifiedAt: string;
  gameVersion: string | "unknown";
};

const source = ["fandom-crop-data-r6906"];
const verifiedAt = "2026-08-04T00:00:00.000Z";
const gameVersion = "GAG2-live-2026-08-03";

/**
 * Base sell values and weights are two separate observations so consumers
 * cannot silently use a trade figure as an in-game Sheckle value.
 */
export const valueObservations: ValueObservation[] = plantRecords.flatMap((plant) => [
  {
    entityId: plant.id,
    valueType: "base_value" as const,
    value: plant.baseSellValue,
    unit: "Sheckles",
    evidenceIds: [...source],
    verificationState: "confirmed" as const,
    verifiedAt,
    gameVersion
  },
  {
    entityId: plant.id,
    valueType: "weight" as const,
    value: plant.baseWeightKg,
    unit: "kg",
    evidenceIds: [...source],
    verificationState: "confirmed" as const,
    verifiedAt,
    gameVersion
  }
]);

const seedTradeValues: ReadonlyArray<readonly [number, string]> = [
  [120, "Atlantic Giant Pumpkin"], [115, "Star Fruit"], [36, "Dragon's Breath"], [34, "Poison Ivy"], [33, "Ghost Pepper"], [32, "Sun Bloom"], [17, "Hypno Bloom"], [14, "Moon Bloom"], [6.1, "Horned Melon"], [6, "Venom Spitter"], [3.7, "Venus Fly Trap"], [3.5, "Poison Apple"], [3, "Pomegranate"], [2.7, "Glow Mushroom"], [2.5, "Acorn"], [2.2, "Mango"], [2.2, "Fire Fern"], [2.1, "Cherry"], [2.1, "Rainbow"], [2, "Mega"], [1.9, "Baby Cactus"], [1.3, "Banana"], [1.1, "Sunflower"], [1, "Gold"], [0.6, "Rocket Pop"]
];
const gearTradeValues: ReadonlyArray<readonly [number, string]> = [[4.2, "Super Watering Can"], [2.5, "Super Sprinkler"], [1.7, "Legendary Sprinkler"]];

function relativeObservations(
  items: readonly { id: string; name: string }[],
  data: ReadonlyArray<readonly [number, string]>,
  evidenceIds: string[]
): ValueObservation[] {
  return data.map(([value, name]) => {
    const entity = items.find((item) => item.name === name);
    if (!entity) throw new Error(`Missing relative-trade entity for ${name}.`);
    return { entityId: entity.id, valueType: "relative_trade_value", value, unit: "relative", evidenceIds, verificationState: "confirmed", verifiedAt, gameVersion };
  });
}

/** Dated, relative completed-trade observations; never feed the crop Sheckles calculator. */
export const relativeTradeValueObservations: ValueObservation[] = [
  ...relativeObservations(seedRecords, seedTradeValues, ["gag2gg-methodology-2026-08-03", "gag2gg-seed-values-2026-08-03"]),
  ...relativeObservations(gearRecords, gearTradeValues, ["gag2gg-methodology-2026-08-03", "gag2gg-gear-values-2026-08-03"])
];
export const values = [...valueObservations, ...relativeTradeValueObservations];
