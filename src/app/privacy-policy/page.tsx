import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy Policy",
  "Privacy policy for the unofficial Grow a Garden 2 Tools Hub.",
  "/privacy-policy"
);

export default function PrivacyPage() {
  return (
    <section className="section">
      <h1 style={{ color: "var(--ink)" }}>Privacy Policy</h1>
      <p className="muted">
        This MVP does not require Roblox account credentials. Future subscriptions should collect
        only the minimum contact information needed for alerts and provide a deletion path.
      </p>
      <p className="muted">
        Analytics events should measure page views, tool actions, external-link clicks, reports,
        and subscription intent without collecting Roblox passwords, cookies, or tokens.
      </p>
    </section>
  );
}
