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
      routes: Array<{ src: string; headers?: { Location?: string }; status?: number }>;
    };
    const route = (src: string, location: string) => ({
      src,
      headers: { Location: location },
      status: 308
    });
    expect(config.routes).toContainEqual(route("^/trading-calculator/?$", "/grow-a-garden-2-trading-calculator/"));
    expect(config.routes).toContainEqual(route("^/value-list/?$", "/grow-a-garden-2-value-list/"));
    expect(config.routes).toContainEqual(route("^/mutation-calculator/?$", "/grow-a-garden-2-mutation-calculator/"));
    expect(config.routes).toContainEqual(route("^/seed-restock-time/?$", "/grow-a-garden-2-seed-restock-time/"));

    const legacyRoutes = config.routes.filter(({ src }) => src.startsWith("^/grow-a-garden-2-calculator"));
    expect(legacyRoutes).toEqual([
      route("^/grow-a-garden-2-calculator/?$", "/"),
      route("^/grow-a-garden-2-calculator(?:/.*)?/?$", "/")
    ]);
    expect(config.routes).toContainEqual(expect.objectContaining({
      src: "^(?:/((?!\\.well-known(?:/.*)?)(?:[^/]+/)*[^/\\.]+))$",
      status: 308,
      headers: { Location: "/$1" }
    }));
    expect(config.routes.some(({ src }) => src === "^/.*$" || src === "/.*")).toBe(false);
  });
});
