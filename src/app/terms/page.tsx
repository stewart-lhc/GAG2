import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Terms",
  "Terms and safety boundaries for the unofficial Grow a Garden 2 Tools Hub.",
  "/terms"
);

export default function TermsPage() {
  return (
    <section className="section section-hero">
      <p className="eyebrow">Safety boundaries</p>
      <h1>Terms</h1>
      <p className="muted">
        GAG2 Tools is an unofficial fan reference and is not affiliated with, endorsed by, or
        operated by Roblox, Grow a Garden, Grow A Garden 2, or their creators. Data can be
        incomplete, estimated, unknown, or stale. Check Roblox and the relevant official source
        before acting. The home <Link href="/">Calculator</Link> is a player-input math aid, not
        an official game system.
      </p>
      <p className="muted">
        Calculator outputs and value comparisons are estimates, not promises of an item&apos;s
        availability, trade value, market price, or outcome. Nothing here guarantees a trade or
        transaction, and this site does not facilitate cash trades, Robux trades, item selling,
        or any other off-platform transaction.
      </p>
      <p className="muted">
        Do not submit Roblox passwords, cookies, session tokens, payment details, or other
        credentials. Do not use this site to request or distribute scripts, exploits, bots,
        auto-join tools, or automation intended to bypass Roblox rules or gain an unfair
        advantage. You are responsible for checking claims and complying with Roblox&apos;s rules.
      </p>
    </section>
  );
}
