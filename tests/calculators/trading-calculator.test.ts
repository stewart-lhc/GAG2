import { describe, expect, it } from "vitest";
import { calculateTradeComparison, TRADING_CALCULATOR_CONFIG, type TradingItemInput } from "../../src/lib/calculators/trading";
const item = (name: string, value: number, quantity = 1): TradingItemInput => ({ entityId: name.toLowerCase(), name, value, quantity, valueType: "relative_trade_value" });
describe("trading calculator", () => {
  it("totals items and marks the inclusive ±10% range Fair", () => {
    const result = calculateTradeComparison([item("A", 100, 2), item("B", 50)], [item("C", 250)]);
    expect(result.totalGiven).toBe(250); expect(result.totalReceived).toBe(250); expect(result.outcome).toBe("fair");
    expect(calculateTradeComparison([item("A", 100)], [item("B", 90)]).outcome).toBe("fair");
    expect(calculateTradeComparison([item("A", 100)], [item("B", 110)]).outcome).toBe("fair");
  });
  it("marks receiving over 110% Win and under 90% Loss", () => {
    expect(calculateTradeComparison([item("A", 100)], [item("B", 111)]).outcome).toBe("win");
    expect(calculateTradeComparison([item("A", 100)], [item("B", 89)]).outcome).toBe("loss");
  });
  it("supports empty sides and keeps symmetric gap", () => {
    const result = calculateTradeComparison([], [item("B", 20)]);
    expect(result.outcome).toBe("win"); expect(result.percentageGap).toBe(100); expect(result.receivedToGivenRatio).toBeNull();
  });
  it("clamps invalid numeric inputs safely", () => {
    const result = calculateTradeComparison([item("A", -5), item("B", Number.NaN)], []);
    expect(result.totalGiven).toBe(0); expect(result.totalReceived).toBe(0); expect(result.outcome).toBe("fair");
  });
  it("uses the versioned relative trade policy", () => {
    const result = calculateTradeComparison([item("A", 1.005)], [item("B", 1)]);
    expect(result.formulaVersion).toBe(TRADING_CALCULATOR_CONFIG.formulaVersion); expect(result.totalGiven).toBe(1.01);
  });
});
