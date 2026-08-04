import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const PLACE_ID = "97598239454123";
const EXPECTED_UNIVERSE_ID = "10200395747";
const SNAPSHOT_PATH = path.join(process.cwd(), "data", "snapshots", "roblox-game.json");
const UNIVERSE_URL = `https://apis.roblox.com/universes/v1/places/${PLACE_ID}/universe`;
const GAME_URL = `https://games.roblox.com/v1/games?universeIds=${EXPECTED_UNIVERSE_ID}`;
const VOTES_URL = `https://games.roblox.com/v1/games/votes?universeIds=${EXPECTED_UNIVERSE_ID}`;
const SUCCESS_DETAIL = "Roblox Games API returned public game data.";
const API_EMPTY_DETAIL = "Roblox Games API returned no public game data for the tracked universe.";

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

async function writeSnapshot(snapshot) {
  await mkdir(path.dirname(SNAPSHOT_PATH), { recursive: true });
  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
}

async function writeFailureSnapshot(previous, fetchStatus, currentStatusDetail) {
  if (!previous) {
    return false;
  }

  const lastSuccessfulFetchedAt = previous.lastSuccessfulFetchedAt ?? previous.fetchedAt;
  const snapshot = {
    ...previous,
    fetchStatus,
    currentCheckAt: new Date().toISOString(),
    currentStatusDetail,
    ...(lastSuccessfulFetchedAt ? { lastSuccessfulFetchedAt } : {})
  };

  await writeSnapshot(snapshot);
  return true;
}

async function handleRefreshFailure(previous, fetchStatus, detail) {
  const wroteSnapshot = await writeFailureSnapshot(previous, fetchStatus, detail);
  console.error(`Roblox snapshot refresh failed: ${detail}`);

  if (wroteSnapshot) {
    console.error(`Preserved last successful Roblox snapshot with fetchStatus=${fetchStatus}.`);
  } else {
    console.error("No previous Roblox snapshot was available; no snapshot file was fabricated.");
  }

  process.exitCode = 1;
}

async function main() {
  const previous = await readPreviousSnapshot();

  try {
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
      await handleRefreshFailure(previous, "api_empty", API_EMPTY_DETAIL);
      return;
    }

    const votes = votesResponse?.data?.[0] ?? {};
    const fetchedAt = new Date().toISOString();
    const snapshot = {
      placeId: String(game.rootPlaceId ?? PLACE_ID),
      universeId,
      name: String(game.name ?? previous?.name ?? "Grow A Garden 2"),
      creator: {
        id: asNumber(game.creator?.id, previous?.creator?.id ?? 432538536),
        name: String(game.creator?.name ?? previous?.creator?.name ?? "Strawberreh Squad"),
        type: String(game.creator?.type ?? previous?.creator?.type ?? "Group"),
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
      fetchedAt,
      sourceUrl: GAME_URL,
      votesSourceUrl: VOTES_URL,
      fetchStatus: "success",
      staleAfterMinutes: 90,
      currentCheckAt: fetchedAt,
      currentStatusDetail: SUCCESS_DETAIL,
      lastSuccessfulFetchedAt: fetchedAt
    };

    await writeSnapshot(snapshot);
    console.log(`Updated Roblox snapshot: playing=${snapshot.playing}, visits=${snapshot.visits}`);
  } catch (error) {
    await handleRefreshFailure(previous, "fetch_failed", String(error.message || error));
  }
}

main().catch((error) => {
  console.error(`Roblox snapshot refresh failed: ${String(error.message || error)}`);
  process.exitCode = 1;
});
