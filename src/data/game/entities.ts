/**
 * Auditable, source-attributed GAG2 entity contract.  Numbers remain in
 * values.ts; this file deliberately carries the fields a calculator needs to
 * identify an in-game entity without treating an unsourced name as real data.
 */
export type VerificationState = "confirmed" | "estimated" | "unknown" | "stale";

export type EntityType = "plant" | "seed" | "fruit" | "pet" | "gear" | "mutation";
export type HarvestType = "single" | "multi";

export type EntityRecord = {
  id: string;
  entityType: EntityType;
  name: string;
  aliases: string[];
  evidenceIds: string[];
  verificationState: VerificationState;
  sourceUrl: string;
};

export type PlantRecord = EntityRecord & {
  entityType: "plant";
  /** `main_world` excludes the Fandom module's Leaf-currency crops. */
  category: "main_world";
  /** Kept explicit when the crop module does not establish a rarity. */
  rarity: "unknown";
  harvestType: HarvestType;
  multiHarvest: boolean;
  baseWeightKg: number;
  baseSellValue: number;
  primeTimeSeconds: number;
  minWeightKg: number;
  priceFloorWeightKg: number;
  /**
   * Optional only when a source explicitly gives this crop's final minimum
   * sell value. Absence means the reverse calculator must not impose a floor.
   */
  minimumSellValue?: number;
  sizeExponentOverride?: number;
  sellTimeMultiplier?: number;
};

export type MutationRecord = EntityRecord & {
  entityType: "mutation";
  multiplier: number;
  selectable: boolean;
  stacking: "single_choice";
};

/** A tradable item is intentionally separate from crop base sell values. */
export type TradeItemRecord = EntityRecord & {
  entityType: "seed" | "gear";
  tradeCategory: "seed" | "gear";
  tradeValueUnit: "relative";
};

export type PetRecord = EntityRecord & {
  entityType: "pet";
  rarity: string;
  baselineAbility: string;
  /**
   * The source has per-pet variant rows (including non-linear rows), so this
   * is deliberately not a universal numeric ability or trade-value formula.
   */
  variantAbilityEvidence: "per_pet_source_row";
};

const cropSourceUrl = "https://growagarden2.fandom.com/wiki/Module:Crop_Data?oldid=6906";
const cropEvidenceIds = ["fandom-crop-data-r6906"];

type CropSeed = readonly [
  id: string,
  name: string,
  baseWeightKg: number,
  baseSellValue: number,
  primeTimeSeconds: number,
  harvestType: HarvestType
];

/**
 * The Crop Data module supplies average weight/value and prime duration.  It
 * does not publish rarities, so `rarity` is intentionally `unknown`, not a
 * guessed tier.  Leaf-currency crops and rows with nil values are excluded.
 */
