"use client";

import { useMemo, useState } from "react";
import { PlantPicker } from "./PlantPicker";
import styles from "./CalculatorTool.module.css";
import {
  calculateCropValue,
  calculateWeightFromValue,
  formatCropValue,
  formatWeight,
  type CoreCalculatorField
} from "@/lib/calculators/core";

export type CalculatorPlant = {
  id: string;
  name: string;
  category: string;
  baseValue: number;
  baseWeight: number;
  singleHarvest: boolean;
  minimumValue?: number;
  sizeExponent?: number;
  sellTimeMultiplier?: number;
  sourceUrl: string;
};

export type CalculatorMutation = { id: string; name: string; multiplier: number; sourceUrl: string };

type CalculatorToolProps = { plants: CalculatorPlant[]; mutations: CalculatorMutation[]; sourceLabel: string; sourceUrl: string };
type CartEntry = { id: string; plantName: string; quantity: number; unitValue: number; weight: number; mutationName: string };

const inputDefaults = { weight: "1", targetValue: "1000", quantity: "1", fruitStockMultiplier: "1", mutationId: "none", friendCount: "0", decayPercent: "0" };
const asNumber = (value: string) => (value.trim() === "" ? Number.NaN : Number(value));

function errorFor(errors: Partial<Record<CoreCalculatorField | "result", string>>, field: CoreCalculatorField) {
  return errors[field];
}

