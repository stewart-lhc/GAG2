import Link from "next/link";
import { MutationCalculator } from "@/components/MutationCalculator";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata, webAppSchema } from "@/lib/seo";

const title = "Grow a Garden 2 Mutation Calculator";
const description = "Choose one Grow a Garden 2 mutation and see how much it can raise a crop's sell value. Mutations are single-choice.";
const path = "/grow-a-garden-2-mutation-calculator";
const faqItems = [
  { question: "Can mutations stack in Grow a Garden 2?", answer: "No. Current GAG2 game guides show one mutation per crop, so the calculator allows exactly one selection." },
  { question: "Where do these multipliers come from?", answer: "They come from the current GAG2 mutation table. If your game differs after an update, use the in-game number." },
  { question: "What does this result include?", answer: "It multiplies your base sell value by the effective mutation multiplier. Single-harvest crops get a reduced bonus; weight, decay, friend bonuses, and Fruit Stock are not included." }
];
export const metadata = pageMetadata(title, description, path);
export default function Page() { return <><JsonLd data={webAppSchema(title, description, path)} /><JsonLd data={faqSchema(faqItems)} /><JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Mutation Calculator", path }])} /><section className="section section-hero tool-hero"><p className="eyebrow">Mutation value calculator</p><h1>{title}</h1><p className="lead">{description}</p></section><section className="section section-tight"><MutationCalculator /></section><section className="section section-tight"><h2>How to read it</h2><p>Enter the base sell value you see in game and choose one mutation. To include weight, friends, and Fruit Stock, use the <Link href="/">Grow a Garden 2 calculator</Link>; the full table is in the <Link href="/grow-a-garden-2-mutations-guide">mutation guide</Link>.</p></section><section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqItems.map((item) => <article className="panel" key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section></>; }
