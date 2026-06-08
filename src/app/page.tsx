import Link from "next/link";
import { ChangeSinceLastVisit } from "@/components/ChangeSinceLastVisit";
import { JsonLd } from "@/components/JsonLd";
import { RobloxSnapshotCard } from "@/components/RobloxSnapshotCard";
import { StatusBadge } from "@/components/StatusBadge";
import { ToolCard } from "@/components/ToolCard";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import { releaseFacts, siteConfig } from "@/data/site";
import { faqSchema, pageMetadata, websiteSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Tools Hub",
  "Verify the Grow a Garden 2 Roblox link, check release status, watch stock and codes, estimate crop value, and plan around night stealing risk.",
  "/"
);

export default function Home() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd
        data={faqSchema([
          {
            question: "What is GAG2 Tools?",
            answer:
              "GAG2 Tools is an unofficial Grow a Garden 2 player command center for checking the Roblox link, release status, stock watch states, codes, crop value estimates, and night stealing risk."
          },
          {
            question: "Is GAG2 Tools an official Grow a Garden 2 site?",
            answer:
              "No. GAG2 Tools is an unofficial fan tools site. It links to the tracked Roblox experience and shows source and freshness details so players can avoid fake clone pages."
          }
        ])}
      />
      <section className="hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <span className="pill pill-green">Official link verified</span>
            <span className="pill pill-yellow" style={{ marginLeft: 10 }}>
              Player first
            </span>
            <h1 className="hero-title">Grow Smarter Than Rumors</h1>
            <p className="lead">
              Open the verified Roblox page, then check stock, codes, crop value, and night
              risk before you join.
            </p>
            <div className="button-row">
              <TrackedExternalLink
                className="button"
                eventName="official_link_click"
                href={siteConfig.robloxUrl}
                position="home_hero"
              >
                Enter safe page
              </TrackedExternalLink>
              <Link className="button blue" href="/grow-a-garden-2-stock-tracker">
                Watch stock
              </Link>
            </div>
          </div>
          <div className="command-board">
            <RobloxSnapshotCard compact snapshot={siteConfig.apiSnapshot} />
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <p className="eyebrow">Direct answers</p>
        <h2>Grow a Garden 2 Checks Players Ask First</h2>
        <div className="grid">
          <article className="panel">
            <h3>What is GAG2 Tools?</h3>
            <p>
              GAG2 Tools is an unofficial Grow a Garden 2 player command center. It helps
              players verify the Roblox page, separate confirmed facts from unknowns, watch
              stock and codes safely, estimate crop values, and plan around night stealing risk.
            </p>
          </article>
          <article className="panel">
            <h3>Is it official?</h3>
            <p>
              No. This is a fan tools site, not a Roblox or Grow a Garden 2 property. The
              official-link page points players to the tracked Roblox experience and shows
              place ID, creator, and freshness signals before they join.
            </p>
          </article>
          <article className="panel">
            <h3>Where should players go safely?</h3>
            <p>
              Players should use the verified Roblox link on this site, then compare the place
              ID and creator before joining. Pages asking for passwords, cookies, Robux claims,
              account transfers, or external downloads should be treated as unsafe clones.
            </p>
          </article>
          <article className="panel">
            <h3>What is verified today?</h3>
            <p>
              The site currently treats the tracked Roblox experience, configured place ID,
              creator, and public source list as verified. Exact release timing, live stock,
              active codes, and final crop formulas stay unknown until reliable GAG2 sources
              confirm them.
            </p>
          </article>
        </div>
      </section>

      <section className="section section-tight">
        <p className="eyebrow">First-screen rule</p>
        <h2>Open, Watch, Copy, Calculate, Protect</h2>
        <div className="grid">
          <ToolCard
            action="Check release"
            body="Confirmed, rumor, and unknown sections for release-date and availability searches."
            href="/grow-a-garden-2-release-date"
            icon="REL"
            title="Release Hub"
          />
          <ToolCard
            action="Filter inventory"
            body="Shop tabs, stale states, and report-ready rows for verified stock once data is available."
            href="/grow-a-garden-2-stock-tracker"
            icon="STK"
            title="Stock Tracker"
          />
          <ToolCard
            action="Review codes"
            body="Active and expired code handling with no recycled or unverified code claims."
            href="/grow-a-garden-2-codes"
            icon="CODE"
            title="Codes"
          />
          <ToolCard
            action="Estimate value"
            body="Alpha calculator for user-entered base value, weight, amount, and mutation multiplier."
            href="/grow-a-garden-2-calculator"
            icon="CALC"
            title="Calculator Alpha"
          />
        </div>
      </section>

      <section className="section section-tight">
        <div className="two-col">
          <div>
            <p className="eyebrow">Trust loop</p>
            <h2>Unknown Has Actions</h2>
            <p className="lead">
              GAG2 data can be incomplete. The UI still gives players a useful next move:
              verify the official page, watch a shop, report stock, or run a defensive risk
              check.
            </p>
          </div>
          <aside className="panel">
            <h3>Roblox API Snapshot</h3>
            <div className="stat-grid">
              <div className="stat">
                <span>Place ID</span>
                <strong>{siteConfig.robloxPlaceId}</strong>
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
                <span>Verified</span>
                <strong>{siteConfig.lastVerified}</strong>
              </div>
            </div>
          </aside>
          <ChangeSinceLastVisit snapshot={siteConfig.apiSnapshot} />
        </div>
      </section>

      <section className="section section-tight">
        <p className="eyebrow">Launch facts</p>
        <h2>Confirmed vs Unknown</h2>
        <div className="grid">
          {releaseFacts.map((fact) => (
            <article className="panel" key={fact.label}>
              <StatusBadge tone={fact.status} />
              <h3 style={{ marginTop: 14 }}>{fact.label}</h3>
              <p>{fact.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
