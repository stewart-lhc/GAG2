import { JsonLd } from "@/components/JsonLd";
import { StockTracker } from "@/components/StockTracker";
import { pageMetadata, webAppSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Stock Tracker",
  "Filter Grow a Garden 2 stock status by shop, rarity, and verification state.",
  "/grow-a-garden-2-stock-tracker"
);

export default function StockTrackerPage() {
  return (
    <>
      <JsonLd
        data={webAppSchema(
          "Grow a Garden 2 Stock Tracker",
          "A verification-first stock tracker for Grow a Garden 2 shops and events.",
          "/grow-a-garden-2-stock-tracker"
        )}
      />
      <section className="section section-hero tool-hero">
        <p className="eyebrow">Stock is a sport</p>
        <h1>Shop Trading Floor</h1>
        <p className="muted">
          Filter shops, rarity, and verification state first. Unknown stock stays visible,
          but never treated as live inventory.
        </p>
      </section>
      <section className="section section-tight market-shell">
        <StockTracker />
      </section>
    </>
  );
}
