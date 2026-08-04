import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy Policy",
  "Privacy policy for the unofficial Grow a Garden 2 Tools Hub.",
  "/privacy-policy"
);

export default function PrivacyPage() {
  return (
    <section className="section section-hero">
      <p className="eyebrow">No Roblox credentials</p>
      <h1>Privacy Policy</h1>
      <p className="muted">
        This site does not ask for Roblox passwords, cookies, tokens, or account credentials. Do
        not paste them into any form or tool. The home <Link href="/">Calculator</Link> runs on
        the values you enter in your browser.
      </p>
      <p className="muted">
        The site uses Google Analytics 4 (measurement ID G-R25NGR07BJ) for standard page and
        device usage analytics. Google&apos;s own privacy terms apply to that service. We may also
        record small anonymous usage events such as a tool action, the page it happened on, and
        the time it happened. These events do not include Roblox credentials, account details, or
        a user profile.
      </p>
      <p className="muted">
        A few convenience choices stay only in your browser, such as recent-visit comparisons,
        your restock watchlist, and code reminders. They contain displayed values or selected
        item names, not passwords or account data. Clear them with the page controls where
        available or by clearing this site&apos;s browser data. Clearing browser data does not erase
        Google Analytics information.
      </p>
      <p className="muted">
        No sign-in, subscriptions, or player profiles are used on this site. If that changes,
        this policy must be updated before collecting new information.
      </p>
    </section>
  );
}
