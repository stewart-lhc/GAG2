import { JsonLd } from "@/components/JsonLd";
import { NightRiskTool } from "@/components/NightRiskTool";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Night Stealing Guide",
  "Understand the Grow a Garden 2 night stealing description and estimate crop risk without exploit guidance.",
  "/grow-a-garden-2-night-stealing-guide"
);

export default function NightStealingPage() {
  return (
    <>
      <JsonLd
        data={faqSchema([
          {
            question: "Is night stealing confirmed in Grow a Garden 2?",
            answer:
              "The Roblox description mentions that others can steal when night comes if you leave your garden. Exact mechanics still need in-game verification."
          },
          {
            question: "Does this page teach exploits?",
            answer:
              "No. It only gives defensive planning guidance and does not provide scripts, automation, or account-risk behavior."
          }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">Protect before AFK</p>
        <h1>Night Risk Guide</h1>
        <p className="muted">
          The official Roblox description mentions night stealing. This page turns that into
          defensive planning, not exploit instructions.
        </p>
      </section>
      <section className="section section-tight">
        <NightRiskTool />
      </section>
      <section className="section section-tight">
        <h2>Launch Strategy</h2>
        <div className="grid">
          <article className="panel">
            <h3>Before leaving</h3>
            <p>Harvest or protect the highest-value crops first, especially when rules are still changing.</p>
          </article>
          <article className="panel">
            <h3>Guild coordination</h3>
            <p>Use guilds for planning and alerts, but do not share account access or credentials.</p>
          </article>
          <article className="panel">
            <h3>Unknown mechanics</h3>
            <p>Exact timers, protections, and penalties should remain marked as unknown until verified.</p>
          </article>
        </div>
      </section>
    </>
  );
}
