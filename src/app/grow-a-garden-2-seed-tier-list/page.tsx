import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

const path="/grow-a-garden-2-seed-tier-list";
const title="Grow a Garden 2 Seed Tier List: Method & Launch Rankings";
const description="A Grow a Garden 2 seed ranking based on farming income, access, and usefulness; newer seeds stay separate.";
export const metadata:Metadata=pageMetadata(title,description,path);
const tiers=[
  ["S","Ghost Pepper; Dragon's Breath; Venus Fly Trap; Moon Bloom; Venom Spitter","Top launch income or exceptional defensive utility"],
  ["A","Poison Ivy; Poison Apple; Pomegranate; Sunflower; Mushroom","Strong value or accessible launch ROI"],
  ["B","Cherry; Dragon Fruit; Bamboo; Acorn","Solid progression choices with clear trade-offs"],
  ["C","Mango; Coconut; Grape; Banana; Green Bean; Pineapple; Cactus; Corn; Apple; Tulip","Lower per-harvest income or weaker cost efficiency"],
  ["D","Tomato; Blueberry; Strawberry; Carrot","Starter progression"],
  ["Unranked","Atlantic Giant Pumpkin; Star Fruit; Sun Bloom; Hypno Bloom; Glow Mushroom; Fire Fern; Rocket Pop; Eclipse Bloom; Maple/Fall additions","Added after the launch ranking or not enough comparable farm results yet"]
];
const faqs=[
  {question:"What is a good starter seed?",answer:"Moon Bloom has strong sell performance, while Dragon's Breath and Venus Fly Trap add utility. Updates can change the order."},
  {question:"Why are some seeds unranked?",answer:"Newer seeds do not yet have comparable price, sell, harvest, and use details. Forcing a rank would mislead."},
  {question:"Is this a trade-value ranking?",answer:"No. It ranks farming usefulness. Player-trade reference units are separate."}
];
export default function SeedTierListPage(){return <>
  <JsonLd data={{"@context":"https://schema.org","@type":"Article",headline:title,description,inLanguage:"en"}}/><JsonLd data={faqSchema(faqs)}/><JsonLd data={breadcrumbSchema([{name:"Home",path:"/"},{name:"Seed Tier List",path}])}/>
  <section className="section section-hero"><p className="eyebrow">Farming usefulness ranking</p><h1>Grow a Garden 2 Seed Tier List</h1><p className="lead">A quick farming reference, not a forever answer. We look at sell value, access, repeat harvests, and practical use; newer seeds stay unranked until the basics are comparable.</p><div className="button-row"><Link className="button blue" href="/grow-a-garden-2-seeds">Check seed data</Link><Link className="button secondary" href="/">Calculate value</Link></div></section>
  <section className="section section-tight"><h2>Seed tiers</h2><div className="table-wrap"><table><thead><tr><th>Tier</th><th>Seeds</th><th>Best for</th></tr></thead><tbody>{tiers.map(([tier,seeds,meaning])=><tr key={tier}><th scope="row">{tier === "Unranked" ? "Unranked" : tier}</th><td>{seeds}</td><td>{meaning}</td></tr>)}</tbody></table></div></section>
  <section className="section section-tight"><h2>How the ranking works</h2><div className="grid"><article className="panel"><h3>Income</h3><p>Base sell value and whether the plant keeps producing.</p></article><article className="panel"><h3>Access</h3><p>Seed price, access route, and time to recover the cost.</p></article><article className="panel"><h3>Usefulness</h3><p>Documented defense or harvest utility can break a close tie.</p></article></div></section>
  <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><ul><li><a href="https://progameguides.com/roblox/grow-a-garden-2-seeds-tier-list/" target="_blank" rel="noreferrer">Pro Game Guides seed ranking</a></li><li><a href="https://www.gag2.gg/wiki/seeds" target="_blank" rel="noreferrer">GAG2.GG seed reference</a></li><li><Link href="/grow-a-garden-2-seeds">Seed prices and base values</Link></li></ul></details></section>
  <section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map(f=><article className="panel" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></section>
</>}
