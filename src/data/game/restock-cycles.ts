import type { VerificationState } from "./entities";

export type RestockCycleRecord = {
  id: string;
  entityOrShopId: string;
  cycleVersion: string;
  gameVersion: string | "unknown";
  implementationId: "calculateNextRestock";
  intervalSeconds: number;
  timezone: string;
  serverBasis: string;
  anchorAt: string;
  effectiveFrom: string;
  effectiveTo?: string;
  lastObservedAt: string;
  staleAfterSeconds: number;
  evidenceIds: string[];
  verificationState: VerificationState;
  goldenExamples: Array<{ id: string; now: string; expectedNextRestock: string }>;
};

const common = {
  cycleVersion: "fandom-restock-r6811",
  gameVersion: "GAG2-live-2026-08-03" as const,
  implementationId: "calculateNextRestock" as const,
  timezone: "UTC",
  serverBasis: "Globally aligned UTC boundary; this is a timer, not live inventory.",
  anchorAt: "2026-08-01T00:00:00.000Z",
  effectiveFrom: "2026-08-01T00:00:00.000Z",
  lastObservedAt: "2026-08-01T22:52:09.000Z",
  staleAfterSeconds: 604800,
  evidenceIds: ["fandom-restock-r6811"],
  verificationState: "confirmed" as const
};

export const restockCycleRecords: RestockCycleRecord[] = [
  {
    id: "seed-shop-global-300s",
    entityOrShopId: "seed-shop",
    ...common,
    intervalSeconds: 300,
    goldenExamples: [{ id: "seed-shop-5m-boundary", now: "2026-08-04T12:03:14.000Z", expectedNextRestock: "2026-08-04T12:05:00.000Z" }]
  },
  {
    id: "gear-shop-global-300s",
    entityOrShopId: "gear-shop",
    ...common,
    intervalSeconds: 300,
    goldenExamples: [{ id: "gear-shop-5m-boundary", now: "2026-08-04T12:09:59.000Z", expectedNextRestock: "2026-08-04T12:10:00.000Z" }]
  },
  {
    id: "fruit-stock-global-600s",
    entityOrShopId: "fruit-stock",
    ...common,
    intervalSeconds: 600,
    goldenExamples: [{ id: "fruit-stock-10m-boundary", now: "2026-08-04T12:03:14.000Z", expectedNextRestock: "2026-08-04T12:10:00.000Z" }]
  }
];

export const restockCycles = restockCycleRecords;
