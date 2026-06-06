import { SourceList } from "@/components/SourceList";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Official Link Check",
  "Verify the Grow a Garden 2 Roblox place ID, creator, and fake-clone warning before joining.",
  "/grow-a-garden-2-official-link"
);

export default function OfficialLinkPage() {
  return (
    <>
      <section className="section section-hero">
        <p className="eyebrow">Fake clone warning</p>
        <h1>Official Link Guard</h1>
        <p className="muted">
          Use the Roblox URL below and compare the place ID and creator. Avoid pages that
          ask for passwords, cookies, Robux claims, account transfers, or external downloads.
        </p>
        <div className="button-row">
          <a className="button" href={siteConfig.robloxUrl} rel="noreferrer" target="_blank">
            Open Roblox
          </a>
          <span className="button secondary code-chip" aria-label={`Roblox place ID ${siteConfig.robloxPlaceId}`}>
            Place ID: {siteConfig.robloxPlaceId}
          </span>
        </div>
      </section>
      <section className="section section-tight">
        <div className="stat-grid">
          <div className="stat">
            <span>Creator</span>
            <strong>{siteConfig.creator}</strong>
          </div>
          <div className="stat">
            <span>Universe ID</span>
            <strong>{siteConfig.robloxUniverseId}</strong>
          </div>
          <div className="stat">
            <span>Max players</span>
            <strong>{siteConfig.apiSnapshot.maxPlayers}</strong>
          </div>
          <div className="stat">
            <span>Last verified</span>
            <strong>{siteConfig.lastVerified}</strong>
          </div>
        </div>
      </section>
      <section className="section section-tight">
        <h2>Clone Checks</h2>
        <div className="grid">
          {[
            "Does the Roblox URL contain the configured place ID?",
            "Does the creator line show @BMWLux?",
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
    </>
  );
}
