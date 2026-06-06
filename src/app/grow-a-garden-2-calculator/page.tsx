import { CalculatorTool } from "@/components/CalculatorTool";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "Grow a Garden 2 Calculator",
  "Estimate Grow a Garden 2 crop value from user-entered base value, weight, amount, and mutation multiplier.",
  "/grow-a-garden-2-calculator"
);

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={webAppSchema(
          "Grow a Garden 2 Calculator",
          "Alpha crop value calculator using visible formulas and user-entered values.",
          "/grow-a-garden-2-calculator"
        )}
      />
      <JsonLd
        data={faqSchema([
          {
            question: "How accurate is the Grow a Garden 2 calculator?",
            answer:
              "It is an alpha estimator. It uses user-entered values until verified GAG2 crop and mutation data are available."
          },
          {
            question: "Does the calculator use game code?",
            answer:
              "No. It does not use decompiled game code, scripts, exploits, or hidden platform data."
          }
        ])}
      />
      <section className="section section-hero">
        <p className="eyebrow">Crop math alpha</p>
        <h1>Value Calculator</h1>
        <p className="muted">
          Estimate crop value with transparent inputs. Verified crop presets can be added after
          in-game testing or reliable source review.
        </p>
      </section>
      <section className="section section-tight">
        <CalculatorTool />
      </section>
    </>
  );
}
