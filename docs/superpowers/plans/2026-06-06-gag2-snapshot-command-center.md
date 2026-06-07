# GAG2 Snapshot Command Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the P0 "Snapshot-driven Player Command Center" from `docs/gag2-growth-retention-prd.md`: live Roblox snapshot refresh, stale-aware display, since-last-visit change summary, local watch intent, and minimal analytics.

**Architecture:** Keep P0 file-based and low-risk: a Node refresh script writes `data/snapshots/roblox-game.json`, typed data helpers expose a normalized snapshot to server components, and small client components handle localStorage-only retention loops. Do not introduce a database, account system, Roblox login, auto-join, stock automation, or unverified codes in this plan.

**Tech Stack:** Next.js 16.2.4 App Router, React 19.2.4, TypeScript strict mode, Node 20 scripts, localStorage for per-user state, Roblox public APIs.

---

## Context

The current product has the right page structure, but `src/data/site.ts` still contains a static `apiSnapshot`. On 2026-06-06, the live Roblox Games API returned newer values than the repo snapshot, so "live" status is currently a trust risk unless refreshed automatically.

Important existing files:

- `src/data/site.ts`: central static config, release facts, placeholder stock and codes.
- `src/app/page.tsx`: home Player Command Center reads `siteConfig.apiSnapshot`.
- `src/app/grow-a-garden-2-release-date/page.tsx`: release page reads `siteConfig.lastVerified`.
- `src/app/grow-a-garden-2-official-link/page.tsx`: official link page reads `siteConfig.apiSnapshot`.
- `src/components/StockTracker.tsx`: client stock filters, no saved watchlist yet.
- `src/components/CodesTool.tsx`: client code board, no alert intent yet.
- `src/components/NightRiskTool.tsx`: client risk calculator, no checklist copy or analytics yet.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts`: SEO foundation already exists.

Roblox public API endpoints to use:

- Place to universe: `https://apis.roblox.com/universes/v1/places/95204935687527/universe`
- Game snapshot: `https://games.roblox.com/v1/games?universeIds=10004943774`
- Votes: `https://games.roblox.com/v1/games/votes?universeIds=10004943774`

## Scope

In scope:

- File-based snapshot storage.
- Refresh script with failure fallback.
- Stale-aware snapshot rendering on Home, Release, and Official Link pages.
- Since-last-visit summary stored only in localStorage.
- Stock watch intent stored only in localStorage.
- Codes first-code alert intent stored only in localStorage.
- Minimal analytics helper with a server endpoint that logs JSON in development and returns `204`.
- `npm run build` verification.

Out of scope:

- Database/KV migration.
- Player count history charts.
- Community stock reports.
- Admin review flow.
- Browser/Discord notifications.
- Calculator save/share/compare.
- Programmatic SEO expansion beyond existing core pages.

## File Structure

Create:

- `data/snapshots/roblox-game.json`: checked-in latest successful Roblox snapshot.
- `scripts/refresh-roblox-snapshot.mjs`: fetches Roblox public APIs and updates the JSON snapshot only on success.
- `src/data/robloxSnapshot.ts`: typed snapshot loader, stale calculation, compact formatting helpers.
- `src/components/RobloxSnapshotCard.tsx`: reusable server component for snapshot status.
- `src/components/ChangeSinceLastVisit.tsx`: client component for localStorage-based return summary.
- `src/components/WatchIntentPanel.tsx`: client component for local stock/code watch intent.
- `src/components/TrackedExternalLink.tsx`: client component for official Roblox outbound link tracking.
- `src/lib/clientAnalytics.ts`: tiny browser helper for fire-and-forget events.
- `src/app/api/events/route.ts`: minimal anonymous event endpoint.

Modify:

