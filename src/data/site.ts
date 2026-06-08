import { robloxSnapshot } from "@/data/robloxSnapshot";

export type StatusTone = "confirmed" | "unknown" | "rumor" | "warning";

export const siteConfig = {
  name: "Grow a Garden 2 Tools Hub",
  shortName: "GAG2 Tools",
  gameName: "Grow A Garden 2",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://growagarden2.pro",
  description:
    "Unofficial Grow a Garden 2 player command center for safe Roblox link checks, release status, stock watch states, codes, crop value estimates, and night stealing risk.",
  robloxPlaceId: "95204935687527",
  robloxUniverseId: "10004943774",
  robloxUrl: "https://www.roblox.com/games/95204935687527/Grow-A-Garden-2",
  creator: "@BMWLux",
  creatorId: "71552399",
  lastVerified: "2026-06-05",
  apiSnapshot: robloxSnapshot
};

export const sourceList = [
  {
    id: "roblox-page",
    label: "Roblox experience page",
    href: siteConfig.robloxUrl,
    sourceType: "Official platform page",
    confidence: "High",
    lastVerified: siteConfig.lastVerified
  },
  {
    id: "roblox-api",
    label: "Roblox public game API",
    href: "https://games.roblox.com/v1/games?universeIds=10004943774",
    sourceType: "Official public API",
    confidence: "High",
    lastVerified: siteConfig.lastVerified
  }
];

export const releaseFacts = [
  {
    label: "Experience page exists",
    status: "confirmed" as StatusTone,
    detail: "Roblox lists Grow A Garden 2 at the configured place URL.",
    sourceId: "roblox-page"
  },
  {
    label: "Creator",
    status: "confirmed" as StatusTone,
    detail: "The Roblox page shows the creator as @BMWLux.",
    sourceId: "roblox-page"
  },
  {
    label: "Public availability",
    status: "unknown" as StatusTone,
    detail: "Roblox page availability can change. The hub should re-check status before making release claims.",
    sourceId: "roblox-page"
  },
  {
    label: "Exact release schedule",
    status: "unknown" as StatusTone,
    detail: "No exact final release date is treated as confirmed in this MVP.",
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
  lastChecked: "2026-06-05",
  active: [] as Array<{
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
    title: "Grow a Garden 2 Tools Hub",
    priority: 1,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-release-date",
    title: "Grow a Garden 2 Release Status",
    priority: 0.9,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-official-link",
    title: "Grow a Garden 2 Official Link",
    priority: 0.9,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-stock-tracker",
    title: "Grow a Garden 2 Stock Tracker",
    priority: 0.9,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-codes",
    title: "Grow a Garden 2 Codes",
    priority: 0.9,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-calculator",
    title: "Grow a Garden 2 Calculator",
    priority: 0.9,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-night-stealing-guide",
    title: "Grow a Garden 2 Night Stealing Guide",
    priority: 0.8,
    lastModified: "2026-06-08",
    changeFrequency: "daily"
  },
  {
    path: "/grow-a-garden-2-seeds",
    title: "Grow a Garden 2 Seeds",
    priority: 0.7,
    lastModified: "2026-06-08",
    changeFrequency: "weekly"
  },
  {
    path: "/grow-a-garden-2-gear",
    title: "Grow a Garden 2 Gear",
    priority: 0.7,
    lastModified: "2026-06-08",
    changeFrequency: "weekly"
  },
  { path: "/about", title: "About GAG2 Tools", priority: 0.5, lastModified: "2026-06-05", changeFrequency: "weekly" },
  { path: "/privacy-policy", title: "Privacy Policy", priority: 0.3, lastModified: "2026-06-05", changeFrequency: "weekly" },
  { path: "/terms", title: "Terms", priority: 0.3, lastModified: "2026-06-05", changeFrequency: "weekly" }
];
