"use client";

import { useState } from "react";
import { codes } from "@/data/site";

export function CodesTool() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
    setCopied(code);
  }

  return (
    <div className="panel">
      <div style={{ marginBottom: 18 }}>
        <span className="badge badge-warning">No fake codes</span>
        <h2 style={{ marginTop: 14 }}>Code Drop Board</h2>
        <p className="muted">
          This page is built for fast copy when verified codes exist, and for clear waiting
          when they do not.
        </p>
      </div>
      <div className="stat-grid">
        <div className="stat">
          <span>Active codes</span>
          <strong>{codes.active.length}</strong>
        </div>
        <div className="stat">
          <span>Expired codes</span>
          <strong>{codes.expired.length}</strong>
        </div>
        <div className="stat">
          <span>Last checked</span>
          <strong>{codes.lastChecked}</strong>
        </div>
      </div>

      {codes.active.length === 0 ? (
        <p className="callout" style={{ marginTop: 18 }}>
          No verified active Grow a Garden 2 code has been found yet. This page will not
          publish unverified codes or reuse Grow a Garden 1 codes as GAG2 rewards.
        </p>
      ) : (
        <div className="grid" style={{ marginTop: 18 }}>
          {codes.active.map((item) => (
            <article className="flat-panel" key={item.code}>
              <h3>{item.code}</h3>
              <p>{item.reward}</p>
              <button className="button" onClick={() => copyCode(item.code)} type="button">
                {copied === item.code ? "Copied" : "Copy code"}
              </button>
            </article>
          ))}
        </div>
      )}

      <div className="flat-panel">
        <h3>How to redeem when codes exist</h3>
        <p>
          Open the official Roblox experience, find the in-game code or settings menu, paste the
          code exactly, and submit once. Never enter Roblox credentials on third-party sites.
        </p>
      </div>
    </div>
  );
}
