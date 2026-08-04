import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const pagePath = path.join(process.cwd(), "src/app/page.tsx");

describe("homepage player-content contract", () => {
  it("keeps the how-to steps player-focused and the visible FAQ in sync with schema", async () => {
    const page = await readFile(pagePath, "utf8");
    const faqBlock = page.match(/const faqs = \[([\s\S]*?)\n\];/)?.[1] ?? "";

    expect(page).toContain("<h2>How to use this calculator</h2>");
    expect(page).toContain("<h3>1. Pick your plant</h3>");
    expect(page).toContain("<h3>2. Enter weight or a target</h3>");
    expect(page).toContain("<h3>3. Match your server bonuses</h3>");
    expect(page).toContain("<h3>4. Check the result</h3>");
    expect(page).toContain("<h2>Frequently asked questions</h2>");
    expect(faqBlock.match(/question:/g)).toHaveLength(6);
    expect(page).toContain("<JsonLd data={faqSchema(faqs)} />");
    expect(page).toContain("{faqs.map((faq) => (");
    expect(page).not.toMatch(/<h1\b/);
  });
});
