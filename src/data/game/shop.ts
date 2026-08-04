import type { VerificationState } from "./entities";

/**
 * Shop observations are a separate ledger from crop base-sell and player
 * trade values.  Every displayed shop number must come from one revisioned
 * shop source rather than a component-local constant.
 */
export type ShopCurrency = "Sheckles" | "Leaf";

export type ShopObservation = {
  id: string;
  entityId?: string;
  name: string;
  price: number;
  currency: ShopCurrency;
  stockAmount: string;
  restockChance: string;
  obtainable: boolean;
  effect?: string;
  rarity: string;
  evidenceIds: string[];
  verificationState: VerificationState;
  verifiedAt: string;
  gameVersion: string | "unknown";
};

const verifiedAt = "2026-08-04T00:00:00.000Z";
const gameVersion = "GAG2-live-2026-08-03";
const seedEvidenceIds = ["fandom-seed-shop-r6811"];
const gearEvidenceIds = ["fandom-gears-r6904"];

function slugifyName(name: string) {
  return name.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type SeedRow = readonly [name: string, price: number, rarity: string, stockAmount: string, restockChance: string];

/** Garden Valley rows only; Fall Harvest uses a distinct Leaf-currency shop. */
const seedRows: readonly SeedRow[] = [
  ["Carrot", 1, "Common", "3-4", "100%"], ["Strawberry", 10, "Common", "4-5", "100%"],
  ["Blueberry", 25, "Common", "1-2", "100%"], ["Tulip", 40, "Uncommon", "3-4", "100%"],
  ["Tomato", 200, "Uncommon", "2-3", "90% (9/10)"], ["Apple", 400, "Uncommon", "1", "52.63157% (10/19)"],
  ["Bamboo", 700, "Rare", "7-11", "80% (4/5)"], ["Corn", 2500, "Rare", "1", "35% (7/20)"],
  ["Cactus", 5000, "Rare", "1-2", "16.6667% (1/6)"], ["Pineapple", 10000, "Rare", "1-3", "12.5% (1/8)"],
  ["Mushroom", 15000, "Epic", "2-5", "9.0909% (1/11)"], ["Green Bean", 20000, "Epic", "1-2", "15% (3/20)"],
  ["Banana", 30000, "Epic", "1", "9% (9/100)"], ["Grape", 50000, "Epic", "1", "6.6666% (1/15)"],
  ["Coconut", 140000, "Epic", "1", "5% (1/20)"], ["Mango", 300000, "Epic", "1", "5% (1/20)"],
  ["Rocket Pop", 27500, "Legendary", "1-4", "7% (7/100)"], ["Dragon Fruit", 120000, "Legendary", "1", "4% (1/25)"],
  ["Acorn", 700000, "Legendary", "1-3", "2.941176% (1/34)"], ["Cherry", 1200000, "Legendary", "1", "2.27272% (1/44)"],
  ["Sunflower", 5000000, "Legendary", "1", "1.785714% (1/56)"], ["Fire Fern", 6000000, "Legendary", "1-2", "1.65% (33/2000)"],
  ["Venus Fly Trap", 7000000, "Mythic", "1", "1.42857% (1/70)"], ["Pomegranate", 12000000, "Mythic", "1", "0.925925% (1/108)"],
  ["Poison Apple", 25000000, "Mythic", "1", "0.533333% (2/375)"], ["Venom Spitter", 30000000, "Mythic", "1", "0.475% (19/4,000)"],
  ["Moon Bloom", 85000000, "Super", "1", "0.35% (7/2,000)"], ["Hypno Bloom", 150000000, "Super", "1", "0.275% (11/4,000)"],
  ["Dragon's Breath", 225000000, "Super", "1", "0.2% (1/500)"], ["Sun Bloom", 110000000, "Super", "1", "0.125%"],
  ["Star Fruit", 315000000, "Super", "1", "0.12%"]
];

/** Seed names map to crop IDs only when both ledgers define the same entity. */
export const seedShopRecords: ShopObservation[] = seedRows.map(([name, price, rarity, stockAmount, restockChance]) => ({
  id: `shop-seed-${slugifyName(name)}`,
  entityId: `plant-${slugifyName(name)}`,
  name,
  price,
  currency: "Sheckles",
  stockAmount,
  restockChance,
  obtainable: name !== "Rocket Pop",
  rarity,
  evidenceIds: [...seedEvidenceIds],
  verificationState: "confirmed",
  verifiedAt,
  gameVersion
}));

type GearRow = readonly [
  name: string, price: number, currency: ShopCurrency, rarity: string, stockAmount: string, restockChance: string, obtainable: boolean, effect: string
];

/**
 * Garden Valley rows from revision 6904.  Effects are intentionally the
 * source's general use descriptions; no duration, stat bonus, or hidden
 * mechanic is inferred where the revision does not establish one.
 */
const gearRows: readonly GearRow[] = [
  ["Common Sprinkler", 3000, "Sheckles", "Common", "1-2", "50%", true, "Provides a gardening enhancement."],
  ["Syrup Sprinkler", 3000, "Leaf", "Common", "1-2", "50%", true, "Provides a gardening enhancement."],
  ["Common Watering Can", 2000, "Sheckles", "Common", "2-5", "90%", true, "Provides a gardening enhancement and heals decaying crops."],
  ["Syrup Watering Can", 2000, "Leaf", "Common", "2-5", "90%", true, "Provides a gardening enhancement and heals decaying crops."],
  ["Sign", 4000, "Sheckles", "Common", "1 (Equippable Gear)", "100%", true, "Allows you to display messages on a sign."],
  ["Uncommon Sprinkler", 10000, "Sheckles", "Uncommon", "1-2", "35%", true, "Provides a gardening enhancement."],
  ["Rare Sprinkler", 80000, "Sheckles", "Rare", "1-2", "25%", true, "Provides a gardening enhancement."],
  ["Trowel", 1000, "Sheckles", "Rare", "2-3", "28%", true, "Move crops in your garden."],
  ["Jump Mushroom", 1800, "Sheckles", "Rare", "1-4", "24%", true, "Increases jump height temporarily."],
  ["Speed Mushroom", 1500, "Sheckles", "Rare", "1-5", "22%", true, "Increases speed temporarily."],
  ["Lantern", 12000, "Sheckles", "Rare", "1 (Equippable Gear)", "100%", false, "Light source; improves visibility during the night."],
  ["Megaphone", 8000, "Sheckles", "Rare", "1 (Equippable Gear)", "100%", true, "Allows you to play sounds on megaphone."],
  ["Rare Magic Mail", 500000, "Leaf", "Rare", "1-2", "7%", true, "Sends one Fall Harvest item back to your Garden Valley mailbox."],
  ["Harp", 75000, "Leaf", "Rare", "1 (Equippable Gear)", "8%", true, "Spawns 5 pets."],
  ["Bull Horn", 250000, "Leaf", "Rare", "1 (Equippable Gear)", "100%", true, "Ragdolls or knocks back nearby players."],
  ["Shrink Mushroom", 10000, "Sheckles", "Epic", "1-3", "10%", true, "Shrinks the player temporarily."],
  ["Supersize Mushroom", 20000, "Sheckles", "Epic", "1-3", "10%", true, "Grows the player temporarily."],
  ["Gnome", 100000, "Sheckles", "Epic", "2-5", "8%", true, "Protects your crops."],
  ["Flashbang", 20000, "Sheckles", "Epic", "4-7", "7%", true, "Thrown at players to blind them."],
  ["Basic Pot", 300000, "Sheckles", "Epic", "1-3", "7%", true, "An empty pot for planting crops."],
  ["Wind Staff", 2000000, "Leaf", "Epic", "1 (Equippable Gear)", "100%", true, "Summons a tornado and pulls nearby players in."],
  ["Legendary Sprinkler", 1200000, "Sheckles", "Legendary", "1-2", "4%", true, "Provides a big gardening enhancement."],
  ["Teleporter", 60000, "Sheckles", "Legendary", "1-3", "3%", false, "Teleports your character forward."],
  ["Invisibility Mushroom", 30000, "Sheckles", "Legendary", "1-2", "4%", true, "Makes the player invisible temporarily."],
  ["Wheelbarrow", 500000, "Sheckles", "Legendary", "1 (Equippable Gear)", "100%", true, "Allows you to move around others."],
  ["Legendary Magic Mail", 5000000, "Leaf", "Legendary", "1", "1%", true, "Sends one Fall Harvest item back to your Garden Valley mailbox."],
  ["Player Magnet", 7000000, "Sheckles", "Mythic", "1 (Equippable Gear)", "100%", true, "Pulls nearby players toward you for 10 seconds."],
  ["Strawberry Sniper", 13000000, "Sheckles", "Mythic", "1 (Equippable Gear)", "100%", true, "Snipe anyone stealing your fruits."],
  ["Super Watering Can", 1000000, "Sheckles", "Super", "1-2", "2%", true, "Increases crop growth speed by 300x temporarily and heals decaying crops."],
  ["Super Sprinkler", 3000000, "Sheckles", "Super", "1-2", "1.2%", true, "Provides a mega gardening enhancement."],
  ["Super Magic Mail", 100000000, "Leaf", "Super", "1", "0.015%", true, "Sends one Fall Harvest item back to your Garden Valley mailbox."],
  ["Super Syrup Sprinkler", 300000, "Leaf", "Super", "1-2", "1.2%", true, "Provides a mega gardening enhancement."],
  ["Super Syrup Watering Can", 1000000, "Leaf", "Super", "1-2", "2%", true, "Increases crop growth speed by 300x temporarily and heals decaying crops."]
];

export const gearShopRecords: ShopObservation[] = gearRows.map(([name, price, currency, rarity, stockAmount, restockChance, obtainable, effect]) => ({
  id: `shop-gear-${slugifyName(name)}`,
  name,
  price,
  currency,
  stockAmount,
  restockChance,
  obtainable,
  effect,
  rarity,
  evidenceIds: [...gearEvidenceIds],
  verificationState: "confirmed",
  verifiedAt,
  gameVersion
}));

export const shopObservations = [...seedShopRecords, ...gearShopRecords];
