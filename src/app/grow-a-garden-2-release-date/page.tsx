import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SourceList } from "@/components/SourceList";
import { StatusBadge } from "@/components/StatusBadge";
import { describedMechanics, releaseFacts, siteConfig } from "@/data/site";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Release Date and Status",
  "Check whether Grow a Garden 2 is out, what is confirmed, and which launch details are still unknown.",
  "/grow-a-garden-2-release-date"
);

export default function ReleasePage() {
  return (
    <>
      <JsonLd
        data={faqSchema([
          {
            question: "Is the Grow a Garden 2 release date confirmed?",
            answer:
              "This hub does not treat an exact final release date as confirmed unless it is supported by official Roblox or creator sources."
          },
          {
            question: "Where should I play Grow a Garden 2?",
            answer:
              "Use the configured Roblox experience link and verify the creator and place ID before joining."
          }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">
          Last verified {siteConfig.lastVerified}
        </p>
        <h1>Release Status</h1>
        <p className="muted">
          A Roblox experience page for Grow A Garden 2 exists, but this page does not turn
          unverified launch timing into a confirmed release-date claim.
        </p>
        <div className="button-row">
          <a className="button" href={siteConfig.robloxUrl} rel="noreferrer" target="_blank">
            Open Roblox page
          </a>
          <Link className="button secondary" href="/grow-a-garden-2-official-link">
            Check official link details
          </Link>
        </div>
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
        <h2>Confirmed Description Signals</h2>
        <div className="chips">
          {describedMechanics.map((item) => (
            <span className="chip" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>
      <SourceList />
    </>
  );
}
