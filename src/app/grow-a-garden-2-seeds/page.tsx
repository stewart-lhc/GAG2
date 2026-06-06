import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Seeds",
  "Verified Grow a Garden 2 seed database placeholder with source and freshness rules.",
  "/grow-a-garden-2-seeds"
);

export default function SeedsPage() {
  return (
    <section className="section section-hero">
      <p className="eyebrow">Seed database shell</p>
      <h1>Seeds Watch</h1>
      <p className="muted">
        The seed database is prepared for verified seed names, rarity, shop source, price,
        and last verified timestamps. No seed stats are published until reliable GAG2 data is available.
      </p>
      <Link className="button" href="/grow-a-garden-2-stock-tracker">
        Check stock tracker
      </Link>
    </section>
  );
}
