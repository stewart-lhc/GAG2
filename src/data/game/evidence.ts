/** Source-level provenance. `capturedFields` defines precisely what a URL supports. */
export type EvidenceSourceType = "official" | "in_game_test" | "community_cross_checked";

export type EvidenceRecord = {
  id: string;
  sourceUrl: string;
  sourceType: EvidenceSourceType;
  observedAt: string;
  verifiedAt: string;
  gameVersion: string | "unknown";
  licenseOrUsageNote: string;
  capturedFields: string[];
};

const verifiedAt = "2026-08-04T00:00:00.000Z";
const gameVersion = "GAG2-live-2026-08-03";

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "fandom-crop-data-r6906",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Module:Crop_Data?oldid=6906",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-03T12:16:36.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki data module; facts are transcribed as structured values with revision URL.",
    capturedFields: ["name", "averageWeight", "averageValue", "primeTime", "FruitData presence", "Leaf currency distinction"]
  },
  {
    id: "fandom-mechanics-r6865",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Mechanics?oldid=6865",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-02T12:20:06.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki mechanics revision; used only for the documented calculator inputs and rounding.",
    capturedFields: ["crop value formula", "size exponent", "size knee", "tail exponent", "single harvest mutation", "decay", "friends", "fruit stock", "Mushroom multiplier", "Carrot minimum sell value"]
  },
  {
    id: "fandom-mutations-r6848",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Mutations?oldid=6848",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-02T00:05:31.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki mutation revision; released selectable mutations only.",
    capturedFields: ["mutation name", "value multiplier", "one mutation per crop", "unreleased status"]
  },
  {
    id: "fandom-pets-r6823",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Pets?oldid=6823",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-01T23:04:33.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki pet revision; no age or weight formula is inferred from it.",
    capturedFields: ["pet name", "rarity", "baseline ability", "Big ability boost", "Mega ability boost", "Rainbow ability boost"]
  },
  {
    id: "fandom-restock-r6811",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Seed_Shop?oldid=6811",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-01T22:52:09.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki shop revision; used for documented global restock cadence.",
    capturedFields: ["seed shop restock", "gear shop restock", "global alignment", "fruit stock restock"]
  },
  {
    id: "fandom-seed-shop-r6811",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Seed_Shop?oldid=6811",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-01T22:52:09.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki Seed Shop revision; Garden Valley seed prices, rarity, stock amount, chance and obtainable state only.",
    capturedFields: ["seed name", "Sheckle price", "rarity", "stock amount", "stock chance", "obtainable state"]
  },
  {
    id: "fandom-gears-r6904",
    sourceUrl: "https://growagarden2.fandom.com/wiki/Gears?oldid=6904",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-03T11:54:42.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Fandom community wiki Gears revision; Garden Valley gear price, currency, general use, stock amount, restock chance and obtainable state only.",
    capturedFields: ["gear name", "price", "currency", "rarity", "general use", "stock amount", "restock chance", "obtainable state"]
  },
  {
    id: "gag2gg-methodology-2026-08-03",
    sourceUrl: "https://www.gag2.gg/methodology",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-03T00:00:00.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "Community trade-data methodology; values are relative completed-trade observations, never Sheckles.",
    capturedFields: ["completed trade methodology", "relative trade value", "no guarantee disclaimer"]
  },
  {
    id: "gag2gg-seed-values-2026-08-03",
    sourceUrl: "https://www.gag2.gg/values/seeds",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-03T00:00:00.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "GAG2.GG dated relative trade-value page; values are site-relative completed-trade observations, not Sheckles.",
    capturedFields: ["seed item name", "relative trade value", "demand", "trade disclaimer"]
  },
  {
    id: "gag2gg-gear-values-2026-08-03",
    sourceUrl: "https://www.gag2.gg/values/gear",
    sourceType: "community_cross_checked",
    observedAt: "2026-08-03T00:00:00.000Z",
    verifiedAt,
    gameVersion,
    licenseOrUsageNote: "GAG2.GG dated relative trade-value page; values are site-relative completed-trade observations, not Sheckles.",
    capturedFields: ["gear item name", "relative trade value", "demand", "trade disclaimer"]
  }
];

export const evidence = evidenceRecords;