- `package.json`: add `refresh:roblox` script.
- `src/data/site.ts`: remove hard-coded `apiSnapshot`, consume typed snapshot.
- `src/app/page.tsx`: replace static command board stats with `RobloxSnapshotCard`, `ChangeSinceLastVisit`, and watch summary entry points.
- `src/app/grow-a-garden-2-release-date/page.tsx`: show the same snapshot and stale state.
- `src/app/grow-a-garden-2-official-link/page.tsx`: show the same snapshot and stale state.
- `src/components/StockTracker.tsx`: add localStorage watch intent panel.
- `src/components/CodesTool.tsx`: add first-code alert intent and fake-code action.
- `src/components/NightRiskTool.tsx`: add copyable AFK checklist and analytics event.
- `src/app/globals.css`: add watch intent layout styles.

---

### Task 1: Add File-Based Roblox Snapshot Refresh

**Files:**

- Create: `data/snapshots/roblox-game.json`
- Create: `scripts/refresh-roblox-snapshot.mjs`
- Modify: `package.json`

- [x] **Step 1: Create the snapshot directory and seed file**

Create `data/snapshots/roblox-game.json` with the latest known successful shape. Use live values from the refresh script when executing; this seed only establishes schema.

```json
{
  "placeId": "95204935687527",
  "universeId": "10004943774",
  "name": "Grow A Garden 2",
  "creator": {
    "id": 71552399,
    "name": "BMWLux",
    "type": "User",
    "hasVerifiedBadge": true
  },
  "playing": 0,
  "visits": 0,
  "favorites": 0,
  "maxPlayers": 50,
  "upVotes": null,
  "downVotes": null,
  "createdAt": "2026-04-07T22:13:54.584Z",
  "robloxUpdatedAt": "2026-06-06T04:51:00.7576573Z",
  "fetchedAt": "2026-06-06T00:00:00.000Z",
  "sourceUrl": "https://games.roblox.com/v1/games?universeIds=10004943774",
  "votesSourceUrl": "https://games.roblox.com/v1/games/votes?universeIds=10004943774",
  "fetchStatus": "success",
  "staleAfterMinutes": 90
}
```

- [x] **Step 2: Create the refresh script**

Create `scripts/refresh-roblox-snapshot.mjs`:

```js
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const PLACE_ID = "95204935687527";
const EXPECTED_UNIVERSE_ID = "10004943774";
const SNAPSHOT_PATH = path.join(process.cwd(), "data", "snapshots", "roblox-game.json");
const UNIVERSE_URL = `https://apis.roblox.com/universes/v1/places/${PLACE_ID}/universe`;
const GAME_URL = `https://games.roblox.com/v1/games?universeIds=${EXPECTED_UNIVERSE_ID}`;
const VOTES_URL = `https://games.roblox.com/v1/games/votes?universeIds=${EXPECTED_UNIVERSE_ID}`;

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "growagarden2.pro snapshot refresh"
    }
  });

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }

  return response.json();
}

