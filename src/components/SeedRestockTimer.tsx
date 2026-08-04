"use client";

import { useEffect, useMemo, useState } from "react";
import { restockCycleRecords } from "@/data/game/restock-cycles";
import type { RestockCycleRecord } from "@/data/game/restock-cycles";
import type { RestockCalculationResult } from "@/lib/calculators/restock";
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

type RestockRow = {
  cycle: RestockCycleRecord;
  result: RestockCalculationResult | null;
  next: string | null;
  remaining: number | null;
};

/**
 * Build the three cards for both the server render and the live browser timer.
 *
 * The server intentionally receives `null`: it can render the card names and
 * fixed intervals without baking a future timestamp into the exported HTML.
 * The effect below supplies the device clock after hydration, so the first
 * client render is byte-for-byte compatible with the server render.
 */
export function buildRestockRows(now: Date | null): RestockRow[] {
  return restockCycleRecords.map((cycle) => {
    if (!now || !Number.isFinite(now.getTime())) {
      return { cycle, result: null, next: null, remaining: null };
    }

    const result = calculateNextRestock(cycle, now);
    const next = result.nextRestockAt;
    const nextMs = next ? Date.parse(next) : NaN;
    const remaining = Number.isFinite(nextMs)
      ? Math.max(0, (nextMs - now.getTime()) / 1000)
      : null;

    return { cycle, result, next, remaining };
  });
}

/** Keep interval copy safe if a future data record is malformed. */
export function formatIntervalMinutes(intervalSeconds: number): string {
  if (!Number.isFinite(intervalSeconds) || intervalSeconds <= 0 || intervalSeconds % 60 !== 0) {
    return "Timing unavailable";
  }
  return `Every ${intervalSeconds / 60} min`;
}

export function SeedRestockTimer() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const rows = useMemo(() => buildRestockRows(now), [now]);

  return (
    <div className={styles.timer}>
      <p className={styles.intro}>
        Use the timer to know when to check the game again. It shows the next shop refresh, not which items will appear.
      </p>
      <div className={styles.grid}>
        {rows.map(({ cycle, result, next, remaining }) => {
          const label = labels[cycle.entityOrShopId] ?? { name: cycle.entityOrShopId, icon: "⏱️" };
          const available = result?.status === "scheduled" && next !== null && remaining !== null;
          const interval = formatIntervalMinutes(cycle.intervalSeconds);
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
                <span>{interval}</span>
                <span>{available ? `Next at ${formatShortLocalTime(next)}` : "Timer starts on your device"}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
