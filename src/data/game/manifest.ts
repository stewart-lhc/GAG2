import {
  entityRecords,
  mutationRecords,
  plantRecords,
  unverifiedEntityFixture,
  type EntityRecord
} from "./entities";
import { evidenceRecords } from "./evidence";
import { formulaRecords } from "./formulas";
import { restockCycleRecords } from "./restock-cycles";
import { shopObservations } from "./shop";
import { relativeTradeValueObservations, valueObservations } from "./values";

export type EntityManifestEntry = {
  entityId: string;
  selectable: boolean;
  defaultCalculationEligible: boolean;
  exclusionReason?: string;
};

export type GameDataManifest = {
  id: string;
  manifestVersion: string;
  gameVersion: string | "unknown";
  entries: EntityManifestEntry[];
};

export const gameDataManifest: GameDataManifest = {
  id: "gag2-game-data-manifest",
  manifestVersion: "evidence-01-r6906-r6865-r6848",
  gameVersion: "GAG2-live-2026-08-03",
  entries: [
    ...plantRecords.map((plant) => ({ entityId: plant.id, selectable: true, defaultCalculationEligible: true })),
    ...mutationRecords.map((mutation) => ({ entityId: mutation.id, selectable: mutation.selectable, defaultCalculationEligible: mutation.selectable })),
    ...entityRecords
      .filter((entity) => entity.entityType === "pet")
      .map((pet) => ({ entityId: pet.id, selectable: true, defaultCalculationEligible: false })),
    ...entityRecords
      .filter((entity) => entity.entityType === "seed" || entity.entityType === "gear")
      .map((item) => ({ entityId: item.id, selectable: true, defaultCalculationEligible: false })),
    {
      entityId: unverifiedEntityFixture.id,
      selectable: false,
      defaultCalculationEligible: false,
      exclusionReason: "Fixture only: no verified GAG2 entity evidence."
    }
  ]
};

export const gameDataLedger = {
  entities: [...entityRecords, unverifiedEntityFixture],
  values: [...valueObservations, ...relativeTradeValueObservations],
  shopObservations,
  formulas: formulaRecords,
  restockCycles: restockCycleRecords,
  evidence: evidenceRecords,
  manifest: gameDataManifest
};

export function getSelectableEntities(
  entities: readonly EntityRecord[] = gameDataLedger.entities,
  manifest: GameDataManifest = gameDataManifest
) {
  const selectableIds = new Set(manifest.entries.filter((entry) => entry.selectable).map((entry) => entry.entityId));
  return entities.filter((entity) => selectableIds.has(entity.id));
}
