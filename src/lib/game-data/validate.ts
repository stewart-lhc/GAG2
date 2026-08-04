import type { EntityRecord, PlantRecord, VerificationState } from "@/data/game/entities";
import type { EvidenceRecord } from "@/data/game/evidence";
import type { FormulaRecord } from "@/data/game/formulas";
import {
  gameDataLedger,
  type EntityManifestEntry,
  type GameDataManifest
} from "@/data/game/manifest";
import type { RestockCycleRecord } from "@/data/game/restock-cycles";
import type { ShopObservation } from "@/data/game/shop";
import type { ValueObservation } from "@/data/game/values";

export type GameDataContractIssue = {
  code:
    | "duplicate_id"
    | "missing_evidence"
    | "missing_manifest_entity"
    | "unknown_entity"
    | "unknown_game_version"
    | "invalid_timestamp"
    | "invalid_number"
    | "invalid_formula"
    | "invalid_restock_cycle"
    | "invalid_shop_observation";
  recordType: "entity" | "value" | "formula" | "restock" | "shop" | "evidence" | "manifest";
  recordId: string;
  message: string;
};

export type GameDataContract = {
  entities: readonly EntityRecord[];
  values: readonly ValueObservation[];
  formulas: readonly FormulaRecord[];
  restockCycles: readonly RestockCycleRecord[];
  shopObservations: readonly ShopObservation[];
  evidence: readonly EvidenceRecord[];
  manifest: GameDataManifest;
};

const defaultContract: GameDataContract = gameDataLedger;

function isValidTimestamp(value: string) {
  return value.length > 0 && Number.isFinite(Date.parse(value));
}

function hasKnownVersion(gameVersion: string | "unknown") {
  return gameVersion !== "unknown";
}

function hasEvidence(evidenceIds: readonly string[], evidenceById: ReadonlySet<string>) {
  return evidenceIds.length > 0 && evidenceIds.every((id) => evidenceById.has(id));
}

function addDuplicateIdIssues(
  issues: GameDataContractIssue[],
  recordType: GameDataContractIssue["recordType"],
  records: readonly { id: string }[]
) {
  const seen = new Set<string>();
  for (const record of records) {
    if (seen.has(record.id)) {
      issues.push({
        code: "duplicate_id",
        recordType,
        recordId: record.id,
        message: `${recordType} id must be unique.`
      });
    }
    seen.add(record.id);
  }
}

function validateSelectableEntry(
  issues: GameDataContractIssue[],
  entry: EntityManifestEntry,
  entityById: ReadonlyMap<string, EntityRecord>,
  evidenceById: ReadonlySet<string>
) {
  const entity = entityById.get(entry.entityId);
  if (!entity) {
    issues.push({
      code: "missing_manifest_entity",
      recordType: "manifest",
      recordId: entry.entityId,
      message: "Manifest entry references an entity that is not in the entity ledger."
    });
    return;
  }

  if (!entry.selectable && !entry.defaultCalculationEligible) {
    return;
  }

  if (entity.verificationState === "unknown" || entity.verificationState === "stale") {
    issues.push({
      code: "unknown_entity",
      recordType: "manifest",
      recordId: entry.entityId,
      message: "Unknown or stale entities cannot be selectable or used by default calculations."
    });
  }

  if (!hasEvidence(entity.evidenceIds, evidenceById)) {
    issues.push({
      code: "missing_evidence",
      recordType: "manifest",
      recordId: entry.entityId,
      message: "Selectable or default-calculation entities require valid evidence ids."
    });
  }
}

