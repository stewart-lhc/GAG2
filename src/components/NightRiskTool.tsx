"use client";

import { useMemo, useState } from "react";

export function NightRiskTool() {
  const [value, setValue] = useState(1000);
  const [away, setAway] = useState(true);
  const [defense, setDefense] = useState(1);

  const risk = useMemo(() => {
    let score = 0;
    if (value > 5000) score += 2;
    else if (value > 1000) score += 1;
    if (away) score += 2;
    score -= Math.min(defense, 3);
    if (score >= 3) return { label: "High", advice: "Harvest, move, or protect valuable crops before leaving." };
    if (score >= 1) return { label: "Medium", advice: "Check defenses and avoid leaving high-value crops exposed." };
    return { label: "Low", advice: "Risk looks lower, but the exact GAG2 rules still need verification." };
  }, [away, defense, value]);

  return (
    <div className="two-col">
      <div className="panel">
        <div className="field">
          <label htmlFor="crop-value">Crop value estimate</label>
          <input
            className="input"
            id="crop-value"
            min="0"
            onChange={(event) => setValue(Number(event.target.value))}
            type="number"
            value={value}
          />
        </div>
        <div className="field" style={{ marginTop: 14 }}>
          <label htmlFor="away">Will you leave the garden at night?</label>
          <select
            className="select"
            id="away"
            onChange={(event) => setAway(event.target.value === "yes")}
            value={away ? "yes" : "no"}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="field" style={{ marginTop: 14 }}>
          <label htmlFor="defense">Defense confidence</label>
          <input
            className="input"
            id="defense"
            max="3"
            min="0"
            onChange={(event) => setDefense(Number(event.target.value))}
            type="range"
            value={defense}
          />
        </div>
      </div>
      <aside className="panel">
        <p className="eyebrow" style={{ color: "var(--accent-strong)" }}>
          Risk estimate
        </p>
        <h2>{risk.label}</h2>
        <p>{risk.advice}</p>
        <p className="muted">
          This mini tool is strategic guidance only. It does not encourage harassment,
          account sharing, scripts, or platform rule bypassing.
        </p>
      </aside>
    </div>
  );
}
