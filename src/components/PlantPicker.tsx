"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./PlantPicker.module.css";
import type { CalculatorPlant } from "./CalculatorTool";

type PickerFilter = "All" | "Multi Harvest" | "Single Harvest";

type PlantPickerProps = {
  plants: CalculatorPlant[];
  selectedPlantId: string;
  onSelect: (plantId: string) => void;
};

export function filterPickerPlants(plants: CalculatorPlant[], query: string, filter: PickerFilter) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return plants.filter(
    (plant) =>
      (filter === "All" || plant.category === filter) &&
      (!normalizedQuery || plant.name.toLocaleLowerCase().includes(normalizedQuery))
  );
}

/** Only the search combobox owns Enter-to-select; filter buttons keep native Enter behavior. */
export function shouldCommitPlantPickerSelection(
  key: string,
  eventTarget: EventTarget | null,
  searchElement: EventTarget | null
) {
  return key === "Enter" && eventTarget === searchElement;
}

function glyphTokens(name: string) {
  const value = name.toLowerCase();
  if (value.includes("pumpkin") || value.includes("melon")) return { color: "#ff9d2d", accent: "#d76321", kind: "round" };
  if (value.includes("apple") || value.includes("cherry") || value.includes("pomegranate")) return { color: "#ef5252", accent: "#9d2525", kind: "round" };
  if (value.includes("banana")) return { color: "#ffd83d", accent: "#d39318", kind: "long" };
  if (value.includes("mushroom")) return { color: "#e6b2c7", accent: "#9a4968", kind: "mushroom" };
  if (value.includes("cactus") || value.includes("bamboo") || value.includes("bean")) return { color: "#72c94a", accent: "#27834a", kind: "tall" };
  if (value.includes("berry") || value.includes("grape") || value.includes("poison")) return { color: "#7b58ca", accent: "#3e2a8a", kind: "cluster" };
  if (value.includes("sun") || value.includes("star") || value.includes("moon")) return { color: "#ffc934", accent: "#e76f2f", kind: "flower" };
  if (value.includes("coconut") || value.includes("acorn") || value.includes("cone")) return { color: "#9b643d", accent: "#5b3624", kind: "round" };
  return { color: "#48b86c", accent: "#18794c", kind: "leaf" };
}

/** Original CSS-like SVG glyphs: no copied game art, emoji, or remote images. */
export function PlantGlyph({ name }: { name: string }) {
  const token = glyphTokens(name);
  const common = { fill: token.color, stroke: "#11170f", strokeWidth: 2.4, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden="true" className={styles.glyph} viewBox="0 0 48 48">
      {token.kind === "round" ? <><path {...common} d="M24 14c10 0 16 7 16 17S34 43 24 43 8 38 8 31s6-17 16-17Z" /><path d="M24 15V7m0 5 6-5" fill="none" stroke="#11170f" strokeLinecap="round" strokeWidth="3" /><path d="M24 18v21M15 23c4 3 14 3 18 0M13 31c5 3 17 3 22 0" fill="none" stroke={token.accent} strokeLinecap="round" strokeWidth="2" /></> : null}
      {token.kind === "long" ? <><path {...common} d="M12 12c14 1 24 7 24 17 0 8-7 11-14 8-9-4-12-14-10-25Z" /><path d="M14 13c9 9 12 16 9 24" fill="none" stroke={token.accent} strokeLinecap="round" strokeWidth="2" /></> : null}
      {token.kind === "mushroom" ? <><path {...common} d="M19 27h10l3 15H16l3-15Z" /><path {...common} d="M7 26c1-11 8-17 17-17s16 6 17 17H7Z" /><circle cx="17" cy="18" r="2" fill="#fffdf2" /><circle cx="29" cy="16" r="2.2" fill="#fffdf2" /></> : null}
      {token.kind === "tall" ? <><path {...common} d="M18 42V16l6-9 6 9v26H18Z" /><path d="M24 8v34M18 23h12M18 32h12" fill="none" stroke={token.accent} strokeWidth="2" /><path {...common} d="M18 21c-8-1-9-8-5-11 5 2 7 6 5 11Zm12 8c8-1 9-8 5-11-5 2-7 6-5 11Z" /></> : null}
      {token.kind === "cluster" ? <><circle {...common} cx="17" cy="23" r="8" /><circle {...common} cx="29" cy="19" r="8" /><circle {...common} cx="30" cy="31" r="8" /><circle {...common} cx="19" cy="34" r="7" /><path d="M24 16V8m0 4 7-4" fill="none" stroke="#11170f" strokeLinecap="round" strokeWidth="3" /></> : null}
      {token.kind === "flower" ? <><path d="M24 41V24" fill="none" stroke="#247244" strokeWidth="4" strokeLinecap="round" /><path {...common} d="M24 12c3-8 12-5 10 2 8-3 12 5 5 9 7 5 2 13-5 9 1 8-9 10-10 3-4 7-13 2-9-5-8-1-5-11 3-9-3-8 5-12 6-7Z" /><circle cx="24" cy="24" r="5" fill={token.accent} stroke="#11170f" strokeWidth="2" /></> : null}
      {token.kind === "leaf" ? <><path {...common} d="M8 35C10 16 25 8 41 8 39 25 30 40 12 40Z" /><path d="M11 38 35 13M19 30h9m-4-5h7" fill="none" stroke={token.accent} strokeLinecap="round" strokeWidth="2.4" /></> : null}
    </svg>
  );
}

