import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { petRecords } from "@/data/game/entities";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

const path = "/grow-a-garden-2-pet-weight-guide";
const title = "Grow a Garden 2 Pet Variants & Ability Guide";
const description =
  "Review Grow a Garden 2 pet names, rarities, and ability categories without inventing an age, weight, or variant formula.";

export const metadata: Metadata = pageMetadata(title, description, path);

const faqs = [
  {
    question: "Does GAG2 have a pet weight formula?",
    answer:
      "No reliable GAG2 age-to-weight formula is established. This guide does not transfer the original Grow a Garden formula to GAG2."
  },
  {
    question: "Do Big, Mega, and Rainbow use one multiplier for every pet?",
    answer:
      "Variant effects can differ by pet, so one multiplier cannot safely cover every ability."
  },
  {
    question: "Can an ability category tell me a pet trade value?",
    answer:
      "No. Ability behavior and player trade value are separate; rarity does not convert into Sheckles or a guaranteed price."
  }
];

const sourceUrls = Array.from(new Set(petRecords.map((pet) => pet.sourceUrl)));

export default function PetWeightGuidePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: title, description, inLanguage: "en" }} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pet Variants", path }])} />

      <section className="section section-hero">
        <p className="eyebrow">GAG2 pet guide</p>
        <h1>Grow a Garden 2 Pet Variants</h1>
        <p className="lead">
          The current references support a pet roster, rarity labels, and ability categories. They do not establish a reliable universal formula for age, weight, ability multipliers, or cash value.
        </p>
        <div className="button-row">
          <Link className="button blue" href="/grow-a-garden-2-pet-calculator">Inspect pet details</Link>
          <Link className="button secondary" href="/grow-a-garden-2-trading-calculator">Compare player trades</Link>
        </div>
      </section>

      <section className="section section-tight">
        <h2>Why exact pet math is excluded</h2>
        <div className="callout">
          Copying numbers from the original Grow a Garden—or applying one GAG2 pet row to every pet—would create false precision. Until current GAG2 parameters are established, this page says “unavailable” instead of inventing numbers.
        </div>
      </section>

      <section className="section section-tight">
        <h2>Pet ability reference</h2>
        <p className="muted">
          These are ability categories, not calculated amounts. Check each pet for its variant behavior.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Pet</th><th>Rarity</th><th>Ability category</th><th>Numeric estimate</th></tr></thead>
            <tbody>
              {petRecords.map((pet) => (
                <tr key={pet.id}>
                  <th scope="row">{pet.name}</th>
                  <td>{pet.rarity}</td>
                  <td>{pet.baselineAbility}</td>
                  <td>Unavailable — check per pet</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section section-tight">
        <h2>How to read variants</h2>
        <div className="grid">
          <article className="panel"><h3>Choose the exact pet</h3><p>Start with the pet name and baseline ability. Do not infer a missing amount from rarity.</p></article>
          <article className="panel"><h3>Check its variant row</h3><p>Normal, Big, Mega, and Rainbow effects can be pet-specific. No universal multiplier is used.</p></article>
          <article className="panel"><h3>Keep ability separate from price</h3><p>Ability behavior does not automatically become Sheckles or trade value. Trade comparisons use player offers.</p></article>
        </div>
      </section>

      <section className="section section-tight">
        <h2>Sources</h2>
        <ul>
          {sourceUrls.map((url) => (
            <li key={url}><a href={url} target="_blank" rel="noreferrer">Grow a Garden 2 Pets reference</a></li>
          ))}
        </ul>
      </section>

      <section className="section section-tight">
        <h2>Common questions</h2>
        <div className="grid">
          {faqs.map((faq) => <article className="panel" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}
        </div>
      </section>
    </>
  );
}
