import Link from "next/link";
import { SourceList } from "@/components/SourceList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About GAG2 Tools",
  "About this unofficial Grow a Garden 2 tools hub, how numbers are checked, and how we keep players safe.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <section className="section section-hero">
        <p className="eyebrow">About this fan tool</p>
        <h1>About GAG2 Tools</h1>
        <p className="muted">
          This is an unofficial fan tools hub built for quick answers and safe play. We never ask for a Roblox login, sell items, promise Robux, or encourage scripts that break platform rules.
        </p>
        <p>
          Need a quick estimate? Start with the <Link href="/">home calculator</Link>. If a number is not known, we show “Unknown” instead of making one up.
        </p>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">How to read this site</p>
        <h2>What the labels mean</h2>
        <div className="grid">
          <article className="panel">
            <h3>Numbers answer different questions</h3>
            <p>
              A seed price, crop sell value, and player trade reference are different things. We keep them separate so a shop price never looks like a trade offer.
            </p>
          </article>
          <article className="panel">
            <h3>Clear status labels</h3>
            <p>
              <strong>Confirmed</strong> means the linked game or community reference supports it. <strong>Estimated</strong> means it is a helpful calculation, not a promise. <strong>Unknown</strong> means we do not have enough to say.
            </p>
          </article>
          <article className="panel">
            <h3>Check the original page</h3>
            <p>
              Important numbers link to the page where they came from. One link does not prove every detail, so check the original page when a number matters to you.
            </p>
          </article>
          <article className="panel">
            <h3>We correct mistakes</h3>
            <p>
              If a number looks wrong or old, we mark it Unknown until it can be checked again. Guesses do not become facts just because they look tidy.
            </p>
          </article>
        </div>
      </section>
      <SourceList />
    </>
  );
}
