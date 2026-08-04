import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { ValueList } from "@/components/ValueList";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

const title = "Grow a Garden 2 Value List";
const description = "Search, filter, and sort Grow a Garden 2 base sell values, weights, and player-trade reference units.";
const path = "/grow-a-garden-2-value-list";
const faqs = [
  { question: "What is a base sell value?", answer: "The crop's starting Sheckles value before weight, mutation, Fruit Stock, decay, and friend bonuses." },
  { question: "What is a trade reference unit?", answer: "A rough comparison from player trades. It is not Sheckles, Robux, cash, or a guaranteed offer." },
  { question: "Why keep them separate?", answer: "Shop prices, crop sell prices, and player trades answer different questions. Mixing them would mislead." }
];
export const metadata = pageMetadata(title, description, path);
export default function Page() { return <><JsonLd data={webAppSchema(title, description, path)} /><JsonLd data={faqSchema(faqs)} /><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Value List", path }])} /><section className="section section-hero"><p className="eyebrow">GAG2 value list</p><h1>{title}</h1><p className="lead">{description}</p><div className="button-row"><Link className="button blue" href="/">Open crop calculator</Link><Link className="button" href="/grow-a-garden-2-trading-calculator">Compare a trade</Link></div></section><section className="section section-tight" id="plants-base-value"><h2>Plants Base Value</h2><p className="muted">Use the confirmed base sell-value rows below as a starting point; weight, Fruit Price, mutations, friends, and decay can change the final payout.</p><ValueList /></section><section className="section section-tight" id="fruit-price"><h2>Fruit Price</h2><p className="muted">Fruit Price is the multiplier shown in your game. Enter the current multiplier in the <Link href="/">calculator</Link>; this list does not pretend it is a fixed crop price.</p></section><section className="section section-tight"><h2>Keep these three numbers separate</h2><div className="grid"><article className="panel"><h3>Base sell value</h3><p>How many Sheckles the crop starts with.</p></article><article className="panel"><h3>Seed or shop price</h3><p>What you pay to obtain an item.</p></article><article className="panel"><h3>Trade reference</h3><p>A player-swap comparison, not Sheckles.</p></article></div></section><section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map((faq) => <article className="panel" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></section></>; }
