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

export const robloxSnapshot = rawSnapshot as RobloxSnapshot;

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}
