"use client";

import { useEffect, useState } from "react";
import {
  formatCompactNumber,
  getSnapshotStaticStatus,
  getSnapshotStatus,
  type RobloxSnapshot
} from "@/data/robloxSnapshot";
import { trackEvent } from "@/lib/clientAnalytics";

type RobloxSnapshotCardProps = {
  snapshot: RobloxSnapshot;
  compact?: boolean;
};

export function RobloxSnapshotCard({ snapshot, compact = false }: RobloxSnapshotCardProps) {
  const [status, setStatus] = useState(() => getSnapshotStaticStatus(snapshot));
  const updatedAt = Date.parse(snapshot.robloxUpdatedAt);
  const currentCheckAt = snapshot.currentCheckAt ? Date.parse(snapshot.currentCheckAt) : Number.NaN;
  const updatedLabel = Number.isFinite(updatedAt)
    ? new Date(updatedAt).toLocaleDateString("en", { month: "short", day: "numeric" })
    : "Unknown";
  const currentCheckLabel = Number.isFinite(currentCheckAt)
    ? new Date(currentCheckAt).toLocaleDateString("en", { month: "short", day: "numeric" })
    : "Unknown";

  useEffect(() => {
    function updateStatus() {
      setStatus(getSnapshotStatus(snapshot));
    }

    updateStatus();
    const interval = window.setInterval(updateStatus, 60000);
    return () => window.clearInterval(interval);
  }, [snapshot]);

  useEffect(() => {
    trackEvent("live_status_view", {
      fetchStatus: snapshot.fetchStatus,
      isStale: status.isStale,
      playing: snapshot.playing
    });
  }, [snapshot.fetchStatus, snapshot.playing, status.isStale]);

  return (
    <article className="panel">
      <span className={`badge ${status.badgeTone === "confirmed" ? "badge-confirmed" : "badge-warning"}`}>
        {status.badgeLabel}
      </span>
      <h2 style={{ marginTop: 14 }}>
        {status.isCurrentSuccess ? "Roblox status" : "Roblox status needs a fresh look"}
      </h2>
      <p className="muted">
        {status.detail} {status.lastSyncedLabel}. For exact availability and player count, use the Roblox page.
      </p>
      {status.isStale ? (
        <p className="callout">
          These numbers are from the last check, not a live player count.
        </p>
      ) : null}
      <div className="stat-grid">
        <div className="stat">
          <span>{status.isStale ? "Last playing" : "Playing"}</span>
          <strong>{snapshot.playing.toLocaleString()}</strong>
        </div>
        <div className="stat">
          <span>{status.isStale ? "Last visits" : "Visits"}</span>
          <strong>{formatCompactNumber(snapshot.visits)}</strong>
        </div>
        <div className="stat">
          <span>{status.isStale ? "Last favorites" : "Favorites"}</span>
          <strong>{formatCompactNumber(snapshot.favorites)}</strong>
        </div>
        <div className="stat">
          <span>Last game update</span>
          <strong>{updatedLabel}</strong>
        </div>
        <div className="stat">
          <span>Last checked</span>
          <strong>{currentCheckLabel}</strong>
        </div>
        {!compact ? (
          <>
            <div className="stat">
              <span>Roblox place ID</span>
              <strong>{snapshot.placeId}</strong>
            </div>
            <div className="stat">
              <span>Game ID</span>
              <strong>{snapshot.universeId}</strong>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
