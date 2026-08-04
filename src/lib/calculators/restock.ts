import type { RestockCycleRecord } from "@/data/game/restock-cycles";

/** The calculation contract is versioned so a future cycle formula can be audited. */
export const RESTOCK_CALCULATOR_VERSION = "calculateNextRestock@1";

export type RestockCycleInput = Pick<
  RestockCycleRecord,
  "anchorAt" | "intervalSeconds"
> &
  Partial<
    Pick<
      RestockCycleRecord,
      | "cycleVersion"
      | "effectiveFrom"
      | "effectiveTo"
      | "lastObservedAt"
      | "staleAfterSeconds"
      | "verificationState"
      | "gameVersion"
      | "evidenceIds"
    >
  >;

export type RestockCalculationStatus =
  | "scheduled"
  | "stale"
  | "outside-effective-window"
  | "unknown"
  | "invalid";

export type RestockCalculationResult = {
  status: RestockCalculationStatus;
  formulaVersion: typeof RESTOCK_CALCULATOR_VERSION;
  now: string | null;
  nextRestockAt: string | null;
  /** Kept when stale so a player can see what the old observation would imply. */
  candidateNextRestockAt: string | null;
  reason: string;
  stale: boolean;
  /** Alias useful to callers that use the shorter field name. */
  nextRestock: string | null;
};

function parseTimestamp(value: string | Date | undefined): number | null {
  if (value instanceof Date) {
    return Number.isFinite(value.getTime()) ? value.getTime() : null;
  }
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function result(
  status: RestockCalculationStatus,
  now: string | null,
  nextRestockAt: string | null,
  candidateNextRestockAt: string | null,
  reason: string
): RestockCalculationResult {
  return {
    status,
    formulaVersion: RESTOCK_CALCULATOR_VERSION,
    now,
    nextRestockAt,
    candidateNextRestockAt,
    reason,
    stale: status === "stale",
    nextRestock: nextRestockAt
  };
}

/**
 * Calculate the first cycle boundary at or after `now`.
 *
 * All arithmetic is performed on UTC epoch milliseconds. ISO timestamps with an
 * explicit offset (including DST transitions) therefore have one unambiguous
 * interpretation, independent of the browser's local timezone.
 */
export function calculateNextRestock(
  cycle: RestockCycleInput,
  nowInput: string | Date
): RestockCalculationResult {
  const nowMs = parseTimestamp(nowInput);
  const anchorMs = parseTimestamp(cycle?.anchorAt);
  const effectiveFromMs = parseTimestamp(cycle?.effectiveFrom);
  const effectiveToMs = cycle?.effectiveTo === undefined ? null : parseTimestamp(cycle.effectiveTo);
  const lastObservedMs = cycle?.lastObservedAt === undefined ? null : parseTimestamp(cycle.lastObservedAt);
  const now = nowMs === null ? null : new Date(nowMs).toISOString();

  if (nowMs === null) {
    return result("invalid", null, null, null, "Now must be a valid date or ISO timestamp.");
  }
  if (anchorMs === null) {
    return result("invalid", now, null, null, "Anchor must be a valid date or ISO timestamp.");
  }
  if (!Number.isFinite(cycle.intervalSeconds) || cycle.intervalSeconds <= 0) {
    return result("invalid", now, null, null, "Interval must be a finite number greater than zero.");
  }
  if (cycle.effectiveFrom !== undefined && effectiveFromMs === null) {
    return result("invalid", now, null, null, "Effective start must be a valid date or ISO timestamp.");
  }
  if (cycle.effectiveTo !== undefined && effectiveToMs === null) {
    return result("invalid", now, null, null, "Effective end must be a valid date or ISO timestamp.");
  }
  if (effectiveToMs !== null && effectiveFromMs !== null && effectiveToMs <= effectiveFromMs) {
    return result("invalid", now, null, null, "Effective end must be after effective start.");
  }
  if (cycle.lastObservedAt !== undefined && lastObservedMs === null) {
    return result("invalid", now, null, null, "Last observed time must be a valid date or ISO timestamp.");
  }
  if (cycle.staleAfterSeconds !== undefined &&
      (!Number.isFinite(cycle.staleAfterSeconds) || cycle.staleAfterSeconds <= 0)) {
    return result("invalid", now, null, null, "Stale window must be a finite number greater than zero.");
  }

  // A complete ledger record must be confirmed and versioned. Omitted fields
  // are intentionally permitted for the explicitly labelled player sandbox.
  if (cycle.verificationState !== undefined && cycle.verificationState !== "confirmed") {
    return result("unknown", now, null, null, "This cycle is not verified and cannot be forecast.");
  }
  if (cycle.gameVersion === "unknown") {
    return result("unknown", now, null, null, "This cycle has no known game version.");
  }

  const fromMs = effectiveFromMs ?? anchorMs;
  if (nowMs < fromMs || (effectiveToMs !== null && nowMs >= effectiveToMs)) {
    return result(
      "outside-effective-window",
      now,
      null,
      null,
      "The requested time is outside this cycle's effective window."
    );
  }

  const intervalMs = cycle.intervalSeconds * 1000;
  if (!Number.isFinite(intervalMs) || intervalMs <= 0 || !Number.isSafeInteger(intervalMs)) {
    return result("invalid", now, null, null, "Interval is outside the safe timestamp range.");
  }

  // ceil keeps an exact boundary at that boundary (rather than skipping a cycle).
  const elapsed = Math.max(0, nowMs - anchorMs);
  const periods = Math.ceil(elapsed / intervalMs);
  let candidateMs = anchorMs + periods * intervalMs;
  // A cycle can have an anchor before its effective window; never return a
  // boundary that predates the window.
  while (candidateMs < fromMs) candidateMs += intervalMs;
  if (!Number.isSafeInteger(candidateMs)) {
    return result("invalid", now, null, null, "The calculated timestamp is outside the safe range.");
  }

  const candidate = new Date(candidateMs).toISOString();
  if (
    lastObservedMs !== null &&
    cycle.staleAfterSeconds !== undefined &&
    nowMs - lastObservedMs >= cycle.staleAfterSeconds * 1000
  ) {
    return result("stale", now, null, candidate, "The last observed cycle is outside its freshness window.");
  }

  return result("scheduled", now, candidate, candidate, "Next restock boundary calculated from the cycle anchor.");
}
