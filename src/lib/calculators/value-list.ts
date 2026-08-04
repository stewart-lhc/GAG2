export interface ValueCoverage {
  verifiedEntityCount: number;
  selectableEntityCount: number;
  observationCount: number;
  percentage: number;
}

export function calculateValueCoverage(
  verifiedObservationEntityIds: readonly string[],
  selectableEntityIds: readonly string[],
): ValueCoverage {
  const selectableIds = new Set(selectableEntityIds);
  const verifiedEntityIds = new Set(
    verifiedObservationEntityIds.filter((entityId) => selectableIds.has(entityId)),
  );

  return {
    verifiedEntityCount: verifiedEntityIds.size,
    selectableEntityCount: selectableIds.size,
    observationCount: verifiedObservationEntityIds.length,
    percentage:
      selectableIds.size === 0
        ? 0
        : Math.round((verifiedEntityIds.size / selectableIds.size) * 100),
  };
}
