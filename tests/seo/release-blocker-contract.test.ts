import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { metadata as petMetadata } from "@/app/grow-a-garden-2-pet-calculator/page";
import { metadata as seedTierMetadata } from "@/app/grow-a-garden-2-seed-tier-list/page";
import { routes } from "@/data/site";

const root = process.cwd();
const source = (relativePath: string) => readFile(path.join(root, relativePath), "utf8");

describe("release blocker SEO and disclosure contract", () => {
  it("keeps unsupported pet and seed-tier routes directly accessible but out of indexing collections", async () => {
    expect(petMetadata.robots).toEqual({ index: false, follow: true });
    expect(seedTierMetadata.robots).toEqual({ index: false, follow: true });
    expect(routes.map((route) => route.path)).not.toContain("/grow-a-garden-2-pet-calculator");
    expect(routes.map((route) => route.path)).not.toContain("/grow-a-garden-2-seed-tier-list");

    const [header, llms] = await Promise.all([
      source("src/components/SiteHeader.tsx"),
      source("public/llms.txt")
    ]);
    for (const indexedSurface of [header, llms]) {
      expect(indexedSurface).not.toContain("/grow-a-garden-2-pet-calculator");
      expect(indexedSurface).not.toContain("/grow-a-garden-2-seed-tier-list");
    }
  });

  it("keeps the homepage H1 exact and discloses every result input and its evidence limits", async () => {
    const calculator = await source("src/components/CalculatorTool.tsx");
    expect(calculator).toMatch(/<h1[^>]*>Grow a Garden 2 Calculator<\/h1>/);
    expect(calculator.match(/<h1\b/g)).toHaveLength(1);
    for (const label of ["Plant", "Weight", "Target", "Quantity", "Fruit Price", "Mutation", "Friends", "Decay", "Formula:", "Data:", "Verified:", "Confidence and limits:"]) {
      expect(calculator).toContain(label);
    }
  });

  it("provides stable Value List share anchors and stable entity-row ids", async () => {
    const [page, list] = await Promise.all([
      source("src/app/grow-a-garden-2-value-list/page.tsx"),
      source("src/components/ValueList.tsx")
    ]);
    expect(page).toContain('id="plants-base-value"');
    expect(page).toContain("<h2>Plants Base Value</h2>");
    expect(page).toContain('id="fruit-price"');
    expect(page).toContain("<h2>Fruit Price</h2>");
    expect(list).toContain("id={`value-row-${entity.id}-${observation.valueType}`}");
  });

  it("keeps both the exact legacy calculator path and its subpaths on a permanent redirect", async () => {
    const config = JSON.parse(await source("vercel.json")) as {
      redirects: Array<{ source: string; destination: string; permanent: boolean }>;
    };
    expect(config.redirects).toEqual(expect.arrayContaining([
      { source: "/grow-a-garden-2-calculator", destination: "/", permanent: true },
      { source: "/grow-a-garden-2-calculator/", destination: "/", permanent: true },
      { source: "/grow-a-garden-2-calculator/:path*", destination: "/", permanent: true },
      { source: "/grow-a-garden-2-calculator/:path*/", destination: "/", permanent: true }
    ]));
  });
});
