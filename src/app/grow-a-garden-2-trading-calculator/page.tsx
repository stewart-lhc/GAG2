import Link from "next/link";
import { TradingCalculator } from "@/components/TradingCalculator";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

const title = "Grow a Garden 2 Trading Calculator";
const description = "Put up what you are offering and what you want back to see whether the trade looks roughly fair.";
const path = "/grow-a-garden-2-trading-calculator";
const faqs = [
  { question: "How is Win, Fair, or Loss calculated?", answer: "The tool divides what you receive by what you give. More than 110% is Win, 90% through 110% is Fair, and less than 90% is Loss." },
  { question: "Are these reference units Sheckles?", answer: "No. They are player-trade comparison units, separate from crop Sheckles and shop prices." },
  { question: "Are these guaranteed market prices?", answer: "No. They are dated community trade observations. Demand and individual offers can change." }
];
export const metadata = pageMetadata(title, description, path);
export default function Page() { return <><JsonLd data={webAppSchema(title, description, path)} /><JsonLd data={faqSchema(faqs)} /><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Trading Calculator", path }])} /><section className="section section-hero tool-hero"><p className="eyebrow">Player trade comparison</p><h1>{title}</h1><p className="lead">{description}</p></section><section className="section section-tight"><TradingCalculator /></section><section className="section section-tight"><h2>Know which number you are reading</h2><p>This uses player-trade reference units, not Sheckles. For crop sell prices use the <Link href="/">crop calculator</Link>; for one-item lookups use the <Link href="/grow-a-garden-2-value-list">value list</Link>.</p></section><section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map((item) => <article className="panel" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section></>; }
