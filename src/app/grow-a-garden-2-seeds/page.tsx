import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Seeds",
  "Verified Grow a Garden 2 seed database placeholder with source and freshness rules.",
  "/grow-a-garden-2-seeds"
);

export default function SeedsPage() {
  return (
    <>
      <JsonLd
        data={faqSchema([
          {
            question: "Are Grow a Garden 2 seeds verified?",
            answer:
              "No seed names, rarities, shop prices, or crop stats are published as verified until reliable Grow a Garden 2 sources confirm them."
          }
        ])}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Seeds Watch", path: "/grow-a-garden-2-seeds" }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">Seed watch page</p>
        <h1>Seeds Watch</h1>
        <p className="muted">
          The seed database is prepared for verified seed names, rarity, shop source, price,
          crop value, and last verified timestamps. No seed stats are published until reliable
          GAG2 data is available.
        </p>
        <Link className="button" href="/grow-a-garden-2-stock-tracker">
          Check stock tracker
        </Link>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">Answer first</p>
        <h2>Are Grow a Garden 2 Seeds Verified?</h2>
        <p className="lead">
          No Grow a Garden 2 seed list is treated as verified here yet. This watch page exists
          so players know which fields will be checked: seed name, rarity, shop source, price,
          crop value, mutation behavior, and verification timestamp.
        </p>
      </section>
      <section className="section section-tight">
        <h2>What Will Be Verified</h2>
        <div className="grid">
          {[
            "Seed name and exact in-game spelling",
            "Shop or event source",
            "Rarity and price",
            "Crop value and mutation behavior",
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
