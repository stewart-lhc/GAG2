import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RobloxSnapshotCard } from "@/components/RobloxSnapshotCard";
import { SourceList } from "@/components/SourceList";
import { StatusBadge } from "@/components/StatusBadge";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { describedMechanics, releaseFacts, siteConfig } from "@/data/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Release Date and Status",
  "Check whether Grow a Garden 2 is out, what is confirmed, and which launch details are still unknown.",
  "/grow-a-garden-2-release-date"
);

const faqItems = [
  {
    question: "Is Grow a Garden 2 released?",
    answer:
      "Yes. Roblox lists the experience as created on May 21, 2026, and the public game page was available when we checked it on August 4, 2026."
  },
  {
    question: "Where should I play Grow a Garden 2?",
    answer:
      "Use the Roblox experience link on this site, then verify creator Strawberreh Squad and place ID 97598239454123 before joining."
  }
];

export default function ReleasePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Release Status", path: "/grow-a-garden-2-release-date" }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">
          Checked {siteConfig.lastVerified}
        </p>
        <h1>Release Status</h1>
        <p className="muted">
          Direct answer: Grow a Garden 2 is released. Roblox lists May 21, 2026 as the creation date, and the official game page was available when checked on August 4, 2026.
        </p>
        <div className="button-row">
          <TrackedExternalLink
            className="button"
            eventName="official_link_click"
            href={siteConfig.robloxUrl}
            position="release_hero"
          >
            Check Roblox page
          </TrackedExternalLink>
          <Link className="button secondary" href="/grow-a-garden-2-official-link">
            Check the link
          </Link>
          <Link className="button secondary" href="/">Open Calculator</Link>
        </div>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">Answer first</p>
        <h2>Is Grow a Garden 2 Out?</h2>
        <p className="lead">
          Yes. The official Roblox experience is playable. Roblox lists May 21, 2026 as its creation date; that is not necessarily the same as a marketing launch announcement.
        </p>
      </section>
      <section className="section section-tight">
        <RobloxSnapshotCard snapshot={siteConfig.apiSnapshot} />
      </section>
      <section className="section section-tight">
        <div className="grid">
          {releaseFacts.map((fact) => (
            <article className="panel" key={fact.label}>
              <StatusBadge tone={fact.status} />
              <h3 style={{ marginTop: 12 }}>{fact.label}</h3>
              <p>{fact.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-tight">
        <h2>What Roblox says about the game</h2>
        <p className="muted">
          These features appear in the official Roblox description checked on August 4, 2026. Game balance can still change.
        </p>
        <div className="chips">
          {describedMechanics.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
      <SourceList />
      <section className="section section-tight">
        <p className="eyebrow">FAQ</p>
        <h2>Release status questions</h2>
        <div className="grid">
          {faqItems.map((item) => (
            <article className="panel" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
