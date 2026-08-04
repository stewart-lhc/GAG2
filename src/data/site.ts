import { robloxSnapshot } from "@/data/robloxSnapshot";

export type StatusTone = "confirmed" | "unknown" | "rumor" | "warning";

export const siteConfig = {
  name: "Grow a Garden 2 Calculator",
  shortName: "GAG2 Calculator",
  gameName: "Grow A Garden 2",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://growagarden2.pro",
  description:
    "Free, no-ads Grow a Garden 2 plant value, mutation, trade, restock, codes, and guide tools built from versioned community data.",
  robloxPlaceId: "97598239454123",
  robloxUniverseId: "10200395747",
  robloxUrl: "https://www.roblox.com/games/97598239454123/Grow-a-Garden-2",
  creator: "Strawberreh Squad",
  creatorId: "432538536",
  lastVerified: "2026-08-04",
  apiSnapshot: robloxSnapshot
};

export const sourceList = [
  {
    id: "roblox-page",
    label: "Roblox experience page",
    href: siteConfig.robloxUrl,
    sourceType: "Official Roblox experience page",
    confidence: "High",
    lastVerified: siteConfig.lastVerified
  },
  {
    id: "roblox-api",
    label: "Roblox public game API",
    href: "https://games.roblox.com/v1/games?universeIds=10200395747",
    sourceType: "Official Roblox Games API",
    confidence: "High",
    lastVerified: siteConfig.lastVerified
  }
];

export const releaseFacts = [
  {
    label: "Official experience is publicly listed",
    status: "confirmed" as StatusTone,
    detail:
      "Roblox's official experience page and Games API returned the same root place and universe during the latest verification.",
    sourceId: "roblox-api"
  },
  {
    label: "Creator",
    status: "confirmed" as StatusTone,
    detail:
      "Roblox lists the verified group Strawberreh Squad as the experience creator.",
    sourceId: "roblox-page"
  },
  {
    label: "Public availability",
    status: "confirmed" as StatusTone,
    detail: "The official page and Games API were publicly reachable on 2026-08-04. Availability can still change after that check.",
    sourceId: "roblox-page"
  },
  {
    label: "Experience creation date",
    status: "confirmed" as StatusTone,
    detail: "The official Games API reports that this experience was created on 2026-05-21.",
    sourceId: "roblox-page"
  }
];

export const describedMechanics = [
  "Expanded map",
  "Bigger gardens",
  "Guilds",
  "New gears",
  "New seeds",
  "Night stealing when players leave gardens",
  "Offline garden growth"
];

export type StockItem = {
  id: string;
  name: string;
  shop: "Seed Shop" | "Gear Shop" | "Pet Egg Shop" | "Event Shop" | "Weather";
  rarity: "Unknown" | "Common" | "Uncommon" | "Rare" | "Legendary";
  status: "Awaiting verification" | "Unknown" | "In stock" | "Out of stock" | "Event-only";
  price: string;
  refreshEta: string;
  lastSeen: string;
  lastVerified: string;
  confidence: "Unknown" | "Low" | "Medium" | "High";
  sourceType: string;
};

export const stockItems: StockItem[] = [
  {
    id: "seed-shop-placeholder",
    name: "Seed Shop inventory",
    shop: "Seed Shop",
    rarity: "Unknown",
    status: "Awaiting verification",
    price: "Unknown",
    refreshEta: "Waiting for verified cycle",
    lastSeen: "Not verified yet",
    lastVerified: "Pending",
    confidence: "Unknown",
    sourceType: "No verified GAG2 stock source yet"
  },
  {
    id: "gear-shop-placeholder",
    name: "Gear Shop inventory",
    shop: "Gear Shop",
    rarity: "Unknown",
    status: "Awaiting verification",
    price: "Unknown",
    refreshEta: "Waiting for verified cycle",
    lastSeen: "Not verified yet",
    lastVerified: "Pending",
    confidence: "Unknown",
    sourceType: "No verified GAG2 stock source yet"
  },
  {
    id: "pet-egg-placeholder",
    name: "Pet Egg inventory",
    shop: "Pet Egg Shop",
    rarity: "Unknown",
    status: "Awaiting verification",
    price: "Unknown",
    refreshEta: "Waiting for verified cycle",
    lastSeen: "Not verified yet",
    lastVerified: "Pending",
    confidence: "Unknown",
    sourceType: "No verified GAG2 stock source yet"
  },
  {
    id: "weather-placeholder",
    name: "Weather and event state",
    shop: "Weather",
    rarity: "Unknown",
    status: "Unknown",
    price: "Not applicable",
    refreshEta: "Unknown",
    lastSeen: "Not verified yet",
    lastVerified: "Pending",
    confidence: "Unknown",
    sourceType: "No verified GAG2 weather source yet"
  }
];