export function PlantPicker({ plants, selectedPlantId, onSelect }: PlantPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PickerFilter>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const selectedPlant = plants.find((plant) => plant.id === selectedPlantId) ?? plants[0];
  const results = useMemo(() => filterPickerPlants(plants, query, filter), [plants, query, filter]);

  useEffect(() => {
    setActiveIndex((index) => Math.max(0, Math.min(index, Math.max(0, results.length - 1))));
  }, [results.length]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => searchRef.current?.focus());
  }, [open]);

  function close(returnFocus = false) {
    setOpen(false);
    if (returnFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function choose(plant: CalculatorPlant) {
    onSelect(plant.id);
    setQuery("");
    setFilter("All");
    close(true);
  }

  function moveActive(direction: 1 | -1) {
    if (!results.length) return;
    setActiveIndex((current) => (current + direction + results.length) % results.length);
  }

  function onPickerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    }
    if (shouldCommitPlantPickerSelection(event.key, event.target, searchRef.current) && open && results[activeIndex]) {
      event.preventDefault();
      choose(results[activeIndex]);
    }
  }

  if (!selectedPlant) return null;

  return (
    <div className={styles.picker} onKeyDown={onPickerKeyDown}>
      <button
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={styles.trigger}
        onClick={() => setOpen((current) => !current)}
        ref={triggerRef}
        type="button"
      >
        <PlantGlyph name={selectedPlant.name} />
        <span>
          <span className={styles.triggerName}>{selectedPlant.name}</span>
          <span className={styles.triggerMeta}>{selectedPlant.category} · {selectedPlant.baseWeight} kg</span>
        </span>
        <span aria-hidden="true" className={styles.chevron}>{open ? "↑" : "↓"}</span>
      </button>

      {open ? (
        <div className={styles.menu}>
          <div className={styles.menuTop}>
            <input
              aria-activedescendant={results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined}
              aria-controls={listId}
              aria-label="Search plants"
              className={styles.search}
              onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
              placeholder={`Search ${plants.length} plants`}
              ref={searchRef}
              role="combobox"
              value={query}
            />
            <span className={styles.triggerMeta}>{results.length} shown</span>
          </div>
          <div aria-label="Harvest type" className={styles.filters}>
            {(["All", "Multi Harvest", "Single Harvest"] as PickerFilter[]).map((item) => (
              <button
                aria-pressed={filter === item}
                className={`${styles.filter} ${filter === item ? styles.filterActive : ""}`}
                key={item}
                onClick={() => { setFilter(item); setActiveIndex(0); }}
                type="button"
              >
                {item === "All" ? "All" : item.replace(" Harvest", "")}
              </button>
            ))}
          </div>
          <ul aria-label="Plant choices" className={styles.list} id={listId} role="listbox">
            {results.map((plant, index) => (
              <li
                aria-selected={plant.id === selectedPlantId}
                className={`${styles.option} ${activeIndex === index ? styles.optionActive : ""}`}
                id={`${listId}-${plant.id}`}
                key={plant.id}
                onClick={() => choose(plant)}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                tabIndex={-1}
              >
                <PlantGlyph name={plant.name} />
                <span>
                  <span className={styles.optionName}>{plant.name}</span>
                  <span className={styles.optionMeta}>{plant.baseWeight} kg · {plant.category === "Multi Harvest" ? "Multi" : "Single"}</span>
                </span>
              </li>
            ))}
            {results.length === 0 ? <li className={styles.empty} role="status">No matching plant. Try another name.</li> : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