const cropSeeds: readonly CropSeed[] = [
  ["acorn", "Acorn", 1.5, 200, 600, "multi"],
  ["apple", "Apple", 1.5, 12, 180, "multi"],
  ["atlantic-giant-pumpkin", "Atlantic Giant Pumpkin", 7.5, 300000, 1800, "multi"],
  ["baby-cactus", "Baby Cactus", 1.5, 70, 240, "multi"],
  ["bamboo", "Bamboo", 4, 800, 120, "single"],
  ["banana", "Banana", 1.5, 35, 240, "multi"],
  ["blueberry", "Blueberry", 1.15, 5, 90, "multi"],
  ["briar-rose", "Briar Rose", 9, 6500, 240, "multi"],
  ["cactus", "Cactus", 1.5, 40, 240, "multi"],
  ["carrot", "Carrot", 0.8, 5, 60, "single"],
  ["cherry", "Cherry", 1.5, 350, 660, "multi"],
  ["coconut", "Coconut", 1.5, 60, 480, "multi"],
  ["corn", "Corn", 3, 34, 240, "multi"],
  ["dragon-fruit", "Dragon Fruit", 3, 150, 480, "multi"],
  ["dragons-breath", "Dragon's Breath", 7.5, 3400, 240, "multi"],
  ["eclipse-bloom", "Eclipse Bloom", 9, 12000, 240, "multi"],
  ["fire-fern", "Fire Fern", 9, 900, 240, "multi"],
  ["ghost-pepper", "Ghost Pepper", 7.5, 2500, 1800, "multi"],
  ["glow-mushroom", "Glow Mushroom", 7, 700, 240, "multi"],
  ["grape", "Grape", 2, 45, 420, "multi"],
  ["green-bean", "Green Bean", 0.5, 10, 360, "multi"],
  ["horned-melon", "Horned Melon", 1.125, 200, 240, "multi"],
  ["hypno-bloom", "Hypno Bloom", 9, 9500, 240, "multi"],
  ["mango", "Mango", 3, 90, 480, "multi"],
  ["moon-bloom", "Moon Bloom", 9, 8500, 240, "multi"],
  ["mushroom", "Mushroom", 5, 13000, 360, "single"],
  ["pineapple", "Pineapple", 5, 30, 300, "multi"],
  ["poison-apple", "Poison Apple", 2.25, 900, 1800, "multi"],
  ["poison-ivy", "Poison Ivy", 2.1, 1700, 1800, "multi"],
  ["pomegranate", "Pomegranate", 1.5, 900, 1200, "multi"],
  ["rocket-pop", "Rocket Pop", 0.8, 22500, 60, "multi"],
  ["star-fruit", "Star Fruit", 9, 6000, 240, "multi"],
  ["strawberry", "Strawberry", 1, 3, 90, "multi"],
  ["sun-bloom", "Sun Bloom", 9, 9000, 240, "multi"],
  ["sunflower", "Sunflower", 6, 1750, 720, "multi"],
  ["tomato", "Tomato", 0.9, 9, 120, "multi"],
  ["tulip", "Tulip", 0.5, 60, 60, "single"],
  ["venom-spitter", "Venom Spitter", 9, 3800, 240, "multi"],
  ["venus-fly-trap", "Venus Fly Trap", 3, 3000, 900, "multi"],
  ["potato", "Potato", 1.125, 300, 240, "multi"],
  ["plum", "Plum", 9, 4800, 240, "multi"],
  ["romanesco", "Romanesco", 1.5, 10000, 240, "multi"],
  ["cinnamon-stick", "Cinnamon Stick", 9, 1200, 240, "multi"],
  ["conifer-cone", "Conifer Cone", 9, 2000, 240, "multi"]
];

export const plantRecords: PlantRecord[] = cropSeeds.map(
  ([id, name, baseWeightKg, baseSellValue, primeTimeSeconds, harvestType]) => ({
    id: `plant-${id}`,
    entityType: "plant",
    name,
    aliases: [],
    evidenceIds: [...cropEvidenceIds, ...(name === "Carrot" ? ["fandom-mechanics-r6865"] : [])],
    verificationState: "confirmed",
    sourceUrl: cropSourceUrl,
    category: "main_world",
    rarity: "unknown",
    harvestType,
    multiHarvest: harvestType === "multi",
    baseWeightKg,
    baseSellValue,
    primeTimeSeconds,
    minWeightKg: baseWeightKg * 0.7,
    priceFloorWeightKg: baseWeightKg * 0.95,
    ...(name === "Carrot" ? { minimumSellValue: 4 } : {}),
    ...(name === "Mushroom" ? { sizeExponentOverride: 1.9, sellTimeMultiplier: 0.5 } : {}),
    ...(name === "Bamboo" ? { sizeExponentOverride: 1.75 } : {})
  })
);

const mutationSourceUrl = "https://growagarden2.fandom.com/wiki/Mutations?oldid=6848";
const mutationEvidenceIds = ["fandom-mutations-r6848"];

const mutationSeeds: ReadonlyArray<readonly [string, string, number]> = [
  ["none", "None", 1],
  ["gold", "Gold", 10],
  ["rainbow", "Rainbow", 30],
  ["aurora", "Aurora", 1.5],
  ["frozen", "Frozen", 14],
  ["amber", "Amber", 20],
  ["veil", "Veil", 20],
  ["electric", "Electric", 25],
  ["starstruck", "Starstruck", 50],
  ["ignited", "Ignited", 60],
  ["bloodlit", "Bloodlit", 60],
  ["eclipsed", "Eclipsed", 80],
  ["glow", "Glow", 100]
];

/** Unreleased Secret/Solarflare/Pizza/Chained rows are intentionally absent. */
export const mutationRecords: MutationRecord[] = mutationSeeds.map(([id, name, multiplier]) => ({
  id: `mutation-${id}`,
  entityType: "mutation",
  name,
  aliases: [],
  evidenceIds: [...mutationEvidenceIds],
  verificationState: "confirmed",
  sourceUrl: mutationSourceUrl,
  multiplier,
  selectable: true,
  stacking: "single_choice"
}));

