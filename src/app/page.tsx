import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { ToolCard } from "@/components/ToolCard";
import { releaseFacts, siteConfig } from "@/data/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Unofficial fan tools - verified {siteConfig.lastVerified}</p>
          <h1>Grow a Garden 2 Tools Hub</h1>
          <p className="lead">
            Check the official Roblox link, release status, stock readiness, codes, crop
            value estimates, and night stealing risk without treating rumors as confirmed.
          </p>
          <div className="button-row">
            <Link className="button" href="/grow-a-garden-2-stock-tracker">
              Open stock tracker
            </Link>
            <Link className="button secondary" href="/grow-a-garden-2-official-link">
              Verify official link
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="two-col">
          <div>
            <h2>Launch Status Snapshot</h2>
            <p className="muted">
              The hub separates confirmed platform facts from unknown launch details. This
              keeps release-date traffic useful without publishing clickbait.
            </p>
            <div className="grid">
              {releaseFacts.map((fact) => (
                <article className="panel" key={fact.label}>
                  <StatusBadge tone={fact.status} />
                  <h3 style={{ marginTop: 12 }}>{fact.label}</h3>
                  <p>{fact.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="panel">
            <h2>Roblox API Snapshot</h2>
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
                <span>Creator</span>
                <strong>{siteConfig.creator}</strong>
              </div>
              <div className="stat">
                <span>Visits</span>
                <strong>{siteConfig.apiSnapshot.visits.toLocaleString()}</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-tight">
        <h2>P0 Tools</h2>
        <div className="grid">
          <ToolCard
            action="Check status"
            body="Confirmed, rumor, and unknown sections for release-date and availability searches."
            href="/grow-a-garden-2-release-date"
            title="Release Hub"
          />
          <ToolCard
            action="Filter inventory"
            body="Shop tabs, stale states, and report-ready rows for verified stock once data is available."
            href="/grow-a-garden-2-stock-tracker"
            title="Stock Tracker"
          />
          <ToolCard
            action="Review codes"
            body="Active and expired code handling with no recycled or unverified code claims."
            href="/grow-a-garden-2-codes"
            title="Codes"
          />
          <ToolCard
            action="Estimate value"
            body="Alpha calculator for user-entered base value, weight, amount, and mutation multiplier."
            href="/grow-a-garden-2-calculator"
            title="Calculator Alpha"
          />
        </div>
      </section>
    </>
  );
}
