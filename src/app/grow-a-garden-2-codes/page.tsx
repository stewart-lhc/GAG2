import { CodesTool } from "@/components/CodesTool";
import { JsonLd } from "@/components/JsonLd";
import { codes } from "@/data/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Codes",
  "Verified Grow a Garden 2 codes, expired code handling, and safe redeem guidance.",
  "/grow-a-garden-2-codes"
);

export default function CodesPage() {
  return (
    <>
      <JsonLd
        data={faqSchema([
          {
            question: "Are there active Grow a Garden 2 codes?",
            answer: `As of ${codes.lastChecked}, this hub has not verified any active Grow a Garden 2 codes.`
          },
          {
            question: "Can Grow a Garden 1 codes be used for Grow a Garden 2?",
            answer:
              "This hub does not assume Grow a Garden 1 codes work in Grow a Garden 2 unless a verified source confirms it."
          }
        ])}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Codes", path: "/grow-a-garden-2-codes" }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">No fake codes</p>
        <h1>Codes Check</h1>
        <p className="muted">
          Codes are only listed after verification. Empty states are intentional and safer than
          publishing fake or recycled code lists.
        </p>
      </section>
      <section className="section section-tight">
        <p className="eyebrow">Answer first</p>
        <h2>Are There Active Grow a Garden 2 Codes?</h2>
        <p className="lead">
          As of {codes.lastChecked}, this hub has not verified any active Grow a Garden 2
          codes. The page avoids recycled Grow a Garden 1 codes and does not publish copied
          code lists unless a reliable GAG2 source confirms them.
        </p>
      </section>
      <section className="section section-tight">
        <CodesTool />
      </section>
    </>
  );
}