function validateEntityEvidence(
  issues: GameDataContractIssue[],
  entity: EntityRecord,
  evidenceById: ReadonlySet<string>
) {
  if (!entity.sourceUrl || !hasEvidence(entity.evidenceIds, evidenceById)) {
    issues.push({
      code: "missing_evidence",
      recordType: "entity",
      recordId: entity.id,
      message: "Every published entity requires a source URL and valid field-level evidence."
    });
  }

  const plant = entity as Partial<PlantRecord>;
  if (plant.entityType === "plant" && plant.minimumSellValue !== undefined) {
    const hasCarrotFloorEvidence = entity.id === "plant-carrot" && entity.evidenceIds.includes("fandom-mechanics-r6865");
    if (!Number.isFinite(plant.minimumSellValue) || plant.minimumSellValue < 0 || !hasCarrotFloorEvidence) {
      issues.push({
        code: "invalid_number",
        recordType: "entity",
        recordId: entity.id,
        message: "A plant minimum sell value is publishable only when explicitly supported by its evidence."
      });
    }
  }
}

function isDefaultCalculationEligible(
  verificationState: VerificationState,
  gameVersion: string | "unknown",
  evidenceIds: readonly string[],
  evidenceById: ReadonlySet<string>
) {
  return (
    verificationState === "confirmed" &&
    hasKnownVersion(gameVersion) &&
    hasEvidence(evidenceIds, evidenceById)
  );
}

export function validateGameDataContract(contract: GameDataContract = defaultContract) {
  const issues: GameDataContractIssue[] = [];
  const evidenceById = new Set(contract.evidence.map((record) => record.id));
  const entityById = new Map(contract.entities.map((record) => [record.id, record]));

  addDuplicateIdIssues(issues, "entity", contract.entities);
  addDuplicateIdIssues(issues, "formula", contract.formulas);
  addDuplicateIdIssues(issues, "restock", contract.restockCycles);
  addDuplicateIdIssues(issues, "shop", contract.shopObservations);
  addDuplicateIdIssues(issues, "evidence", contract.evidence);

  for (const entity of contract.entities) {
    // The deliberately non-publishable fixture exists to exercise exclusion.
    if (entity.id !== "fixture-unverified-plant") validateEntityEvidence(issues, entity, evidenceById);
  }

  for (const record of contract.evidence) {
    if (!isValidTimestamp(record.observedAt) || !isValidTimestamp(record.verifiedAt)) {
      issues.push({
        code: "invalid_timestamp",
        recordType: "evidence",
        recordId: record.id,
        message: "Evidence observedAt and verifiedAt must be valid timestamps."
      });
    }
    if (!record.sourceUrl || !record.licenseOrUsageNote || record.capturedFields.length === 0) {
      issues.push({
        code: "missing_evidence",
        recordType: "evidence",
        recordId: record.id,
        message: "Evidence requires a source URL, usage note, and captured fields."
      });
    }
  }

  for (const entry of contract.manifest.entries) {
    validateSelectableEntry(issues, entry, entityById, evidenceById);
  }

  for (const value of contract.values) {
    if (!entityById.has(value.entityId)) {
      issues.push({
        code: "unknown_entity",
        recordType: "value",
        recordId: value.entityId,
        message: "A value observation must reference a ledger entity."
      });
    }
    if (!Number.isFinite(value.value)) {
      issues.push({
        code: "invalid_number",
        recordType: "value",
        recordId: value.entityId,
        message: "Value observations must contain finite numbers."
      });
    }
    if (!hasEvidence(value.evidenceIds, evidenceById)) {
      issues.push({
        code: "missing_evidence",
        recordType: "value",
        recordId: value.entityId,
        message: "Value observations require field-level evidence."
      });
    }
    if (!hasKnownVersion(value.gameVersion)) {
      issues.push({
        code: "unknown_game_version",
        recordType: "value",
        recordId: value.entityId,
        message: "Unknown-version values cannot be published or used by default."
      });
    }
    if (!isValidTimestamp(value.verifiedAt)) {
      issues.push({
        code: "invalid_timestamp",
        recordType: "value",
        recordId: value.entityId,
        message: "Value observations require a valid verifiedAt timestamp."
      });
    }
  }

  for (const formula of contract.formulas) {
    if (!hasEvidence(formula.evidenceIds, evidenceById) || formula.goldenExamples.length === 0) {
      issues.push({
        code: "invalid_formula",
        recordType: "formula",
        recordId: formula.id,
        message: "Formulas require valid evidence and at least one golden example."
      });
    }
    if (!hasKnownVersion(formula.gameVersion)) {
      issues.push({
        code: "unknown_game_version",
        recordType: "formula",
        recordId: formula.id,
        message: "Unknown-version formulas cannot be used by default."
      });
    }
  }

  for (const cycle of contract.restockCycles) {
    const timestamps = [cycle.anchorAt, cycle.effectiveFrom, cycle.lastObservedAt];
    if (cycle.effectiveTo) timestamps.push(cycle.effectiveTo);
    if (
      !hasEvidence(cycle.evidenceIds, evidenceById) ||
      cycle.goldenExamples.length === 0 ||
      !Number.isFinite(cycle.intervalSeconds) ||
      cycle.intervalSeconds <= 0 ||
      !Number.isFinite(cycle.staleAfterSeconds) ||
      cycle.staleAfterSeconds <= 0 ||
      timestamps.some((timestamp) => !isValidTimestamp(timestamp))
    ) {
      issues.push({
        code: "invalid_restock_cycle",
        recordType: "restock",
        recordId: cycle.id,
        message: "Restock cycles require evidence, valid timestamps, positive intervals, and golden examples."
      });
    }
    if (cycle.verificationState !== "confirmed" || !hasKnownVersion(cycle.gameVersion)) {
      issues.push({
        code: "unknown_game_version",
        recordType: "restock",
        recordId: cycle.id,
        message: "Only confirmed, versioned restock cycles can be used by default."
      });
    }
  }

  for (const observation of contract.shopObservations) {
    if (
      !Number.isFinite(observation.price) ||
      observation.price < 0 ||
      !observation.currency ||
      !observation.name ||
      !observation.rarity ||
      !observation.stockAmount ||
      !observation.restockChance ||
      !isValidTimestamp(observation.verifiedAt) ||
      !hasKnownVersion(observation.gameVersion) ||
      observation.verificationState !== "confirmed" ||
      !hasEvidence(observation.evidenceIds, evidenceById) ||
      (observation.entityId !== undefined && !entityById.has(observation.entityId))
    ) {
      issues.push({
        code: "invalid_shop_observation",
        recordType: "shop",
        recordId: observation.id,
        message: "Published shop rows require versioned evidence, valid price/currency, availability fields, and confirmed status."
      });
    }
  }

  return issues;
}

