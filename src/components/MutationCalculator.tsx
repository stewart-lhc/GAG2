"use client";

import { useMemo, useState } from "react";
import { getSelectableMutations, getSelectablePlants } from "@/data/game/entities";
import { calculateMutationValue, formatMutationValue } from "@/lib/calculators/mutation";

const mutations = getSelectableMutations();
const plants = getSelectablePlants();

export function MutationCalculator() {
  const [plantId, setPlantId] = useState(plants[0]?.id ?? "");
  const [baseValue, setBaseValue] = useState(String(plants[0]?.baseSellValue ?? 100));
  const [mutationId, setMutationId] = useState(mutations[0]?.id ?? "");
  const plant = plants.find((item) => item.id === plantId) ?? plants[0];
  const mutation = mutations.find((item) => item.id === mutationId) ?? mutations[0];
  const result = useMemo(
    () => calculateMutationValue({ baseValue: Number(baseValue), plant, mutation }),
    [baseValue, mutation, plant]
  );

  function selectPlant(id: string) {
    const nextPlant = plants.find((item) => item.id === id);
    setPlantId(id);
    if (nextPlant) setBaseValue(String(nextPlant.baseSellValue));
  }

  return (
    <div>
      <div className="callout">
        <strong>One crop, one mutation.</strong> Mutations do not stack; single-harvest crops receive only part of the bonus.
      </div>
      <div className="two-col" style={{ marginTop: 22 }}>
        <section className="panel">
          <span className="badge badge-confirmed">Current game data</span>
          <h2 style={{ marginTop: 14 }}>Choose a plant and mutation</h2>
          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor="mutation-plant">Plant</label>
            <select
              className="select"
              id="mutation-plant"
              onChange={(event) => selectPlant(event.target.value)}
              value={plantId}
            >
              {plants.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {item.harvestType === "single" ? "single harvest" : "multi harvest"}
                </option>
              ))}
            </select>
          </div>
          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor="mutation-base-value">Base sell value</label>
            <input
              className="input"
              id="mutation-base-value"
              min="0"
              onChange={(event) => setBaseValue(event.target.value)}
              step="any"
              type="number"
              value={baseValue}
            />
            <small className="muted">Loaded from this plant; edit it if your game shows a different value.</small>
          </div>
          <div className="field" style={{ marginTop: 16 }}>
            <label htmlFor="mutation-select">Mutation</label>
            <select
              className="select"
              id="mutation-select"
              onChange={(event) => setMutationId(event.target.value)}
              value={mutationId}
            >
              {mutations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.multiplier}×)
                </option>
              ))}
            </select>
          </div>
          {mutation && plant ? (
            <p className="muted">
              Mutation multiplier: {mutation.multiplier}× · {plant.harvestType === "single" ? "single harvest" : "multi harvest"} · one choice only
            </p>
          ) : null}
        </section>

        <section aria-live="polite" className="panel result-panel">
          <span className={`badge ${result.ok ? "badge-confirmed" : "badge-unknown"}`}>
            {result.ok ? "Estimated result" : "Check input"}
          </span>
          <h2 style={{ marginTop: 14 }}>Mutated sell value</h2>
          {result.ok ? (
            <>
              <div className="stat-grid">
                <div className="stat"><span>Plant</span><strong>{result.plantName}</strong></div><div className="stat"><span>Harvest</span><strong>{result.harvestType === "single" ? "Single" : "Multi"}</strong></div><div className="stat"><span>Mutation</span><strong>{result.rawMultiplier}×</strong></div><div className="stat"><span>Effective</span><strong>{formatMutationValue(result.effectiveMultiplier)}×</strong></div><div className="stat"><span>Result</span><strong>{formatMutationValue(result.value)}</strong></div>
              </div>
              <p style={{ marginTop: 18 }}>
                {formatMutationValue(result.baseValue)} × {formatMutationValue(result.effectiveMultiplier)} = {formatMutationValue(result.value)}
              </p>
              <p className="muted">A community estimate, not an official quote or trade guarantee.</p><details className="source-details"><summary>Where do these numbers come from?</summary><p>Multipliers come from the current GAG2 mutation references.</p>{result.sourceUrls.map((url, index) => <a key={url} href={url} rel="noreferrer" target="_blank">Open source {index + 1}</a>)}</details>
            </>
          ) : (
            <div className="callout">{Object.values(result.errors).join(" ")}</div>
          )}
        </section>
      </div>
    </div>
  );
}
