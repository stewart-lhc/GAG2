# GAG2 Roblox Status Hotfix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prevent growagarden2.pro from presenting a stale Roblox experience snapshot or currently unavailable Roblox link as freshly verified.

**Architecture:** Keep the fix file-based and static-build compatible. The refresh script records the latest check outcome without deleting the last successful snapshot, typed helpers expose freshness and availability labels, and user-facing pages switch from "official link verified" to "last successful verification + current check needs review" when Roblox returns no public game data.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Node 20 scripts, checked-in JSON snapshot, Roblox public APIs.

---

## Context

On 2026-06-23/24, the production site was reachable, but the tracked Roblox URL returned `404 Page Not found`, `https://games.roblox.com/v1/games?universeIds=10004943774` returned `{"data":[]}`, and `npm run refresh:roblox` failed with `Roblox Games API returned no game data`.

Existing production pages still rendered a 2026-06-07 successful snapshot and copy such as "Official link verified", which is a trust risk. This plan fixes the trust boundary without adding a database, notifications, or a large redesign.

Do not modify the existing unrelated local change in `docs/Grow_a_Garden_2_Tools_Hub_MVP_PRD.md`.

## File Structure

Modify:

- `data/snapshots/roblox-game.json`: add current check metadata while preserving last successful numeric snapshot values.
- `scripts/refresh-roblox-snapshot.mjs`: write `api_empty` or `fetch_failed` status instead of exiting before the JSON records the current check.
- `src/data/robloxSnapshot.ts`: widen `fetchStatus`, add derived helpers for freshness/status labels.
- `src/data/site.ts`: update release facts and source freshness to avoid "page exists" as a current confirmed claim.
- `src/components/RobloxSnapshotCard.tsx`: show current check status, last successful sync, and stale warning clearly.
- `src/components/SiteHeader.tsx`: soften global Roblox CTA text.
- `src/components/SourceList.tsx`: show status-appropriate source badges.
- `src/app/page.tsx`: soften hero badges and CTA copy.
- `src/app/grow-a-garden-2-release-date/page.tsx`: state that exact current availability is not confirmed.
- `src/app/grow-a-garden-2-official-link/page.tsx`: state that the tracked link must be re-checked before joining.
- `src/app/layout.tsx`, `public/llms.txt`, `README.md`: update metadata and agent-facing/public docs so they do not repeat stale verification claims.

Verification:

- `npm run build`
- `npm run refresh:roblox` should update JSON and exit non-zero when current game data is missing.
- `git diff --check`

---

### Task 1: Preserve Last Successful Snapshot And Record Current Check Failure

**Files:**

- Modify: `scripts/refresh-roblox-snapshot.mjs`
- Modify: `data/snapshots/roblox-game.json`
- Modify: `src/data/robloxSnapshot.ts`

- [x] **Step 1: Widen snapshot status types**

Add:

```ts
export type RobloxFetchStatus = "success" | "stale" | "not_found" | "api_empty" | "fetch_failed";
```

Add optional fields:

```ts
currentCheckAt?: string;
currentStatusDetail?: string;
lastSuccessfulFetchedAt?: string;
```

- [x] **Step 2: Add derived status helpers**

Add `getSnapshotAgeMinutes(snapshot)` and `getSnapshotStatus(snapshot)` so UI code can show `Needs re-check` when the current check is not a fresh success.

- [x] **Step 3: Make the refresh script persist failure state**

On success, write `fetchStatus: "success"`, `currentCheckAt`, `currentStatusDetail`, and `lastSuccessfulFetchedAt`.

When the Games API returns no `data[0]`, write the previous snapshot back with:

```js
{
  ...previous,
  fetchStatus: "api_empty",
  currentCheckAt: new Date().toISOString(),
  currentStatusDetail: "Roblox Games API returned no public game data for the tracked universe.",
  lastSuccessfulFetchedAt: previous?.lastSuccessfulFetchedAt ?? previous?.fetchedAt
}
```

For thrown network/API errors, write `fetchStatus: "fetch_failed"` with the error message. If there is no previous snapshot, exit non-zero without fabricating values.

- [x] **Step 4: Run the refresh command**

Run:

```powershell
npm run refresh:roblox
```

Expected today: non-zero exit with a clear failure message, and `data/snapshots/roblox-game.json` updated to `fetchStatus: "api_empty"` or `fetchStatus: "fetch_failed"` while preserving last successful values.

---

### Task 2: Update Snapshot UI And Source Badges

**Files:**

- Modify: `src/components/RobloxSnapshotCard.tsx`
- Modify: `src/components/SourceList.tsx`
- Modify: `src/components/SiteHeader.tsx`

- [x] **Step 1: Use central snapshot status helper in the card**

Render a warning badge and message when `getSnapshotStatus(snapshot).isStale` is true. Keep the numeric values visible as the last successful snapshot, not as current live availability.

- [x] **Step 2: Soften global header CTA**

Change the global CTA from `Open Roblox` to `Check Roblox`.

- [x] **Step 3: Make source badges status-aware**

Render `Needs re-check` source badges when the current snapshot is not a fresh success.

---

### Task 3: Update User-Facing Availability Copy

**Files:**

- Modify: `src/data/site.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/grow-a-garden-2-release-date/page.tsx`
- Modify: `src/app/grow-a-garden-2-official-link/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `public/llms.txt`
- Modify: `README.md`

- [x] **Step 1: Update central facts**

Downgrade the Roblox page/API facts from current confirmed claims to last-successful/needs-review claims.

- [x] **Step 2: Update homepage hero**

Replace `Official link verified`, `Open the verified Roblox page`, and `Enter safe page` with re-check copy.

- [x] **Step 3: Update release page**

State that the experience page was previously tracked and current public availability must be re-checked.

- [x] **Step 4: Update official-link page**

Change the page to `Roblox Link Guard` / `Re-Check Rule` framing and warn that a 404 or unavailable page is not a safe live game signal.

- [x] **Step 5: Update metadata and docs**

Update `layout.tsx`, `public/llms.txt`, and `README.md` to avoid stale verified-link claims.

---

### Task 4: Verify Build And Runtime Behavior

**Files:**

- No planned source edits.

- [x] **Step 1: Run build**

Run:

```powershell
npm run build
```

Expected: Next.js build succeeds.

- [x] **Step 2: Verify current refresh behavior**

Run:

```powershell
npm run refresh:roblox
```

Expected today: command exits non-zero because Roblox returns no public game data, but `data/snapshots/roblox-game.json` records `currentCheckAt`, `currentStatusDetail`, and preserves the last successful values.

- [x] **Step 3: Check diff scope**

Run:

```powershell
git diff --check
git status --short
```

Expected: only planned files plus the pre-existing PRD doc change are listed. Do not stage or revert the unrelated PRD doc change.

---

## Self-Review

- Spec coverage: The plan covers stale status modeling, refresh failure persistence, public copy, metadata/doc updates, and build verification.
- Placeholder scan: No `TBD`, `TODO`, or "implement later" placeholders are present.
- Type consistency: `fetchStatus`, `currentCheckAt`, `currentStatusDetail`, and `lastSuccessfulFetchedAt` are defined in Task 1 before UI tasks consume them.
