import { SourceList } from "@/components/SourceList";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About GAG2 Tools",
  "About this unofficial Grow a Garden 2 tools hub, data standards, and safety boundaries.",
  "/about"
);

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <h1 style={{ color: "var(--ink)" }}>About GAG2 Tools</h1>
        <p className="muted">
          This is an unofficial fan tools hub. It is built around visible verification,
          fast utility, and clear safety boundaries: no Roblox login, no item selling,
          no Robux claims, no scripts, and no automation that bypasses platform rules.
        </p>
      </section>
      <SourceList />
    </>
  );
}
