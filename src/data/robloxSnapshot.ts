import rawSnapshot from "../../data/snapshots/roblox-game.json";

export type RobloxFetchStatus = "success" | "stale" | "not_found" | "api_empty" | "fetch_failed";

export type RobloxSnapshot = {
  placeId: string;
  universeId: string;
  name: string;
  creator: {
    id: number;
    name: string;
    type: string;
    hasVerifiedBadge: boolean;
  };
  playing: number;
  visits: number;
  favorites: number;
  maxPlayers: number;
  upVotes: number | null;
  downVotes: number | null;
  createdAt: string;
  robloxUpdatedAt: string;
  fetchedAt: string;
  sourceUrl: string;
  votesSourceUrl: string;
  fetchStatus: RobloxFetchStatus;
  staleAfterMinutes: number;
  currentCheckAt?: string;
  currentStatusDetail?: string;
  lastSuccessfulFetchedAt?: string;
};

export const robloxSnapshot = rawSnapshot as RobloxSnapshot;

export type SnapshotStatus = {
  isCurrentSuccess: boolean;
  isStale: boolean;
  badgeTone: "confirmed" | "warning";
  badgeLabel: string;
  detail: string;
  lastSyncedLabel: string;
};

function getLastSuccessfulSyncDate(snapshot: RobloxSnapshot) {
  const timestamp = snapshot.lastSuccessfulFetchedAt ?? snapshot.fetchedAt;
  return timestamp ? timestamp.slice(0, 10) : "";
}

function getFailureDetail(snapshot: RobloxSnapshot) {
  if (snapshot.fetchStatus === "api_empty") {
    return "Roblox currently returns no public game data for the tracked universe.";
  }

  if (snapshot.fetchStatus === "not_found") {
    return "The tracked Roblox experience page is currently unavailable.";
  }

  if (snapshot.fetchStatus === "fetch_failed") {
    return "The latest Roblox refresh failed; showing the last successful snapshot.";
  }

  return "";
}

export function getSnapshotStaticStatus(snapshot: RobloxSnapshot): SnapshotStatus {
  const lastSyncDate = getLastSuccessfulSyncDate(snapshot);
  const lastSyncedLabel = lastSyncDate
    ? `Last successful sync ${lastSyncDate}`
    : "Last successful sync time unknown";
  const failureDetail = getFailureDetail(snapshot);

  if (failureDetail) {
    return {
      isCurrentSuccess: false,
      isStale: true,
      badgeTone: "warning",
      badgeLabel: "Needs re-check",
      detail: failureDetail,
      lastSyncedLabel
    };
  }

  return {
    isCurrentSuccess: false,
    isStale: true,
    badgeTone: "warning",
    badgeLabel: "Snapshot needs freshness check",
    detail: "Showing the last successful Roblox API snapshot until freshness is checked.",
    lastSyncedLabel
  };
}

export function getSnapshotAgeMinutes(snapshot: RobloxSnapshot) {
  const timestamp = Date.parse(snapshot.lastSuccessfulFetchedAt ?? snapshot.fetchedAt);
  return Number.isFinite(timestamp)
    ? Math.max(0, Math.round((Date.now() - timestamp) / 60000))
    : null;
}

export function getSnapshotStatus(snapshot: RobloxSnapshot): SnapshotStatus {
  const ageMinutes = getSnapshotAgeMinutes(snapshot);
  const staleByAge = ageMinutes === null || ageMinutes > snapshot.staleAfterMinutes;
  const explicitlyStale = snapshot.fetchStatus === "stale";
  const isCurrentSuccess = snapshot.fetchStatus === "success" && !staleByAge;
  const failureDetail = getFailureDetail(snapshot);

  return {
    isCurrentSuccess,
    isStale: !isCurrentSuccess,
    badgeTone: isCurrentSuccess ? "confirmed" : "warning",
    badgeLabel: isCurrentSuccess ? "Roblox API snapshot" : "Needs re-check",
    detail:
      failureDetail ||
      (explicitlyStale || staleByAge
        ? "This snapshot is stale; verify Roblox before sharing a current availability claim."
        : "Source: Roblox public API."),
    lastSyncedLabel:
      ageMinutes === null
        ? "Last successful sync time unknown"
        : ageMinutes < 1
          ? "Last successful sync just now"
          : `Last successful sync ${ageMinutes} min ago`
  };
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}
