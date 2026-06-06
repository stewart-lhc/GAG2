"use client";

import { useMemo, useState } from "react";

const mutationOptions = [
  { label: "None / 1x", value: 1 },
  { label: "Community test multiplier / 2x", value: 2 },
  { label: "High mutation estimate / 5x", value: 5 },
  { label: "Custom", value: 0 }
];

export function CalculatorTool() {
  const [baseValue, setBaseValue] = useState(100);
  const [weight, setWeight] = useState(1);
  const [amount, setAmount] = useState(1);
  const [mutation, setMutation] = useState(1);
  const [customMutation, setCustomMutation] = useState(3);

  const result = useMemo(() => {
    const multiplier = mutation === 0 ? customMutation : mutation;
    return Math.max(0, baseValue) * Math.max(0, weight) * Math.max(0, amount) * Math.max(0, multiplier);
  }, [amount, baseValue, customMutation, mutation, weight]);

  return (
    <div className="two-col">
      <form className="panel">
        <span className="badge badge-unknown">Player-entered values</span>
        <h2 style={{ marginTop: 14 }}>Crop Value Math</h2>
        <p className="muted">
          Keep the formula visible so the result feels like a tool, not a hidden-data claim.
        </p>
        <div className="field">
          <label htmlFor="crop">Crop</label>
          <select className="select" id="crop">
            <option>Custom crop - verified GAG2 crop list pending</option>
          </select>
        </div>
        <div className="grid" style={{ marginTop: 14 }}>
          <div className="field">
            <label htmlFor="base-value">Base value</label>
            <input
              className="input"
              id="base-value"
              min="0"
              onChange={(event) => setBaseValue(Number(event.target.value))}
              type="number"
              value={baseValue}
            />
          </div>
          <div className="field">
            <label htmlFor="weight">Weight</label>
            <input
              className="input"
              id="weight"
              min="0"
              onChange={(event) => setWeight(Number(event.target.value))}
              step="0.01"
              type="number"
              value={weight}
            />
          </div>
          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input
              className="input"
              id="amount"
              min="0"
              onChange={(event) => setAmount(Number(event.target.value))}
              type="number"
              value={amount}
            />
          </div>
          <div className="field">
            <label htmlFor="mutation">Mutation multiplier</label>
            <select
              className="select"
              id="mutation"
              onChange={(event) => setMutation(Number(event.target.value))}
              value={mutation}
            >
              {mutationOptions.map((option) => (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {mutation === 0 ? (
            <div className="field">
              <label htmlFor="custom-mutation">Custom multiplier</label>
              <input
                className="input"
                id="custom-mutation"
                min="0"
                onChange={(event) => setCustomMutation(Number(event.target.value))}
                step="0.01"
                type="number"
                value={customMutation}
              />
            </div>
          ) : null}
        </div>
      </form>
      <aside className="panel">
        <span className="badge badge-confirmed">Estimated result</span>
        <h2 style={{ marginTop: 14 }}>{Math.round(result).toLocaleString()}</h2>
        <p>
          Formula: base value x weight x amount x mutation multiplier. This is an alpha
          estimator for player-entered values, not a claim about hidden game data.
        </p>
        <div className="chips">
          <span className="chip">Based on user input</span>
          <span className="chip">No decompiled data</span>
          <span className="chip">Formula visible</span>
        </div>
      </aside>
    </div>
  );
}
