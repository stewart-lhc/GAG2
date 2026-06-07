"use client";

import { useEffect, useState } from "react";
import { formatCompactNumber, type RobloxSnapshot } from "@/data/robloxSnapshot";
import { trackEvent } from "@/lib/clientAnalytics";

type RobloxSnapshotCardProps = {
  snapshot: RobloxSnapshot;
  compact?: boolean;
};

type SnapshotFreshness = {
  isStale: boolean;
  lastSyncedLabel: string;
};

function calculateFreshness(snapshot: RobloxSnapshot): SnapshotFreshness {
  const fetchedAtMs = Date.parse(snapshot.fetchedAt);
  const ageMinutes = Number.isFinite(fetchedAtMs)
    ? Math.max(0, Math.round((Date.now() - fetchedAtMs) / 60000))
    : null;

  const isStale = ageMinutes === null || ageMinutes > snapshot.staleAfterMinutes;
  const lastSyncedLabel = ageMinutes === null
    ? "Sync time unknown"
    : ageMinutes < 1
      ? "Synced just now"
      : `Synced ${ageMinutes} min ago`;

  return { isStale, lastSyncedLabel };
}

export function RobloxSnapshotCard({ snapshot, compact = false }: RobloxSnapshotCardProps) {
  const [freshness, setFreshness] = useState<SnapshotFreshness>({
    isStale: false,
    lastSyncedLabel: "Checking sync age"
  });
  const updatedAt = Date.parse(snapshot.robloxUpdatedAt);
  const updatedLabel = Number.isFinite(updatedAt)
    ? new Date(updatedAt).toLocaleDateString("en", { month: "short", day: "numeric" })
    : "Unknown";

  useEffect(() => {
    function updateFreshness() {
      setFreshness(calculateFreshness(snapshot));
    }

    updateFreshness();
    const interval = window.setInterval(updateFreshness, 60000);
    return () => window.clearInterval(interval);
  }, [snapshot]);

  useEffect(() => {
    trackEvent("live_status_view", {
      isStale: freshness.isStale,
      playing: snapshot.playing
    });
  }, [freshness.isStale, snapshot.playing]);

  return (
    <article className="panel">
      <span className={`badge ${freshness.isStale ? "badge-warning" : "badge-confirmed"}`}>
        {freshness.isStale ? "Snapshot stale" : "Roblox API snapshot"}
      </span>
      <h2 style={{ marginTop: 14 }}>Live Roblox Status</h2>
      <p className="muted">
        Source: Roblox public API. {freshness.lastSyncedLabel}. Exact release timing stays
        unknown unless official sources confirm it.
      </p>
      <div className="stat-grid">
        <div className="stat">
          <span>Playing</span>
          <strong>{snapshot.playing.toLocaleString()}</strong>
        </div>
        <div className="stat">
          <span>Visits</span>
          <strong>{formatCompactNumber(snapshot.visits)}</strong>
        </div>
        <div className="stat">
          <span>Favorites</span>
          <strong>{formatCompactNumber(snapshot.favorites)}</strong>
        </div>
        <div className="stat">
          <span>Updated</span>
          <strong>{updatedLabel}</strong>
        </div>
        {!compact ? (
          <>
            <div className="stat">
              <span>Place ID</span>
              <strong>{snapshot.placeId}</strong>
            </div>
            <div className="stat">
              <span>Universe ID</span>
              <strong>{snapshot.universeId}</strong>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
