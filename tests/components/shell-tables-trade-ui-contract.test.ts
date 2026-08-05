import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const siteHeader = readFileSync(new URL("../../src/components/SiteHeader.tsx", import.meta.url), "utf8");
const valueList = readFileSync(new URL("../../src/components/ValueList.tsx", import.meta.url), "utf8");
const tradingCalculator = readFileSync(new URL("../../src/components/TradingCalculator.tsx", import.meta.url), "utf8");
const globals = readFileSync(new URL("../../src/app/globals.css", import.meta.url), "utf8");

describe("shell, results table, and trade result UI contracts", () => {
  it("reveals the desktop header on upward scroll and focus without changing mobile layout", () => {
    expect(siteHeader).toContain('"use client"');
    expect(siteHeader).toContain('window.addEventListener("scroll"');
    expect(siteHeader).toContain('onFocusCapture={() => setIsHidden(false)}');
    expect(globals).toContain(".site-header--hidden");
    expect(globals).toContain("@media (max-width: 980px)");
    expect(globals).toContain(".site-header--hidden {\n    transform: none;");
  });

  it("keeps the value results table independently scrollable with a sticky desktop header", () => {
    expect(valueList).toContain('className="table-wrap value-results-table-wrap"');
    expect(valueList).toContain('data-label="Name"');
    expect(globals).toContain(".value-results-table-wrap {\n  height: 560px;");
    expect(globals).toContain(".value-results-table-wrap thead th {\n  position: sticky;");
    expect(globals).toContain(".value-results-table-wrap {\n    height: auto;");
  });

  it("uses a compact player-facing trade result heading without shrinking global h2 styles", () => {
    expect(tradingCalculator).toContain('<h2 className="result-title">Trade check</h2>');
    expect(globals).toContain(".result-title {");
    expect(globals).not.toContain(".result-panel h2 {");
  });
});