export function CalculatorTool({ plants, mutations, sourceLabel, sourceUrl }: CalculatorToolProps) {
  const [mode, setMode] = useState<"value" | "weight">("value");
  const [inputs, setInputs] = useState(inputDefaults);
  const [selectedPlantId, setSelectedPlantId] = useState(plants[0]?.id ?? "");
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [harvestOpen, setHarvestOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const selectedPlant = plants.find((plant) => plant.id === selectedPlantId) ?? plants[0];
  const availableMutations = mutations.filter((mutation) => mutation.multiplier > 1);
  const selectedMutation = availableMutations.find((mutation) => mutation.id === inputs.mutationId);
  const mutationMultiplier = selectedMutation?.multiplier ?? 1;

  const sharedInput = selectedPlant ? {
    baseValue: selectedPlant.baseValue,
    baseWeight: selectedPlant.baseWeight,
    quantity: asNumber(inputs.quantity),
    fruitStockMultiplier: asNumber(inputs.fruitStockMultiplier),
    mutationMultiplier,
    friendCount: asNumber(inputs.friendCount),
    decayFraction: asNumber(inputs.decayPercent) / 100,
    singleHarvest: selectedPlant.singleHarvest,
    minimumValue: selectedPlant.minimumValue,
    sizeExponent: selectedPlant.sizeExponent,
    sellTimeMultiplier: selectedPlant.sellTimeMultiplier
  } : null;

  const valueResult = useMemo(
    () => sharedInput ? calculateCropValue({ ...sharedInput, weight: asNumber(inputs.weight) }) : { ok: false as const, errors: { result: "Pick a plant to begin." } },
    // Depend on scalar values: the object is deliberately recreated from them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedPlant, inputs.weight, inputs.quantity, inputs.fruitStockMultiplier, inputs.friendCount, inputs.decayPercent, mutationMultiplier]
  );
  const weightResult = useMemo(
    () => sharedInput ? calculateWeightFromValue({ ...sharedInput, targetValue: asNumber(inputs.targetValue) }) : { ok: false as const, errors: { result: "Pick a plant to begin." } },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedPlant, inputs.targetValue, inputs.quantity, inputs.fruitStockMultiplier, inputs.friendCount, inputs.decayPercent, mutationMultiplier]
  );
  const activeResult = mode === "value" ? valueResult : weightResult;
  const errors = activeResult.ok ? {} : activeResult.errors;
  const cartTotal = cart.reduce((total, item) => total + item.unitValue * item.quantity, 0);

  function setInput(name: keyof typeof inputDefaults, value: string) {
    setInputs((current) => ({ ...current, [name]: value }));
    setCopyStatus("");
  }

  function reset() {
    setMode("value"); setInputs(inputDefaults); setSelectedPlantId(plants[0]?.id ?? ""); setCart([]); setCopyStatus(""); setHarvestOpen(false);
  }

  function addToList() {
    if (!selectedPlant || !valueResult.ok) return;
    setCart((current) => [...current, {
      id: `${selectedPlant.id}-${Date.now()}-${current.length}`,
      plantName: selectedPlant.name,
      quantity: Number(inputs.quantity), unitValue: valueResult.unitValue,
      weight: Number(inputs.weight), mutationName: selectedMutation?.name ?? "None"
    }]);
    setHarvestOpen(true);
  }

  async function copyResult() {
    if (!activeResult.ok || !navigator.clipboard) { setCopyStatus("Your browser cannot copy this right now."); return; }
    const text = mode === "value" && valueResult.ok
      ? `${selectedPlant?.name}: ${formatCropValue(valueResult.value)} Sheckles (${formatWeight(Number(inputs.weight))} kg × ${inputs.quantity})`
      : weightResult.ok ? `${selectedPlant?.name}: about ${formatWeight(weightResult.weight)} kg for ${formatCropValue(Number(inputs.targetValue))} Sheckles` : "";
    try { await navigator.clipboard.writeText(`${text}\nMutation: ${selectedMutation?.name ?? "None"}`); setCopyStatus("Copied."); }
    catch { setCopyStatus("Your browser blocked copying."); }
  }

  const targetField = mode === "value" ? "weight" : "targetValue";
  const targetError = errorFor(errors, targetField);
  const inputSummary = [
    ["Plant", selectedPlant?.name ?? "Not selected"],
    [mode === "value" ? "Weight" : "Target", mode === "value" ? `${inputs.weight || "—"} kg` : `${inputs.targetValue || "—"} Sheckles`],
    ["Quantity", inputs.quantity || "—"],
    ["Fruit Price", `${inputs.fruitStockMultiplier || "—"}×`],
    ["Mutation", selectedMutation?.name ?? "None"],
    ["Friends", inputs.friendCount || "0"],
    ["Decay", `${inputs.decayPercent || "0"}%`]
  ];

  return (
    <section aria-label="Grow a Garden 2 calculator" className={styles.shell}>
      <div className={styles.topbar}>
        <div>
          <h1 className={styles.heading}>Grow a Garden 2 Calculator</h1>
          <p className={styles.headingSubtext}>Pick a plant. See the payout.</p>
        </div>
        <div aria-label="Calculation mode" className={styles.modes}>
          <button aria-pressed={mode === "value"} className={`${styles.mode} ${mode === "value" ? styles.modeActive : ""}`} onClick={() => setMode("value")} type="button">Plant value</button>
          <button aria-pressed={mode === "weight"} className={`${styles.mode} ${mode === "weight" ? styles.modeActive : ""}`} onClick={() => setMode("weight")} type="button">Find weight</button>
        </div>
        <span className={styles.cartButton}>Harvest: {formatCropValue(cartTotal)}</span>
      </div>

      <div className={styles.main}>
        <form className={styles.controls} onSubmit={(event) => event.preventDefault()}>
          <div className={`${styles.field} ${styles.plantField}`}>
            <span className={styles.plantLabel}>Plant</span>
            <PlantPicker onSelect={setSelectedPlantId} plants={plants} selectedPlantId={selectedPlantId} />
          </div>
          <div className={`${styles.field} ${styles.targetField}`}>
            <label htmlFor={targetField}>{mode === "value" ? "Weight (kg)" : "Wanted Sheckles"}</label>
            <input aria-invalid={Boolean(targetError)} className={styles.input} id={targetField} min="0" onChange={(event) => setInput(targetField, event.target.value)} step={mode === "value" ? "0.01" : "1"} type="number" value={inputs[targetField]} />
            {targetError ? <p className={styles.error} role="alert">{targetError}</p> : null}
          </div>
          <div className={`${styles.field} ${styles.quantityField}`}>
            <label htmlFor="quantity">How many?</label>
            <input aria-invalid={Boolean(errorFor(errors, "quantity"))} className={styles.input} id="quantity" min="1" onChange={(event) => setInput("quantity", event.target.value)} step="1" type="number" value={inputs.quantity} />
            {errorFor(errors, "quantity") ? <p className={styles.error} role="alert">{errorFor(errors, "quantity")}</p> : null}
          </div>
          <div className={`${styles.field} ${styles.fruitPriceField}`}>
            <label>Fruit price</label>
            <div className={styles.fruitControls}>
              <div className={styles.presets}>
                {[1, 2, 4].map((preset) => <button aria-pressed={Number(inputs.fruitStockMultiplier) === preset} className={`${styles.preset} ${Number(inputs.fruitStockMultiplier) === preset ? styles.presetActive : ""}`} key={preset} onClick={() => setInput("fruitStockMultiplier", String(preset))} type="button">{preset === 1 ? "Normal" : preset === 2 ? "Big" : "Mega"} {preset}×</button>)}
              </div>
              <input aria-label="Custom fruit price multiplier" aria-invalid={Boolean(errorFor(errors, "fruitStockMultiplier"))} className={styles.input} max="4" min="0.8" onChange={(event) => setInput("fruitStockMultiplier", event.target.value)} step="0.1" type="number" value={inputs.fruitStockMultiplier} />
            </div>
          </div>
          <div className={`${styles.field} ${styles.mutationField}`}>
            <label htmlFor="mutation">Mutation</label>
            <select className={styles.select} id="mutation" onChange={(event) => setInput("mutationId", event.target.value)} value={inputs.mutationId}>
              <option value="none">No mutation</option>
              {availableMutations.map((mutation) => <option key={mutation.id} value={mutation.id}>{mutation.name} · {mutation.multiplier}×</option>)}
            </select>
            <p className={styles.hint}>{selectedPlant?.singleHarvest ? "Single-harvest plants only get part of a mutation bonus." : "Choose the mutation currently on your plant."}</p>
          </div>
          <div className={`${styles.field} ${styles.friendsField}`}>
            <label htmlFor="friend-count">Friends here</label>
            <input aria-invalid={Boolean(errorFor(errors, "friendCount"))} className={styles.input} id="friend-count" min="0" onChange={(event) => setInput("friendCount", event.target.value)} step="1" type="number" value={inputs.friendCount} />
          </div>
          <div className={`${styles.field} ${styles.decayField}`}>
            <label htmlFor="decay">Decay {inputs.decayPercent || "0"}%</label>
            <input aria-invalid={Boolean(errorFor(errors, "decayFraction"))} className={styles.input} id="decay" max="100" min="0" onChange={(event) => setInput("decayPercent", event.target.value)} step="1" type="number" value={inputs.decayPercent} />
          </div>
        </form>

        <aside aria-live="polite" className={styles.result}>
          <p className={styles.resultLabel}>{mode === "value" ? "Your payout" : "Weight to aim for"}</p>
          <h2 className={styles.answer}>{activeResult.ok ? (mode === "value" && valueResult.ok ? formatCropValue(valueResult.value) : weightResult.ok ? `${formatWeight(weightResult.weight)} kg` : "—") : "Check it"}</h2>
          <p className={styles.answerCaption}>{mode === "value" ? "Sheckles for these plants" : "for your chosen Sheckles"}</p>
          {errors.result ? <p className={styles.error} role="alert">{errors.result}</p> : null}
          <dl className={styles.resultSummary}>
            {inputSummary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <div className={styles.disclosure}>
            <p><strong>Estimate note:</strong> This is a fan-made estimate, not a live price checker or trade guarantee. Re-check the bonuses shown in your own game after updates.</p>
          </div>
          <div className={styles.actions}>
            <button className={`${styles.action} ${styles.actionBlue}`} disabled={!activeResult.ok} onClick={copyResult} type="button">Copy</button>
            {mode === "value" ? <button className={styles.action} disabled={!valueResult.ok} onClick={addToList} type="button">Add harvest</button> : <button className={`${styles.action} ${styles.actionSoft}`} onClick={reset} type="button">Reset</button>}
            {mode === "value" ? <button className={`${styles.action} ${styles.actionSoft}`} onClick={reset} type="button">Reset</button> : null}
          </div>
          {copyStatus ? <p className={styles.hint} role="status">{copyStatus}</p> : null}
        </aside>
      </div>

      <details className={styles.cart} onToggle={(event) => setHarvestOpen(event.currentTarget.open)} open={harvestOpen}>
        <summary>Harvest list · {cart.length ? `${cart.length} entries · ${formatCropValue(cartTotal)} Sheckles` : "nothing added yet"}</summary>
        <div className={styles.cartBody}>
          {cart.length === 0 ? <p className={styles.hint}>Tap “Add harvest” when you want to total more plants.</p> : cart.map((item) => (
            <article className={styles.cartItem} key={item.id}>
              <div><strong>{item.plantName}</strong><span className={styles.cartMeta}>Unit: {formatCropValue(item.unitValue)} Sheckles · Weight: {formatWeight(item.weight)} kg · Mutation: {item.mutationName}</span><span className={styles.cartLineTotal}>Line total: {formatCropValue(item.unitValue * item.quantity)} Sheckles</span></div>
              <div className={styles.cartActions}>
                <label className={styles.cartQuantity}><span>Quantity</span><input aria-label={`${item.plantName} quantity`} className={styles.input} min="1" onChange={(event) => { const quantity = Number(event.target.value); if (Number.isInteger(quantity) && quantity > 0) setCart((current) => current.map((entry) => entry.id === item.id ? { ...entry, quantity } : entry)); }} step="1" type="number" value={item.quantity} /></label>
                <button className={styles.remove} onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))} type="button">Remove item</button>
              </div>
            </article>
          ))}
        </div>
      </details>

      <details className={styles.details}>
        <summary>Why can my number be different?</summary>
        <p>This is a fan-made estimate, not a live price checker. Choose the Fruit Price bonus you see in your own game. Plant facts are checked against <a href={sourceUrl} rel="noreferrer" target="_blank">{sourceLabel}</a>; updates can change results.</p>
      </details>
    </section>
  );
}
