import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("Value List schema and short-route redirects", () => {
  it("keeps WebApplication, FAQ, and breadcrumb JSON-LD on the Value List page", async () => {
    const source = await readFile(path.join(root, "src/app/grow-a-garden-2-value-list/page.tsx"), "utf8");

    expect(source).toContain("webAppSchema(title, description, path)");
    expect(source).toContain("faqSchema(faqs)");
    expect(source).toContain("breadcrumbSchema");
  });

  it("redirects each exact short alias, with or without a slash, to its canonical trailing-slash route", async () => {
    const config = JSON.parse(await readFile(path.join(root, "vercel.json"), "utf8")) as {
      redirects: Array<{ source: string; destination: string; permanent: boolean }>;
    };
    const expected = [
      ["/trading-calculator", "/grow-a-garden-2-trading-calculator/"],
      ["/trading-calculator/", "/grow-a-garden-2-trading-calculator/"],
      ["/value-list", "/grow-a-garden-2-value-list/"],
      ["/value-list/", "/grow-a-garden-2-value-list/"],
      ["/mutation-calculator", "/grow-a-garden-2-mutation-calculator/"],
      ["/mutation-calculator/", "/grow-a-garden-2-mutation-calculator/"],
      ["/seed-restock-time", "/grow-a-garden-2-seed-restock-time/"],
      ["/seed-restock-time/", "/grow-a-garden-2-seed-restock-time/"]
    ] as const;

    for (const [source, destination] of expected) {
      expect(config.redirects).toContainEqual({ source, destination, permanent: true });
    }
    expect(config.redirects.filter(({ source }) => source.includes(":path*"))).toEqual([
      { source: "/grow-a-garden-2-calculator/:path*", destination: "/", permanent: true },
      { source: "/grow-a-garden-2-calculator/:path*/", destination: "/", permanent: true }
    ]);
  });
});
