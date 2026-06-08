import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Gear",
  "Verified Grow a Garden 2 gear database placeholder with defensive and stock-tracker links.",
  "/grow-a-garden-2-gear"
);

export default function GearPage() {
  return (
    <>
      <JsonLd
        data={faqSchema([
          {
            question: "Is Grow a Garden 2 gear verified?",
            answer:
              "No gear names, prices, shop cycles, or protection effects are published as verified until reliable Grow a Garden 2 sources confirm them."
          }
        ])}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gear Board", path: "/grow-a-garden-2-gear" }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">Protection gear watch</p>
        <h1>Gear Board</h1>
        <p className="muted">
          Gear data will be listed only after source review. For now, use the stock tracker and
          night stealing guide to understand the fields that will be verified for tools,
          protection items, shop cycles, and defensive planning.
        </p>
        <div className="button-row">
          <Link className="button" href="/grow-a-garden-2-stock-tracker">
            Open stock tracker
          </Link>
          <Link className="button secondary" href="/grow-a-garden-2-night-stealing-guide">
            Night stealing guide
          </Link>
        </div>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">Answer first</p>
        <h2>Are Grow a Garden 2 Gear Items Verified?</h2>
        <p className="lead">
          No Grow a Garden 2 gear list is treated as verified here yet. This board keeps the
          verification structure visible for item name, source, price, shop timing, protection
          effect, and last checked timestamp without inventing gear data.
        </p>
      </section>
      <section className="section section-tight">
        <h2>What Gear Data Needs a Source</h2>
        <div className="grid">
          {[
            "Exact item name and category",
            "Shop, event, or quest source",
            "Price and refresh timing",
            "Protection or utility effect",
            `Last checked against source on ${siteConfig.lastVerified} or later`
          ].map((item) => (
            <article className="panel" key={item}>
              <h3>{item}</h3>
              <p>Pending until a reliable GAG2 source is reviewed.</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
