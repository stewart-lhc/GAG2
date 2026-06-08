import { JsonLd } from "@/components/JsonLd";
import { StockTracker } from "@/components/StockTracker";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

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
      <JsonLd
        data={faqSchema([
          {
            question: "Is Grow a Garden 2 live stock verified?",
            answer:
              "No live Grow a Garden 2 stock cycle is treated as verified on this page yet. Unknown rows remain visible so players can watch the right shops without inventing stock claims."
          },
          {
            question: "Why does the stock tracker show unknown states?",
            answer:
              "Unknown states prevent fake stock data from spreading. The tracker is prepared for verified shop, rarity, price, refresh, and source fields once reliable GAG2 data is available."
          }
        ])}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Stock Tracker", path: "/grow-a-garden-2-stock-tracker" }
        ])}
      />
      <section className="section section-hero tool-hero">
        <p className="eyebrow">Stock is a sport</p>
        <h1>Shop Trading Floor</h1>
        <p className="muted">
          Filter shops, rarity, and verification state first. Unknown stock stays visible,
          but never treated as live inventory.
        </p>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">Answer first</p>
        <h2>Can Players Trust This Stock?</h2>
        <p className="lead">
          Grow a Garden 2 live stock is not marked as verified here until a reliable source is
          accepted. The tracker keeps shop rows, watch actions, and source fields visible, but
          it does not turn unknown inventory into fake live stock.
        </p>
      </section>
      <section className="section section-tight market-shell">
        <StockTracker />
      </section>
    </>
  );
}
