import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { gearShopRecords } from "@/data/game/shop";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

const path = "/grow-a-garden-2-gear";
const title = "Grow a Garden 2 Gear: Prices, Effects & Restock Odds";
const description = "Compare Grow a Garden 2 gear prices, uses, and shop odds; check the game for current inventory.";
export const metadata: Metadata = pageMetadata(title, description, path);

const faqs = [
  { question: "Do sprinklers guarantee a larger crop?", answer: "No. The notes describe a gardening boost, not a fixed result." },
  { question: "Do shop odds mean the item is in stock?", answer: "No. Odds are a reference; open the in-game shop to check now." },
  { question: "Are gear trade values Sheckles?", answer: "No. Player-trade reference units are separate from Sheckles and Leaf shop prices." }
];

export default function GearPage() {
  return <>
    <JsonLd data={faqSchema(faqs)} /><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Gear", path }])} />
    <section className="section section-hero"><p className="eyebrow">Gear prices and uses</p><h1>Grow a Garden 2 Gear</h1><p className="lead">Check price, use, and shop odds here; stock changes, so confirm in the game when you are ready to buy.</p><div className="button-row"><Link className="button blue" href="/grow-a-garden-2-stock-tracker">Set a restock reminder</Link><Link className="button secondary" href="/grow-a-garden-2-plant-size-guide">See plant sizes</Link></div></section>
    <section className="section section-tight"><h2>Gear prices and effects</h2><div className="table-wrap"><table><thead><tr><th>Gear</th><th>Shop price</th><th>Amount / odds</th><th>General use</th><th>Status</th></tr></thead><tbody>{gearShopRecords.map((gear) => <tr key={gear.id}><th scope="row">{gear.name}</th><td>{gear.price.toLocaleString("en-US")} {gear.currency}</td><td>{gear.stockAmount} / {gear.restockChance}</td><td>{gear.effect}</td><td>{gear.obtainable ? "Obtainable" : "Unavailable"}</td></tr>)}</tbody></table></div><p className="muted">These are recent price and odds records, not a promise that the item is in stock now.</p></section>
    <section className="section section-tight"><h2>Three things to check</h2><div className="grid"><article className="panel"><h3>Currency</h3><p>Sheckles and Leaf are different currencies.</p></article><article className="panel"><h3>Odds are not stock</h3><p>Use odds as a guide, then check the shop when the timer hits.</p></article><article className="panel"><h3>Stick to the stated use</h3><p>Where the notes only give a general boost, we do not invent a fixed bonus.</p></article></div></section>
    <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><ul><li><a href="https://growagarden2.fandom.com/wiki/Gears?oldid=6904" target="_blank" rel="noreferrer">GAG2 Gears reference</a></li><li><Link href="/grow-a-garden-2-night-stealing-guide">Night safety guide</Link></li></ul></details></section>
    <section className="section section-tight"><h2>Gear FAQ</h2><div className="grid">{faqs.map((faq) => <article className="panel" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></section>
  </>;
}