function asNumber(value, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

async function readPreviousSnapshot() {
  try {
    return JSON.parse(await readFile(SNAPSHOT_PATH, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const previous = await readPreviousSnapshot();

  const universe = await fetchJson(UNIVERSE_URL);
  const universeId = String(universe.universeId);

  if (universeId !== EXPECTED_UNIVERSE_ID) {
    throw new Error(`Universe mismatch: expected ${EXPECTED_UNIVERSE_ID}, received ${universeId}`);
  }

  const [gameResponse, votesResponse] = await Promise.all([
    fetchJson(GAME_URL),
    fetchJson(VOTES_URL).catch((error) => ({ data: [], error: String(error.message || error) }))
  ]);

  const game = gameResponse?.data?.[0];
  if (!game) {
    throw new Error("Roblox Games API returned no game data");
  }

  const votes = votesResponse?.data?.[0] ?? {};
  const snapshot = {
    placeId: String(game.rootPlaceId ?? PLACE_ID),
    universeId,
    name: String(game.name ?? previous?.name ?? "Grow A Garden 2"),
    creator: {
      id: asNumber(game.creator?.id, previous?.creator?.id ?? 71552399),
      name: String(game.creator?.name ?? previous?.creator?.name ?? "BMWLux"),
      type: String(game.creator?.type ?? previous?.creator?.type ?? "User"),
      hasVerifiedBadge: Boolean(game.creator?.hasVerifiedBadge ?? previous?.creator?.hasVerifiedBadge ?? false)
    },
    playing: asNumber(game.playing),
    visits: asNumber(game.visits),
    favorites: asNumber(game.favoritedCount),
    maxPlayers: asNumber(game.maxPlayers, previous?.maxPlayers ?? 50),
    upVotes: typeof votes.upVotes === "number" ? votes.upVotes : previous?.upVotes ?? null,
    downVotes: typeof votes.downVotes === "number" ? votes.downVotes : previous?.downVotes ?? null,
    createdAt: String(game.created ?? previous?.createdAt ?? ""),
    robloxUpdatedAt: String(game.updated ?? previous?.robloxUpdatedAt ?? ""),
    fetchedAt: new Date().toISOString(),
    sourceUrl: GAME_URL,
    votesSourceUrl: VOTES_URL,
    fetchStatus: "success",
    staleAfterMinutes: 90
  };

  await mkdir(path.dirname(SNAPSHOT_PATH), { recursive: true });
  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Updated Roblox snapshot: playing=${snapshot.playing}, visits=${snapshot.visits}`);
}

main().catch((error) => {
  console.error(`Roblox snapshot refresh failed: ${error.message || error}`);
  process.exitCode = 1;
});
```

- [x] **Step 3: Add the npm script**

Modify `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "refresh:roblox": "node scripts/refresh-roblox-snapshot.mjs"
  }
}
```

- [x] **Step 4: Run the refresh command**

Run:

```powershell
npm run refresh:roblox
```

Expected: command exits `0` and prints a line like:

```text
Updated Roblox snapshot: playing=179, visits=691578
```

Confirm `data/snapshots/roblox-game.json` now has non-zero `playing`, `visits`, `favorites`, and a current `fetchedAt`.

- [ ] **Step 5: Commit checkpoint**

```powershell
git add package.json data/snapshots/roblox-game.json scripts/refresh-roblox-snapshot.mjs
git commit -m "feat: add roblox snapshot refresh"
```

---

### Task 2: Replace Static Snapshot With Typed Snapshot Loader

**Files:**

- Create: `src/data/robloxSnapshot.ts`
- Modify: `src/data/site.ts`

- [x] **Step 1: Create the typed snapshot loader**

Create `src/data/robloxSnapshot.ts`:

```ts
import rawSnapshot from "../../data/snapshots/roblox-game.json";

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
  fetchStatus: "success";
  staleAfterMinutes: number;
};

export type SnapshotView = RobloxSnapshot & {
  ageMinutes: number | null;
  isStale: boolean;
  lastSyncedLabel: string;
};

export const robloxSnapshot = rawSnapshot as RobloxSnapshot;

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function getSnapshotView(now = new Date()): SnapshotView {
  const fetchedAtMs = Date.parse(robloxSnapshot.fetchedAt);
  const ageMinutes = Number.isFinite(fetchedAtMs)
    ? Math.max(0, Math.round((now.getTime() - fetchedAtMs) / 60000))
    : null;

  const isStale = ageMinutes === null || ageMinutes > robloxSnapshot.staleAfterMinutes;
  const lastSyncedLabel = ageMinutes === null
    ? "Sync time unknown"
    : ageMinutes < 1
      ? "Synced just now"
      : `Synced ${ageMinutes} min ago`;

  return {
    ...robloxSnapshot,
    ageMinutes,
    isStale,
    lastSyncedLabel
  };
}
```

- [x] **Step 2: Modify `site.ts` imports**

At the top of `src/data/site.ts`, add:

```ts
import { getSnapshotView } from "@/data/robloxSnapshot";
```

- [x] **Step 3: Replace the hard-coded `apiSnapshot`**

Inside `siteConfig`, replace the current `apiSnapshot` object with:

```ts
  apiSnapshot: getSnapshotView()
```

Keep `robloxPlaceId`, `robloxUniverseId`, `robloxUrl`, `creator`, and `creatorId` as explicit constants so clone guard text remains stable.

- [x] **Step 4: Update fields that use `updated`**

Search:

```powershell
rg -n "apiSnapshot\\.updated|apiSnapshot\\.created" src
```

Expected after this task: no references to `apiSnapshot.updated` or `apiSnapshot.created`. Use `apiSnapshot.robloxUpdatedAt` and `apiSnapshot.createdAt` instead.

- [x] **Step 5: Build**

Run:

```powershell
npm run build
```

Expected: Next build passes with no TypeScript errors.

- [ ] **Step 6: Commit checkpoint**

```powershell
git add src/data/robloxSnapshot.ts src/data/site.ts
git commit -m "feat: load roblox snapshot from refreshed data"
```

---

### Task 3: Add Reusable Snapshot UI

**Files:**

- Create: `src/components/RobloxSnapshotCard.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/grow-a-garden-2-release-date/page.tsx`
- Modify: `src/app/grow-a-garden-2-official-link/page.tsx`

- [x] **Step 1: Create `RobloxSnapshotCard`**

Create `src/components/RobloxSnapshotCard.tsx`:

```tsx
import { formatCompactNumber, type SnapshotView } from "@/data/robloxSnapshot";

type RobloxSnapshotCardProps = {
  snapshot: SnapshotView;
  compact?: boolean;
};

export function RobloxSnapshotCard({ snapshot, compact = false }: RobloxSnapshotCardProps) {
  return (
    <article className="panel">
      <span className={`badge ${snapshot.isStale ? "badge-warning" : "badge-confirmed"}`}>
        {snapshot.isStale ? "Snapshot stale" : "Roblox API snapshot"}
      </span>
      <h2 style={{ marginTop: 14 }}>Live Roblox Status</h2>
      <p className="muted">
        Source: Roblox public API. {snapshot.lastSyncedLabel}. Exact release timing stays unknown unless official sources confirm it.
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
          <strong>{new Date(snapshot.robloxUpdatedAt).toLocaleDateString("en", { month: "short", day: "numeric" })}</strong>
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
```

- [x] **Step 2: Use it on Home**

In `src/app/page.tsx`, import:

```tsx
import { RobloxSnapshotCard } from "@/components/RobloxSnapshotCard";
```

Replace the existing `<div className="panel command-board">...</div>` with:

```tsx
<div className="command-board">
  <RobloxSnapshotCard compact snapshot={siteConfig.apiSnapshot} />
</div>
```

Keep the existing hero CTA buttons unchanged.

- [x] **Step 3: Use it on Release page**

In `src/app/grow-a-garden-2-release-date/page.tsx`, import:

```tsx
import { RobloxSnapshotCard } from "@/components/RobloxSnapshotCard";
```

Add this immediately after the hero section:

```tsx
<section className="section section-tight">
  <RobloxSnapshotCard snapshot={siteConfig.apiSnapshot} />
</section>
```

- [x] **Step 4: Use it on Official Link page**

In `src/app/grow-a-garden-2-official-link/page.tsx`, import:

```tsx
import { RobloxSnapshotCard } from "@/components/RobloxSnapshotCard";
```

Add this before the clone checks section:

```tsx
<section className="section section-tight">
  <RobloxSnapshotCard snapshot={siteConfig.apiSnapshot} />
</section>
```

- [x] **Step 5: Build**

Run:

```powershell
npm run build
```

Expected: build passes and Home, Release, Official Link compile.

- [ ] **Step 6: Commit checkpoint**

```powershell
git add src/components/RobloxSnapshotCard.tsx src/app/page.tsx src/app/grow-a-garden-2-release-date/page.tsx src/app/grow-a-garden-2-official-link/page.tsx
git commit -m "feat: show roblox snapshot across core pages"
```

---

### Task 4: Add Since-Last-Visit Retention Loop

**Files:**

- Create: `src/components/ChangeSinceLastVisit.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: Create the client component**

Create `src/components/ChangeSinceLastVisit.tsx`:

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { SnapshotView } from "@/data/robloxSnapshot";

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

export function ChangeSinceLastVisit({ snapshot }: { snapshot: SnapshotView }) {
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
        setPrevious(JSON.parse(stored) as StoredVisit);
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
              Roblox update: {previous.robloxUpdatedAt === snapshot.robloxUpdatedAt ? "same update timestamp" : "changed since your last visit"}
            </li>
          </ul>
          <button className="button secondary" onClick={clearTracking} type="button">
            Clear local tracking
          </button>
        </>
      ) : (
        <p className="callout">
          Start tracking changes on this device. Next visit will show playing, visits, favorites, and Roblox update changes.
        </p>
      )}
    </article>
  );
}
```

- [x] **Step 2: Render it on Home**

In `src/app/page.tsx`, import:

```tsx
import { ChangeSinceLastVisit } from "@/components/ChangeSinceLastVisit";
```

Add this inside the "Trust loop" section next to the Roblox API snapshot aside, or immediately after the first tool card grid:

```tsx
<ChangeSinceLastVisit snapshot={siteConfig.apiSnapshot} />
```

- [x] **Step 3: Build**

Run:

```powershell
npm run build
```

Expected: build passes. No hydration warning should appear from server time because the component stores the current visit only inside `useEffect`.

- [ ] **Step 4: Commit checkpoint**

```powershell
git add src/components/ChangeSinceLastVisit.tsx src/app/page.tsx
git commit -m "feat: add since-last-visit summary"
```

---

### Task 5: Add Local Watch Intent for Stock and Codes

**Files:**

- Create: `src/components/WatchIntentPanel.tsx`
- Modify: `src/components/StockTracker.tsx`
- Modify: `src/components/CodesTool.tsx`

- [x] **Step 1: Create `WatchIntentPanel`**

Create `src/components/WatchIntentPanel.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export type WatchIntent = {
  id: string;
  label: string;
  description: string;
};

type WatchIntentPanelProps = {
  storageKey: string;
  title: string;
  items: WatchIntent[];
};

export function WatchIntentPanel({ storageKey, title, items }: WatchIntentPanelProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        setSelected(JSON.parse(stored) as string[]);
      } catch {
        setSelected([]);
      }
    }
  }, [storageKey]);

  function toggle(id: string) {
    setSaved(false);
    setSelected((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ));
  }

  function save() {
    window.localStorage.setItem(storageKey, JSON.stringify(selected));
    setSaved(true);
  }

  return (
    <article className="flat-panel">
      <h3>{title}</h3>
      <div className="grid" style={{ marginTop: 12 }}>
        {items.map((item) => (
          <label className="watch-option" key={item.id}>
            <input
              checked={selected.includes(item.id)}
              onChange={() => toggle(item.id)}
              type="checkbox"
            />
            <span>
              <strong>{item.label}</strong>
              <br />
              <span className="muted">{item.description}</span>
            </span>
          </label>
        ))}
      </div>
      <button className="button" onClick={save} style={{ marginTop: 14 }} type="button">
        {saved ? "Saved locally" : "Save watchlist"}
      </button>
    </article>
  );
}
```

- [x] **Step 2: Add CSS for watch options**

In `src/app/globals.css`, add:

```css
.watch-option {
  align-items: flex-start;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding: 12px;
}

.watch-option input {
  margin-top: 3px;
}
```

- [x] **Step 3: Use it in `StockTracker`**

In `src/components/StockTracker.tsx`, import:

```tsx
import { WatchIntentPanel } from "@/components/WatchIntentPanel";
```

Add this after the inventory slots and before the shop tabs:

```tsx
<WatchIntentPanel
  items={[
    { id: "rare_seed", label: "Rare seed", description: "Track rare or event seed availability." },
    { id: "defense_gear", label: "Defense gear", description: "Watch for gear useful before night." },
    { id: "pet_egg", label: "Pet egg", description: "Track egg shop changes once verified." },
    { id: "event_shop", label: "Event shop", description: "Watch limited event stock." },
    { id: "weather_event", label: "Weather/Event", description: "Watch special weather or event states." }
  ]}
  storageKey="gag2:stock-watch-intent"
  title="Your Stock Watchlist Intent"
/>
```

- [x] **Step 4: Use it in `CodesTool`**

In `src/components/CodesTool.tsx`, import:

```tsx
import { WatchIntentPanel } from "@/components/WatchIntentPanel";
```

Add this below the zero-code callout:

```tsx
<WatchIntentPanel
  items={[
    { id: "first_verified_code", label: "First verified GAG2 code", description: "Save intent for the first real code drop." },
    { id: "expired_code_updates", label: "Expired code updates", description: "Track when old codes are rejected or expire." },
    { id: "fake_code_warnings", label: "Fake code warnings", description: "Track scams, surveys, scripts, and fake Robux claims." }
  ]}
  storageKey="gag2:codes-watch-intent"
  title="Code Alert Intent"
/>
```

- [x] **Step 5: Build**

Run:

```powershell
npm run build
```

Expected: build passes and no component imports are unused.

- [ ] **Step 6: Commit checkpoint**

```powershell
git add src/components/WatchIntentPanel.tsx src/components/StockTracker.tsx src/components/CodesTool.tsx src/app/globals.css
git commit -m "feat: add local watch intent"
```

---

### Task 6: Add Minimal Anonymous Analytics

**Files:**

- Create: `src/lib/clientAnalytics.ts`
- Create: `src/app/api/events/route.ts`
- Create: `src/components/TrackedExternalLink.tsx`
- Modify: `src/components/WatchIntentPanel.tsx`
- Modify: `src/components/CodesTool.tsx`
- Modify: `src/components/NightRiskTool.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/grow-a-garden-2-release-date/page.tsx`
- Modify: `src/app/grow-a-garden-2-official-link/page.tsx`

- [x] **Step 1: Create the client helper**

Create `src/lib/clientAnalytics.ts`:

```ts
type AnalyticsPayload = Record<string, string | number | boolean | null>;

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    eventName,
    pagePath: window.location.pathname,
    payload,
    createdAt: new Date().toISOString()
  });

  navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" })) ||
    fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true
    }).catch(() => undefined);
}
```

- [x] **Step 2: Create the event endpoint**

Create `src/app/api/events/route.ts`:

```ts
import { NextResponse } from "next/server";

const allowedEvents = new Set([
  "official_link_click",
  "live_status_view",
  "stock_watchlist_save",
  "code_alert_intent",
  "night_planner_calculate",
  "afk_checklist_copy",
  "returning_user_change_view"
]);

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = typeof body === "object" && body && "eventName" in body
    ? String((body as { eventName: unknown }).eventName)
    : "";

  if (!allowedEvents.has(eventName)) {
    return NextResponse.json({ error: "Unsupported event" }, { status: 400 });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[site-event]", body);
  }

  return new NextResponse(null, { status: 204 });
}
```

- [x] **Step 3: Track watch saves**

In `src/components/WatchIntentPanel.tsx`, import:

```tsx
import { trackEvent } from "@/lib/clientAnalytics";
```

In `save()`, after writing localStorage, add:

```tsx
trackEvent(storageKey.includes("stock") ? "stock_watchlist_save" : "code_alert_intent", {
  selectedCount: selected.length
});
```

- [x] **Step 4: Create tracked external link component**

Create `src/components/TrackedExternalLink.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/clientAnalytics";

type TrackedExternalLinkProps = {
  className?: string;
  children: ReactNode;
  eventName: "official_link_click";
  href: string;
  position: string;
};

export function TrackedExternalLink({ className, children, eventName, href, position }: TrackedExternalLinkProps) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => trackEvent(eventName, { position })}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
```

- [x] **Step 5: Track official link clicks on core pages**

In `src/app/page.tsx`, `src/app/grow-a-garden-2-release-date/page.tsx`, and `src/app/grow-a-garden-2-official-link/page.tsx`, import:

```tsx
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
```

Replace each official Roblox `<a className="button" href={siteConfig.robloxUrl} rel="noreferrer" target="_blank">...</a>` with the component.

Home example:

```tsx
<TrackedExternalLink
  className="button"
  eventName="official_link_click"
  href={siteConfig.robloxUrl}
  position="home_hero"
>
  Enter safe page
</TrackedExternalLink>
```

Release page example:

```tsx
<TrackedExternalLink
  className="button"
  eventName="official_link_click"
  href={siteConfig.robloxUrl}
  position="release_hero"
>
  Open Roblox page
</TrackedExternalLink>
```

Official Link page example:

```tsx
<TrackedExternalLink
  className="button"
  eventName="official_link_click"
  href={siteConfig.robloxUrl}
  position="official_link_hero"
>
  Open Roblox
</TrackedExternalLink>
```

- [x] **Step 6: Track night planner calculation and checklist copy**

In `src/components/NightRiskTool.tsx`, import:

```tsx
import { trackEvent } from "@/lib/clientAnalytics";
```

Add:

```tsx
async function copyChecklist() {
  const checklist = [
    "Harvest high-value crops before leaving.",
    "Check defense gear confidence.",
    "Check guild protection if available.",
    "Avoid scripts, account sharing, or exploit tools."
  ].join("\n");

  await navigator.clipboard.writeText(checklist);
  trackEvent("afk_checklist_copy", { risk: risk.label });
}
```

Add a button in the result panel:

```tsx
<button className="button secondary" onClick={copyChecklist} type="button">
  Copy AFK checklist
</button>
```

Add a `useEffect` that tracks calculator use when risk changes:

```tsx
useEffect(() => {
  trackEvent("night_planner_calculate", { risk: risk.label, value });
}, [risk.label, value]);
```

Also import `useEffect` from React.

- [x] **Step 7: Build**

Run:

```powershell
npm run build
```

Expected: build passes. The endpoint returns `204` for allowed event names.

- [ ] **Step 8: Commit checkpoint**

```powershell
git add src/lib/clientAnalytics.ts src/app/api/events/route.ts src/components/TrackedExternalLink.tsx src/components/WatchIntentPanel.tsx src/components/NightRiskTool.tsx src/app/page.tsx src/app/grow-a-garden-2-release-date/page.tsx src/app/grow-a-garden-2-official-link/page.tsx
git commit -m "feat: add minimal anonymous analytics"
```

---

### Task 7: Final Verification and Documentation Sync

**Files:**

- Modify: `docs/gag2-growth-retention-prd.md`
- Optional modify: `README.md`

- [x] **Step 1: Refresh snapshot one final time**

Run:

```powershell
npm run refresh:roblox
```

Expected: `data/snapshots/roblox-game.json` has a fresh `fetchedAt`.

- [x] **Step 2: Build**

Run:

```powershell
npm run build
```

Expected: build passes.

- [x] **Step 3: Start local server for acceptance**

Run:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

Acceptance checks:

- Home shows official Roblox CTA in first viewport.
- Home shows playing, visits, favorites, Roblox updated, and last synced.
- Home shows since-last-visit state; after refresh, it shows changes or "no change".
- Stock Tracker saves watch intent after refresh.
- Codes page saves first-code alert intent.
- Night planner can copy AFK checklist.
- Release page and Official Link page show the same snapshot values as Home.
- No page claims unverified stock, codes, or exact release schedule.

- [x] **Step 4: Update PRD status note**

In `docs/gag2-growth-retention-prd.md`, add a short implementation note under section 16 after P0 is complete:

```md
Implementation note: P0 Snapshot Command Center shipped with file-based Roblox snapshot refresh, local since-last-visit tracking, local watch intent, and minimal event capture. Database, community reports, notifications, and history charts remain P1.
```

- [ ] **Step 5: Commit final docs and snapshot**

```powershell
git add data/snapshots/roblox-game.json docs/gag2-growth-retention-prd.md README.md
git commit -m "docs: mark snapshot command center plan progress"
```

Only include `README.md` if it was actually changed.

---

## Self-Review Checklist

- [x] Every P0 item in the narrowed PRD has a task: snapshot automation, command center, official link consistency, since-last-visit, watch intent, night planner lite, minimal analytics.
- [x] No task introduces Roblox login, auto-join, exploit/script behavior, virtual item trading, or unverified stock/code claims.
- [x] File-based storage is used first; database/KV remains P1.
- [x] Every user-facing data claim has source/stale language.
- [x] Every task has a build or direct acceptance check.
- [x] The final local server acceptance includes mobile-friendly first-viewport review before shipping.