export function assertValidGameDataContract(contract: GameDataContract = defaultContract) {
  const issues = validateGameDataContract(contract);
  if (issues.length > 0) {
    throw new Error(`Invalid GAG2 game-data contract: ${issues.map((issue) => issue.code).join(", ")}`);
  }
}

export function getDefaultCalculationValues(contract: GameDataContract = defaultContract) {
  const evidenceById = new Set(contract.evidence.map((record) => record.id));
  return contract.values.filter((value) =>
    isDefaultCalculationEligible(
      value.verificationState,
      value.gameVersion,
      value.evidenceIds,
      evidenceById
    )
  );
}

export function getDefaultCalculationFormulas(contract: GameDataContract = defaultContract) {
  const evidenceById = new Set(contract.evidence.map((record) => record.id));
  return contract.formulas.filter(
    (formula) =>
      hasKnownVersion(formula.gameVersion) &&
      hasEvidence(formula.evidenceIds, evidenceById) &&
      formula.goldenExamples.length > 0
  );
}

export function getDefaultRestockCycles(contract: GameDataContract = defaultContract) {
  const evidenceById = new Set(contract.evidence.map((record) => record.id));
  return contract.restockCycles.filter(
    (cycle) =>
      cycle.verificationState === "confirmed" &&
      hasKnownVersion(cycle.gameVersion) &&
      hasEvidence(cycle.evidenceIds, evidenceById) &&
      cycle.goldenExamples.length > 0 &&
      Number.isFinite(cycle.intervalSeconds) &&
      cycle.intervalSeconds > 0 &&
      Number.isFinite(cycle.staleAfterSeconds) &&
      cycle.staleAfterSeconds > 0
  );
}
