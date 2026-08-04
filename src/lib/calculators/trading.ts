export type TradingItemInput = { entityId: string; name: string; value: number; quantity: number; valueType: "relative_trade_value" };
export type TradeOutcome = "win" | "fair" | "loss";
export const TRADING_CALCULATOR_CONFIG = { formulaVersion: "relative-trade-v2", rounding: { mode: "half_up" as const, decimals: 2 }, fairRange: { lowerRatio: 0.9, upperRatio: 1.1 } };
export const tradingCalculatorConfig = TRADING_CALCULATOR_CONFIG;
export const TRADING_FORMULA_CONFIG = TRADING_CALCULATOR_CONFIG;
export type TradeLine = TradingItemInput & { total: number };
export type TradeComparisonResult = { totalGiven: number; totalReceived: number; totalLeft: number; totalRight: number; totalA: number; totalB: number; difference: number; percentageGap: number; receivedToGivenRatio: number | null; outcome: TradeOutcome; verdict: "under" | "fair" | "over"; fairRange: typeof TRADING_CALCULATOR_CONFIG.fairRange; formulaVersion: string; rounding: typeof TRADING_CALCULATOR_CONFIG.rounding; left: TradeLine[]; right: TradeLine[] };

function round(value: number) { return Math.round((value + Number.EPSILON) * 100) / 100; }
function lines(items: readonly TradingItemInput[]) { return items.map((item) => ({ ...item, value: Number.isFinite(item.value) ? Math.max(0, item.value) : 0, quantity: Number.isFinite(item.quantity) ? Math.max(0, item.quantity) : 0, total: round((Number.isFinite(item.value) ? Math.max(0, item.value) : 0) * (Number.isFinite(item.quantity) ? Math.max(0, item.quantity) : 0)) })); }
export function calculateTradeTotals(items: readonly TradingItemInput[]) { return round(lines(items).reduce((sum, item) => sum + item.total, 0)); }
/** Left is what the player gives; right is what the player receives. Values must be relative trade units, never Sheckles. */
export function calculateTradeComparison(given: readonly TradingItemInput[], received: readonly TradingItemInput[]): TradeComparisonResult {
  const left = lines(given); const right = lines(received);
  const totalGiven = round(left.reduce((sum, item) => sum + item.total, 0));
  const totalReceived = round(right.reduce((sum, item) => sum + item.total, 0));
  const difference = round(Math.abs(totalGiven - totalReceived));
  const denominator = Math.max(totalGiven, totalReceived);
  const percentageGap = denominator === 0 ? 0 : round(difference / denominator * 100);
  const ratio = totalGiven === 0 ? (totalReceived === 0 ? 1 : null) : totalReceived / totalGiven;
  let outcome: TradeOutcome = "fair";
  if (ratio === null || ratio > TRADING_CALCULATOR_CONFIG.fairRange.upperRatio) outcome = "win";
  else if (ratio < TRADING_CALCULATOR_CONFIG.fairRange.lowerRatio) outcome = "loss";
  return { totalGiven, totalReceived, totalLeft: totalGiven, totalRight: totalReceived, totalA: totalGiven, totalB: totalReceived, difference, percentageGap, receivedToGivenRatio: ratio === null ? null : round(ratio), outcome, verdict: outcome === "win" ? "under" : outcome === "loss" ? "over" : "fair", fairRange: TRADING_CALCULATOR_CONFIG.fairRange, formulaVersion: TRADING_CALCULATOR_CONFIG.formulaVersion, rounding: TRADING_CALCULATOR_CONFIG.rounding, left, right };
}
export const compareTrades = calculateTradeComparison;
