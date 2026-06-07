"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/clientAnalytics";

export type WatchIntent = {
  id: string;
  label: string;
  description: string;
};

type WatchIntentPanelProps = {
  storageKey: string;
  title: string;
  items: WatchIntent[];
};

export function WatchIntentPanel({ storageKey, title, items }: WatchIntentPanelProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setSelected(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
    } catch {
      setSelected([]);
    }
  }, [storageKey]);

  function toggle(id: string) {
    setSaved(false);
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function save() {
    window.localStorage.setItem(storageKey, JSON.stringify(selected));
    trackEvent(storageKey.includes("stock") ? "stock_watchlist_save" : "code_alert_intent", {
      selectedCount: selected.length
    });
    setSaved(true);
  }

  return (
    <article className="flat-panel">
      <h3>{title}</h3>
      <div className="grid" style={{ marginTop: 12 }}>
        {items.map((item) => (
          <label className="watch-option" key={item.id}>
            <input
              checked={selected.includes(item.id)}
              onChange={() => toggle(item.id)}
              type="checkbox"
            />
            <span>
              <strong>{item.label}</strong>
              <br />
              <span className="muted">{item.description}</span>
            </span>
          </label>
        ))}
      </div>
      <button className="button" onClick={save} style={{ marginTop: 14 }} type="button">
        {saved ? "Saved locally" : "Save watchlist"}
      </button>
    </article>
  );
}
