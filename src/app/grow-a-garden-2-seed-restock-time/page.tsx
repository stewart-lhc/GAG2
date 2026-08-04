import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SeedRestockTimer } from "@/components/SeedRestockTimer";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

const title = "Grow a Garden 2 Seed Restock Time";
const description = "See how long until the Grow a Garden 2 Seed Shop, Gear Shop, and Fruit Price Stock refresh, using a simple local countdown.";
const path = "/grow-a-garden-2-seed-restock-time";
const faqs = [
  { question: "When should I check the Seed Shop?", answer: "Every 5 minutes. Use the countdown to know when to look in the game again." },
  { question: "When does Fruit Price Stock change?", answer: "Every 10 minutes. The timer shows the next time to check." },
  { question: "Does this show the items in my server?", answer: "No. It tells you when the shop refreshes, not which items appear. Open the game after the countdown to see your own shop." }
];
export const metadata = pageMetadata(title, description, path);
export default function Page() { return <><JsonLd data={webAppSchema(title, description, path)} /><JsonLd data={faqSchema(faqs)} /><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Seed Restock Time", path }])} /><section className="section section-hero tool-hero"><p className="eyebrow">Your next shop check</p><h1>{title}</h1><p className="lead">Seed Shop and Gear Shop refresh every 5 minutes. Fruit Price Stock refreshes every 10 minutes. Use the countdown below to know when to check the game again.</p></section><section className="section section-tight market-shell"><SeedRestockTimer /></section><section className="section section-tight"><h2>What this timer tells you</h2><p>This page tells you when the shop refreshes. It cannot see the items in your server, so check the game after the countdown. For a personal item list, open the <Link href="/grow-a-garden-2-stock-tracker">restock watchlist</Link>; for seed details, see the <Link href="/grow-a-garden-2-seeds">seed guide</Link>.</p></section><section className="section section-tight"><h2>Restock FAQ</h2><div className="grid">{faqs.map((faq) => <article className="panel" key={faq.question}><h3>{faq.question}</h3><p>{faq.answer}</p></article>)}</div></section></>; }
