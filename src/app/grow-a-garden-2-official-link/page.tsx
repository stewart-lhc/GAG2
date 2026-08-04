import Link from "next/link";
import { RobloxSnapshotCard } from "@/components/RobloxSnapshotCard";
import { SourceList } from "@/components/SourceList";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { siteConfig } from "@/data/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";

export const metadata = pageMetadata(
  "Grow a Garden 2 Official Roblox Link",
  "Verify the current Grow a Garden 2 Roblox place ID, universe ID, creator, and fake-clone warnings before joining.",
  "/grow-a-garden-2-official-link"
);

const faqItems = [
  {
    question: "How should I check the Grow a Garden 2 link?",
    answer:
      "Open the Roblox experience URL tracked on this page, then compare the place ID, creator, and current availability before joining. Avoid pages asking for passwords, cookies, account transfers, downloads, or free Robux claims."
  },
  {
    question: "How can I spot a fake Grow a Garden 2 clone?",
    answer:
      "Treat mismatched place IDs, mismatched creator names, external login prompts, item-selling claims, script downloads, and free Robux offers as warnings before joining or sharing a link."
  }
];

export default function OfficialLinkPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Link Check", path: "/grow-a-garden-2-official-link" }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">Official link checked August 4, 2026</p>
        <h1>Roblox Link Check</h1>
        <p className="muted">
          Direct answer: Roblox lists place {siteConfig.robloxPlaceId} under creator group {siteConfig.creator}. Compare those details before joining because clone pages can use similar names and artwork.
        </p>
        <div className="button-row">
          <TrackedExternalLink
            className="button"
            eventName="official_link_click"
            href={siteConfig.robloxUrl}
            position="official_link_hero"
          >
            Check Roblox page
          </TrackedExternalLink>
          <span className="button secondary code-chip" aria-label={`Roblox place ID ${siteConfig.robloxPlaceId}`}>
            Place ID: {siteConfig.robloxPlaceId}
          </span>
          <Link className="button secondary" href="/">Open Calculator</Link>
        </div>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">Answer first</p>
        <h2>Before you join</h2>
        <p className="lead">
          Use the Roblox page linked here and check place ID {siteConfig.robloxPlaceId}, game ID {siteConfig.robloxUniverseId}, and creator {siteConfig.creator}. If a page changes those details or asks for credentials, downloads, or account transfers, leave it.
        </p>
      </section>
      <section className="section section-tight">
        <div className="stat-grid">
          <div className="stat">
            <span>Creator</span>
            <strong>{siteConfig.creator}</strong>
          </div>
          <div className="stat">
            <span>Game ID</span>
            <strong>{siteConfig.robloxUniverseId}</strong>
          </div>
          <div className="stat">
            <span>Max players</span>
            <strong>{siteConfig.apiSnapshot.maxPlayers}</strong>
          </div>
          <div className="stat">
            <span>Checked</span>
            <strong>{siteConfig.lastVerified}</strong>
          </div>
        </div>
      </section>
      <section className="section section-tight">
        <RobloxSnapshotCard snapshot={siteConfig.apiSnapshot} />
      </section>
      <section className="section section-tight">
        <h2>Quick safety checks</h2>
        <div className="grid">
          {[
            "Does the Roblox URL contain the configured place ID?",
            `Does the creator line show ${siteConfig.creator}?`,
            "Does the page avoid external account login requests?",
            "Does it avoid free Robux, item selling, or script download claims?"
          ].map((item) => (
            <article className="panel" key={item}>
              <h3>{item}</h3>
              <p>Failing this check should be treated as a warning before joining or sharing.</p>
            </article>
          ))}
        </div>
      </section>
      <SourceList />
      <section className="section section-tight">
        <p className="eyebrow">FAQ</p>
        <h2>Link-check questions</h2>
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
