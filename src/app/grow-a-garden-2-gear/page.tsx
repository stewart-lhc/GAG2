import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Gear",
  "Verified Grow a Garden 2 gear database placeholder with defensive and stock-tracker links.",
  "/grow-a-garden-2-gear"
);

export default function GearPage() {
  return (
    <section className="section section-hero">
      <p className="eyebrow">Protection gear watch</p>
      <h1>Gear Board</h1>
      <p className="muted">
        Gear data will be listed only after source review. For now, use the stock tracker and
        night stealing guide to understand the data fields that will be verified.
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
  );
}