export const codes = {
  lastChecked: "2026-07-25",
  active: [
    {
      code: "TEAMGREENBEAN",
      reward: "3× Green Bean Seeds",
      firstSeen: "2026-06-20",
      lastChecked: "2026-07-25",
      source: "https://growagarden2.fandom.com/wiki/Codes"
    },
    {
      code: "WATERYOPLANTS",
      reward: "10× Common Watering Cans",
      firstSeen: "2026-06-20",
      lastChecked: "2026-07-25",
      source: "https://growagarden2.fandom.com/wiki/Codes"
    },
    {
      code: "REMEMBERTODRINKWATER",
      reward: "1× Common Watering Can",
      firstSeen: "2026-06-20",
      lastChecked: "2026-07-25",
      source: "https://growagarden2.fandom.com/wiki/Codes"
    }
  ] as Array<{
    code: string;
    reward: string;
    firstSeen: string;
    lastChecked: string;
    source: string;
  }>,
  expired: [] as Array<{
    code: string;
    reward: string;
    firstSeen: string;
    lastChecked: string;
    source: string;
  }>
};

export type SiteRoute = {
  path: string;
  title: string;
  priority: number;
  lastModified: string;
  changeFrequency?: "daily" | "weekly";
};

export const routes: SiteRoute[] = [
  {
    path: "/",
    title: "Grow a Garden 2 Calculator",
    priority: 1,
    lastModified: "2026-08-04",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-trading-calculator",
    title: "Grow a Garden 2 Trading Calculator",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-value-list",
    title: "Grow a Garden 2 Value List",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-mutation-calculator",
    title: "Grow a Garden 2 Mutation Calculator",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-mutations-guide",
    title: "Grow a Garden 2 Mutations Guide",
    priority: 0.8,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-pet-calculator",
    title: "Grow a Garden 2 Pet Variant Calculator",
    priority: 0.8,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-pet-weight-guide",
    title: "Grow a Garden 2 Pet Variants and Weight Guide",
    priority: 0.7,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-seed-restock-time",
    title: "Grow a Garden 2 Seed Restock Time",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-seeds",
    title: "Grow a Garden 2 Seeds",
    priority: 0.8,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-gear",
    title: "Grow a Garden 2 Gear",
    priority: 0.8,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-seed-tier-list",
    title: "Grow a Garden 2 Seed Tier List",
    priority: 0.7,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-plant-size-guide",
    title: "Grow a Garden 2 Plant Size Guide",
    priority: 0.7,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-release-date",
    title: "Grow a Garden 2 Release Status",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-official-link",
    title: "Grow a Garden 2 Link Check",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-stock-tracker",
    title: "Grow a Garden 2 Stock Tracker",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-codes",
    title: "Grow a Garden 2 Codes",
    priority: 0.9,
    lastModified: "2026-08-04",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-night-stealing-guide",
    title: "Grow a Garden 2 Night Stealing Guide",
    priority: 0.8,
    lastModified: "2026-08-04",
    changeFrequency: "weekly"
  },
  { path: "/about", title: "About Grow a Garden 2 Calculator", priority: 0.5, lastModified: "2026-08-04", changeFrequency: "weekly" },
  { path: "/privacy-policy", title: "Privacy Policy", priority: 0.3, lastModified: "2026-08-04", changeFrequency: "weekly" },
  { path: "/terms", title: "Terms", priority: 0.3, lastModified: "2026-08-04", changeFrequency: "weekly" }
];
