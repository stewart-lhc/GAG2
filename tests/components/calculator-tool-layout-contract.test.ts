import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync(new URL("../../src/components/CalculatorTool.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../../src/components/CalculatorTool.module.css", import.meta.url), "utf8");

describe("calculator layout and harvest contracts", () => {
  it("keeps the desktop and mobile control rows semantic and balanced", () => {
    expect(component).toContain("styles.plantField");
    expect(component).toContain("styles.targetField");
    expect(component).toContain("styles.quantityField");
    expect(component).toContain("styles.fruitPriceField");
    expect(component).toContain("styles.mutationField");
    expect(component).toContain("styles.friendsField");
    expect(component).toContain("styles.decayField");
    expect(component).toContain("styles.fruitControls");
    expect(styles).toContain('"plant plant"');
    expect(styles).toContain('"target quantity"');
    expect(styles).toContain('"fruit fruit"');
    expect(styles).toContain('"mutation mutation"');
    expect(styles).toContain('"friends decay"');
    expect(styles).toContain("align-content: start");
    expect(styles).not.toContain("nth-child");
  });

  it("opens harvest on valid add while preserving manual toggle and reset close", () => {
    expect(component).toContain("const [harvestOpen, setHarvestOpen] = useState(false)");
    expect(component).toContain("setHarvestOpen(true)");
    expect(component).toContain("open={harvestOpen}");
    expect(component).toContain("onToggle={(event) => setHarvestOpen(event.currentTarget.open)}");
    expect(component).toContain("setHarvestOpen(false)");
    expect(component).toContain("className={styles.cartActions}");
  });
});
