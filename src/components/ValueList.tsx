"use client";

import { useMemo, useState } from "react";
import { entityRecords } from "@/data/game/entities";
import { evidenceRecords } from "@/data/game/evidence";
import { gameDataManifest } from "@/data/game/manifest";
import { values } from "@/data/game/values";
import { calculateValueCoverage } from "@/lib/calculators/value-list";

type SortMode = "name" | "value-asc" | "value-desc" | "verified";

const entityById = new Map(entityRecords.map((entity) => [entity.id, entity]));
const evidenceById = new Map(evidenceRecords.map((evidence) => [evidence.id, evidence]));

const rows = values.flatMap((observation) => {
  const entity = entityById.get(observation.entityId);
  const manifestEntry = gameDataManifest.entries.find((entry) => entry.entityId === observation.entityId);

  if (
    !entity ||
    !manifestEntry?.selectable ||
    entity.verificationState !== "confirmed" ||
    observation.verificationState !== "confirmed"
  ) {
    return [];
  }

  return [{ entity, observation, evidence: observation.evidenceIds.map((id) => evidenceById.get(id)).filter(Boolean) }];
});

export function ValueList() {
  const [query, setQuery] = useState("");
  const [entityType, setEntityType] = useState("all");
  const [valueType, setValueType] = useState("all");
  const [sort, setSort] = useState<SortMode>("name");

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows
      .filter(({ entity, observation }) => {
        const matchesQuery =
          !normalizedQuery ||
          entity.name.toLowerCase().includes(normalizedQuery) ||
          entity.aliases.some((alias) => alias.toLowerCase().includes(normalizedQuery));
        const matchesEntityType = entityType === "all" || entity.entityType === entityType;
        const matchesValueType = valueType === "all" || observation.valueType === valueType;
        return matchesQuery && matchesEntityType && matchesValueType;
      })
      .sort((left, right) => {
        if (sort === "value-asc") return left.observation.value - right.observation.value;
        if (sort === "value-desc") return right.observation.value - left.observation.value;
        if (sort === "verified") {
          return Date.parse(right.observation.verifiedAt) - Date.parse(left.observation.verifiedAt);
        }
        return left.entity.name.localeCompare(right.entity.name);
      });
  }, [entityType, query, sort, valueType]);

  const coverage = calculateValueCoverage(
    rows.map(({ entity }) => entity.id),
    gameDataManifest.entries.filter((entry) => entry.selectable).map((entry) => entry.entityId),
  );

  return (
    <div className="market-shell">
      <div className="panel">
        <span className="badge badge-confirmed">Current values</span>
        <h2 style={{ marginTop: 14 }}>Find a plant, pet, or gear</h2>
        <p className="muted">
          {coverage.verifiedEntityCount} of {coverage.selectableEntityCount} selectable items have a usable value ({coverage.observationCount} records). Missing items stay blank instead of becoming zero.
        </p>
        <div className="grid" style={{ marginTop: 14 }}>
          <div className="field">
            <label htmlFor="value-search">Search name</label>
            <input
              className="input"
              id="value-search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Moon Bloom or Bunny"
              type="search"
              value={query}
            />
          </div>
          <div className="field">
            <label htmlFor="entity-type">Type</label>
            <select className="select" id="entity-type" onChange={(event) => setEntityType(event.target.value)} value={entityType}>
              <option value="all">All</option><option value="plant">Plant</option><option value="seed">Seed</option><option value="fruit">Fruit</option><option value="pet">Pet</option><option value="gear">Gear</option><option value="mutation">Mutation</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="value-type">Value type</label>
            <select className="select" id="value-type" onChange={(event) => setValueType(event.target.value)} value={valueType}>
              <option value="all">All</option><option value="base_value">Base sell value (Sheckles)</option><option value="relative_trade_value">Trade reference</option><option value="weight">Weight</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="value-sort">Sort</label>
            <select className="select" id="value-sort" onChange={(event) => setSort(event.target.value as SortMode)} value={sort}>
              <option value="name">Name</option><option value="value-asc">Value: low to high</option><option value="value-desc">Value: high to low</option><option value="verified">Recently updated</option>
            </select>
          </div>
        </div>
      </div>

      {filteredRows.length === 0 ? (
        <div className="callout" style={{ marginTop: 18 }}>
          <strong>No items match those filters.</strong>
          <p>
            Try another name or filter.
          </p>
        </div>
      ) : (
        <div className="table-wrap value-results-table-wrap" style={{ marginTop: 18 }}>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Type</th><th>Value type</th><th>Value</th><th>Updated</th><th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(({ entity, observation, evidence }) => (
                <tr id={`value-row-${entity.id}-${observation.valueType}`} key={`${entity.id}-${observation.valueType}`}>
                  <td data-label="Name">{entity.name}</td>
                  <td data-label="Type">{entity.entityType}</td>
                  <td data-label="Value type">{observation.valueType === "base_value" ? "Base sell value" : observation.valueType === "relative_trade_value" ? "Trade reference" : observation.valueType === "weight" ? "Weight" : observation.valueType.replaceAll("_", " ")}</td>
                  <td data-label="Value">{observation.value.toLocaleString()} {observation.unit ?? "in-game units"}</td>
                  <td data-label="Updated">{observation.verifiedAt}</td>
                  <td data-label="Source">{evidence.map((item, index) => item ? <span key={item.id}>{index > 0 ? ", " : ""}<a href={item.sourceUrl} rel="noreferrer" target="_blank">Open source</a></span> : null)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
