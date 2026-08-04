import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { plantRecords } from "@/data/game/entities";
import { seedShopRecords } from "@/data/game/shop";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

const path = "/grow-a-garden-2-seeds";
const title = "Grow a Garden 2 Seeds: Prices, Base Values & Harvest Types";
const description = "Compare Grow a Garden 2 seed prices, base sell values, and harvest types without mixing farm and trade numbers.";

export const metadata: Metadata = pageMetadata(title, description, path);

const shopByPlantName = new Map(seedShopRecords.map((record) => [record.name, record]));
const seeds = plantRecords.map((plant) => ({ plant, shop: shopByPlantName.get(plant.name) }));

const faqs = [
  { question: "Is seed price the same as crop sell value?", answer: "No. Seed price is what you pay to plant; base sell value is the starting payout. Trade reference is separate." },
  { question: "Which seeds can be harvested more than once?", answer: "Multi crops keep producing after a harvest. Carrot, Tulip, Bamboo, and Mushroom are single-harvest." },
  { question: "How often does this list change?", answer: "Game updates can change the numbers. Missing shop prices stay Unknown instead of being guessed." }
];

export default function SeedsPage() {
  return <>
    <JsonLd data={faqSchema(faqs)} />
    <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Seeds", path }])} />
    <section className="section section-hero"><p className="eyebrow">Seeds and farming</p><h1>Grow a Garden 2 Seeds</h1><p className="lead">This table separates <strong>what you pay for a seed</strong> from <strong>what the crop sells for</strong>. Trade reference units stay separate.</p><div className="button-row"><Link className="button blue" href="/">Calculate crop value</Link><Link className="button secondary" href="/grow-a-garden-2-seed-tier-list">See seed tiers</Link><Link className="button secondary" href="/grow-a-garden-2-stock-tracker">Set a restock reminder</Link></div></section>
    <section className="section section-tight"><p className="eyebrow">Farming cost and return</p><h2>Seed price and base sell value</h2><div className="table-wrap"><table><thead><tr><th>Seed</th><th>Seed price</th><th>Shop odds</th><th>Base sell</th><th>Harvest</th></tr></thead><tbody>{seeds.map(({ plant, shop }) => <tr key={plant.id}><th scope="row">{plant.name}</th><td>{shop ? `${shop.price.toLocaleString("en-US")} ${shop.currency}` : "Unknown"}</td><td>{shop?.restockChance ?? "Unknown"}</td><td>{plant.baseSellValue.toLocaleString("en-US")} Sheckles</td><td>{plant.multiHarvest ? "Multi" : "Single"}</td></tr>)}</tbody></table></div><p className="muted">These are recent shop records, not a promise of current stock. Missing prices stay Unknown.</p></section>
    <section className="section section-tight"><h2>How to read the numbers</h2><div className="grid"><article className="panel"><h3>Seed price</h3><p>Use it to plan farming cost and break-even time.</p></article><article className="panel"><h3>Base sell</h3><p>The starting value used by the crop calculator.</p></article><article className="panel"><h3>Trade reference</h3><p>Use it only in the <Link href="/grow-a-garden-2-trading-calculator">Trading Calculator</Link>; it is not Sheckles.</p></article></div></section>
    <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><ul><li><a href="https://www.roblox.com/games/97598239454123/Grow-a-Garden-2" rel="noreferrer" target="_blank">Official Roblox game page</a></li><li><a href="https://growagarden2.fandom.com/wiki/Module:Crop_Data?oldid=6906" rel="noreferrer" target="_blank">GAG2 Crop Data reference</a></li><li><a href="https://growagarden2.fandom.com/wiki/Seed_Shop?oldid=6811" rel="noreferrer" target="_blank">GAG2 Seed Shop reference</a></li></ul></details></section>
    <section className="section section-tight"><h2>Seed FAQ</h2><div className="grid">{faqs.map((faq) => <article className="panel" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></section>
  </>;
}