const petSourceUrl = "https://growagarden2.fandom.com/wiki/Pets?oldid=6823";
const petEvidenceIds = ["fandom-pets-r6823"];
const petSeeds: ReadonlyArray<readonly [string, string, string, string]> = [
  ["bunny", "Bunny", "Common", "Walk Speed"],
  ["frog", "Frog", "Common", "Jump Height"],
  ["owl", "Owl", "Uncommon", "View Distance at Night"],
  ["deer", "Deer", "Rare", "Plant Growth Speed"],
  ["turtle", "Turtle", "Rare", "Backpack Space"],
  ["robin", "Robin", "Legendary", "Seed Drop Frequency"],
  ["raccoon", "Raccoon", "Super", "Steal Limit"],
  ["unicorn", "Unicorn", "Mythic", "Rainbow Chance Multiplier"],
  ["butterfly", "Butterfly", "Legendary", "Plant Growth Speed"],
  ["firefly", "Firefly", "Mythic", "Newly Planted Crop Size"],
  ["monkey", "Monkey", "Mythic", "Fruit Picking Frequency"],
  ["squirrel", "Squirrel", "Legendary", "Fruit Harvest Speed"],
  ["ice-serpent", "Ice Serpent", "Super", "Freezing Strength"],
  ["bear", "Bear", "Mythic", "Garden defense"],
  ["bee", "Bee", "Legendary", "Fruit defense"],
  ["black-dragon", "Black Dragon", "Super", "Fruit Eating and Egg Production Frequency"]
];

/** No pet age/weight formula is claimed: these are ability and variant facts only. */
export const petRecords: PetRecord[] = petSeeds.map(([id, name, rarity, baselineAbility]) => ({
  id: `pet-${id}`,
  entityType: "pet",
  name,
  aliases: [],
  evidenceIds: [...petEvidenceIds],
  verificationState: "confirmed",
  sourceUrl: petSourceUrl,
  rarity,
  baselineAbility,
  variantAbilityEvidence: "per_pet_source_row"
}));

const seedTradeSourceUrl = "https://www.gag2.gg/values/seeds";
const gearTradeSourceUrl = "https://www.gag2.gg/values/gear";
const seedTradeEvidenceIds = ["gag2gg-seed-values-2026-08-03"];
const gearTradeEvidenceIds = ["gag2gg-gear-values-2026-08-03"];

/** Dated GAG2.GG relative trade entries; they are not Sheckles and not crop sell values. */
export const seedRecords: TradeItemRecord[] = [
  "Atlantic Giant Pumpkin", "Star Fruit", "Dragon's Breath", "Poison Ivy", "Ghost Pepper", "Sun Bloom", "Hypno Bloom", "Moon Bloom", "Horned Melon", "Venom Spitter", "Venus Fly Trap", "Poison Apple", "Pomegranate", "Glow Mushroom", "Acorn", "Mango", "Fire Fern", "Cherry", "Rainbow", "Mega", "Baby Cactus", "Banana", "Sunflower", "Gold", "Rocket Pop"
].map((name) => ({
  id: `seed-trade-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  entityType: "seed",
  name,
  aliases: [],
  evidenceIds: [...seedTradeEvidenceIds],
  verificationState: "confirmed",
  sourceUrl: seedTradeSourceUrl,
  tradeCategory: "seed",
  tradeValueUnit: "relative"
}));

export const gearRecords: TradeItemRecord[] = ["Super Watering Can", "Super Sprinkler", "Legendary Sprinkler"].map((name) => ({
  id: `gear-trade-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  entityType: "gear",
  name,
  aliases: [],
  evidenceIds: [...gearTradeEvidenceIds],
  verificationState: "confirmed",
  sourceUrl: gearTradeSourceUrl,
  tradeCategory: "gear",
  tradeValueUnit: "relative"
}));

export const entityRecords: EntityRecord[] = [...plantRecords, ...mutationRecords, ...petRecords, ...seedRecords, ...gearRecords];
export const entities = entityRecords;

/** Contract fixture only; it must remain outside the selectable manifest. */
export const unverifiedEntityFixture: EntityRecord = {
  id: "fixture-unverified-plant",
  entityType: "plant",
  name: "Unverified plant fixture (not game data)",
  aliases: [],
  evidenceIds: [],
  verificationState: "unknown",
  sourceUrl: "about:blank"
};

export function getSelectablePlants() {
  return plantRecords;
}

export function getSelectableMutations() {
  return mutationRecords.filter((mutation) => mutation.selectable);
}
