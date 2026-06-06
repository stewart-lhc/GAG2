import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { ToolCard } from "@/components/ToolCard";
import { releaseFacts, siteConfig } from "@/data/site";

export default function Home() {
  return (
    <>
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
              <a className="button" href={siteConfig.robloxUrl} rel="noreferrer" target="_blank">
                Enter safe page
              </a>
              <Link className="button blue" href="/grow-a-garden-2-stock-tracker">
                Watch stock
              </Link>
            </div>
          </div>
          <div className="panel command-board">
            <span className="badge badge-warning">Clone guard on</span>
            <h2 style={{ marginTop: 14 }}>Should I jump in?</h2>
            <div className="decision-strip">
              <div className="meter-ring">Link OK</div>
              <div>
                <h3>Verify before joining</h3>
                <p className="muted">
                  The page exists. Release timing and shop cycles stay marked Unknown until a
                  reliable source confirms them.
                </p>
              </div>
            </div>
            <div className="stat-grid">
              <div className="stat">
                <span>Playing</span>
                <strong>{siteConfig.apiSnapshot.playing.toLocaleString()}</strong>
              </div>
              <div className="stat">
                <span>Visits</span>
                <strong>{Math.round(siteConfig.apiSnapshot.visits / 1000)}K</strong>
              </div>
              <div className="stat">
                <span>Creator</span>
                <strong>{siteConfig.creator}</strong>
              </div>
              <div className="stat">
                <span>Source</span>
                <strong>API</strong>
              </div>
            </div>
          </div>
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
