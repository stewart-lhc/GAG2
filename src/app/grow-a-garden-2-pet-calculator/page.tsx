import type { Metadata } from "next";
import Link from "next/link";
import { PetCalculator } from "@/components/PetCalculator";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

const title = "Grow a Garden 2 Pet Ability & Variant Guide";
const description = "Inspect Grow a Garden 2 pet abilities and variants. Where reliable numbers are missing, this page says so.";
const path = "/grow-a-garden-2-pet-calculator";
const faqs = [
  { question: "Do pet variants share one multiplier?", answer: "There is no reliable global multiplier. Effects can differ by pet, so check each one." },
  { question: "Can this calculate pet age or weight?", answer: "No. A reliable GAG2 formula is not available, and formulas from another game are not transferred here." },
  { question: "Can this calculate Rainbow trade value?", answer: "No. Ability effects and player trade value are separate, and reliable pet trade observations are not available." }
];
export const metadata: Metadata = {
  ...pageMetadata(title, description, path),
  robots: { index: false, follow: true }
};
export default function Page() { return <><JsonLd data={webAppSchema(title, description, path)} /><JsonLd data={faqSchema(faqs)} /><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Pet Ability & Variant Guide", path }])} /><section className="section section-hero tool-hero"><p className="eyebrow">Pet ability lookup</p><h1>{title}</h1><p className="lead">{description}</p></section><section className="section section-tight"><PetCalculator /></section><section className="section section-tight"><h2>Why this page does not invent numbers</h2><p>Variant effects are checked per pet. This page shows the roster, abilities, and source without guessing age, weight, Sheckles, ability amounts, or trade value. See the <Link href="/grow-a-garden-2-pet-weight-guide">pet weight guide</Link> for the open questions.</p></section><section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map((item) => <article className="panel" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section></>; }
