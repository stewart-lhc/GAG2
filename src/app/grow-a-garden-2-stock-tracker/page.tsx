import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { StockTracker } from "@/components/StockTracker";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";
const path="/grow-a-garden-2-stock-tracker";
const title="Grow a Garden 2 Restock Watchlist & Timer";
const description="Use a five-minute shop reminder and keep a personal list of seeds and gear to check in game.";
export const metadata:Metadata=pageMetadata(title,description,path);
const faqs=[
 {question:"How often do shops change?",answer:"Seed and gear shops usually change every five minutes."},
 {question:"Can this show current stock?",answer:"No. This is a reminder and personal list; open the game to see stock."},
 {question:"Will the reminder match my timezone?",answer:"Yes. The next check is converted to your local time."}
];
export default function StockTrackerPage(){return <>
 <JsonLd data={webAppSchema(title,"A five-minute restock reminder and personal item watchlist for Grow a Garden 2.",path)}/><JsonLd data={faqSchema(faqs)}/><JsonLd data={breadcrumbSchema([{name:"Home",path:"/"},{name:"Restock Watchlist",path}])}/>
 <section className="section section-hero"><p className="eyebrow">Restock reminder and watchlist</p><h1>Grow a Garden 2 Restock Watchlist</h1><p className="lead">Get a five-minute reminder to check the shop and keep the seeds and gear you care about in one list. It cannot see your current inventory.</p><div className="button-row"><Link className="button blue" href="/grow-a-garden-2-seeds">See seeds</Link><Link className="button secondary" href="/grow-a-garden-2-gear">See gear</Link><Link className="button secondary" href="/grow-a-garden-2-seed-restock-time">See restock timing</Link></div></section>
 <section className="section section-tight"><StockTracker/></section>
 <section className="section section-tight"><h2>What this page does</h2><div className="grid"><article className="panel"><h3>Reminds you</h3><p>Know when to open the in-game shop.</p></article><article className="panel"><h3>Keeps your list</h3><p>Your watchlist stays on this device for next time.</p></article><article className="panel"><h3>Fruit Stock is separate</h3><p>Fruit Price Stock follows a ten-minute cycle and is not mixed into the seed or gear timer.</p></article></div></section>
 <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><ul><li><a href="https://growagarden2.fandom.com/wiki/Seed_Shop" target="_blank" rel="noreferrer">Seed Shop timing reference</a></li><li><a href="https://growagarden2.fandom.com/wiki/Mechanics" target="_blank" rel="noreferrer">Shop and Fruit Stock reference</a></li><li><a href="https://gag.gg/seed-restock/" target="_blank" rel="noreferrer">Five-minute boundary reference</a></li></ul></details></section>
 <section className="section section-tight"><h2>Restock FAQ</h2><div className="grid">{faqs.map(f=><article className="panel" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></section>
 </>}
