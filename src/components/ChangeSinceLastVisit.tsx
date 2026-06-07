"use client";

import { useEffect, useMemo, useState } from "react";
import type { RobloxSnapshot } from "@/data/robloxSnapshot";
import { trackEvent } from "@/lib/clientAnalytics";

type StoredVisit = {
  lastVisitAt: string;
  playing: number;
  visits: number;
  favorites: number;
  robloxUpdatedAt: string;
};

const STORAGE_KEY = "gag2:last-visit-snapshot";

function deltaLabel(label: string, before: number, after: number) {
  const delta = after - before;
  if (delta === 0) return `${label}: no change`;
  const sign = delta > 0 ? "+" : "";
  return `${label}: ${before.toLocaleString()} -> ${after.toLocaleString()} (${sign}${delta.toLocaleString()})`;
}

export function ChangeSinceLastVisit({ snapshot }: { snapshot: RobloxSnapshot }) {
  const [previous, setPrevious] = useState<StoredVisit | null>(null);

  const current = useMemo<StoredVisit>(() => ({
    lastVisitAt: new Date().toISOString(),
    playing: snapshot.playing,
    visits: snapshot.visits,
    favorites: snapshot.favorites,
    robloxUpdatedAt: snapshot.robloxUpdatedAt
  }), [snapshot.favorites, snapshot.playing, snapshot.robloxUpdatedAt, snapshot.visits]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as StoredVisit;
        setPrevious(parsed);
        trackEvent("returning_user_change_view", {
          favoritesDelta: snapshot.favorites - parsed.favorites,
          playingDelta: snapshot.playing - parsed.playing,
          visitsDelta: snapshot.visits - parsed.visits
        });
      } catch {
        setPrevious(null);
      }
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }, [current]);

  function clearTracking() {
    window.localStorage.removeItem(STORAGE_KEY);
    setPrevious(null);
  }

  return (
    <article className="panel">
      <span className="badge badge-unknown">Local tracking</span>
      <h2 style={{ marginTop: 14 }}>Since Your Last Visit</h2>
      {previous ? (
        <>
          <ul className="check-list">
            <li>{deltaLabel("Playing", previous.playing, snapshot.playing)}</li>
            <li>{deltaLabel("Visits", previous.visits, snapshot.visits)}</li>
            <li>{deltaLabel("Favorites", previous.favorites, snapshot.favorites)}</li>
            <li>
              Roblox update:{" "}
              {previous.robloxUpdatedAt === snapshot.robloxUpdatedAt
                ? "same update timestamp"
                : "changed since your last visit"}
            </li>
          </ul>
          <button className="button secondary" onClick={clearTracking} type="button">
            Clear local tracking
          </button>
        </>
      ) : (
        <p className="callout">
          Start tracking changes on this device. Next visit will show playing, visits,
          favorites, and Roblox update changes.
        </p>
      )}
    </article>
  );
}
