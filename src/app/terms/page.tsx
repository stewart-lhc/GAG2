import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Terms",
  "Terms and safety boundaries for the unofficial Grow a Garden 2 Tools Hub.",
  "/terms"
);

export default function TermsPage() {
  return (
    <section className="section">
      <h1 style={{ color: "var(--ink)" }}>Terms</h1>
      <p className="muted">
        Use this site as an unofficial reference. Data can be incomplete or stale, so important
        game decisions should be checked in Roblox before acting.
      </p>
      <p className="muted">
        This site does not host Roblox account services, item trading, Robux offers, scripts,
        exploits, or credential collection.
      </p>
    </section>
  );
}
