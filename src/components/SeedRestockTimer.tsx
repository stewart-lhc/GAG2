"use client";

import { useEffect, useMemo, useState } from "react";
import { restockCycleRecords } from "@/data/game/restock-cycles";
import { calculateNextRestock } from "@/lib/calculators/restock";
import styles from "./SeedRestockTimer.module.css";

const labels: Record<string, { name: string; icon: string }> = {
  "seed-shop": { name: "Seed Shop", icon: "🌱" },
  "gear-shop": { name: "Gear Shop", icon: "🛠️" },
  "fruit-stock": { name: "Fruit Price Stock", icon: "🍓" }
};

/** Player-friendly countdown with no date or timezone noise. */
export function formatCountdown(totalSeconds: number | null): string {
  if (totalSeconds === null || !Number.isFinite(totalSeconds) || totalSeconds < 0) return "—:—";
  const seconds = Math.max(0, Math.ceil(totalSeconds));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/** A short clock time in the player's own device timezone. */
export function formatShortLocalTime(isoTimestamp: string | null, locale?: string): string {
  if (!isoTimestamp) return "Not available";
  const date = new Date(isoTimestamp);
  if (!Number.isFinite(date.getTime())) return "Not available";
  return new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit" }).format(date);
}

export function SeedRestockTimer() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const rows = useMemo(() => now ? restockCycleRecords.map((cycle) => {
    const result = calculateNextRestock(cycle, now);
    const next = result.nextRestockAt;
    const nextMs = next ? Date.parse(next) : NaN;
    return {
      cycle,
      result,
      next,
      remaining: Number.isFinite(nextMs) ? Math.max(0, (nextMs - now.getTime()) / 1000) : null
    };
  }) : [], [now]);

  return (
    <div className={styles.timer}>
      <p className={styles.intro}>
        Use the timer to know when to check the game again. It shows the next shop refresh, not which items will appear.
      </p>
      {rows.length === 0 ? <p className={styles.loading}>Getting the next check time…</p> : null}
      <div className={styles.grid}>
        {rows.map(({ cycle, result, next, remaining }) => {
          const label = labels[cycle.entityOrShopId] ?? { name: cycle.entityOrShopId, icon: "⏱️" };
          const available = result.status === "scheduled" && next !== null;
          return (
            <article className={styles.card} key={cycle.id}>
              <header className={styles.cardHeader}>
                <span className={styles.icon} aria-hidden="true">{label.icon}</span>
                <div>
                  <p className={styles.kicker}>Next check</p>
                  <h2>{label.name}</h2>
                </div>
              </header>
              <div className={styles.countdownBox}>
                <span className={styles.countdownLabel}>Countdown</span>
                <strong className={styles.countdown}>{available ? formatCountdown(remaining) : "—:—"}</strong>
              </div>
              <div className={styles.cardFooter}>
                <span>Every {cycle.intervalSeconds / 60} min</span>
                <span>{available ? `Next at ${formatShortLocalTime(next)}` : "Check the game for timing"}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
