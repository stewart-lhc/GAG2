import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
const path="/grow-a-garden-2-mutations-guide";
const title="Grow a Garden 2 Mutations: Current Multipliers";
const description="Compare current Grow a Garden 2 mutation multipliers with the key rule that a crop carries only one mutation at a time.";
export const metadata:Metadata=pageMetadata(title,description,path);
const mutations=[
 ["Gold","10×"],["Rainbow","30×"],["Electric","25×"],
 ["Aurora","1.5×"],["Frozen","14×"],["Amber","20×"],["Veil","20×"],
 ["Starstruck","50×"],["Bloodlit","60×"],["Ignited","60×"],["Eclipsed","80×"],["Glow","100×"]
];
const faqs=[
 {question:"Can GAG2 crop mutations stack?",answer:"No. Current GAG2 references agree that a crop carries one mutation at a time. Choose the visible mutation; do not multiply several mutation chips together."},
 {question:"What is the highest multiplier here?",answer:"Glow is listed at 100× in the current table. Updates can change these numbers, so check the game if your result looks different."},
 {question:"Why do other guides show different values?",answer:"Guides are updated at different times. Use this table for a quick comparison and trust what your game currently shows."}
];
export default function MutationsGuidePage(){return <>
 <JsonLd data={{"@context":"https://schema.org","@type":"Article",headline:title,description,inLanguage:"en"}}/><JsonLd data={faqSchema(faqs)}/><JsonLd data={breadcrumbSchema([{name:"Home",path:"/"},{name:"Mutations",path}])}/>
 <section className="section section-hero"><p className="eyebrow">Current mutation table · August 2026</p><h1>Grow a Garden 2 Mutations</h1><p className="lead"><strong>Use one mutation per crop.</strong> Pick the mutation you see in game and check its bonus.</p><div className="button-row"><Link className="button blue" href="/grow-a-garden-2-mutation-calculator">Calculate mutation value</Link><Link className="button secondary" href="/">Calculate crop value</Link></div></section>
 <section className="section section-tight"><h2>Mutations you can select</h2><div className="table-wrap"><table><thead><tr><th>Mutation</th><th>Multiplier</th><th>Status</th></tr></thead><tbody>{mutations.map(([name,multiplier])=><tr key={name}><th scope="row">{name}</th><td>{multiplier}</td><td>Selectable</td></tr>)}</tbody></table></div><p className="muted">Solarflare, Pizza, Chained, and Secret are left out because the current references do not list them as selectable.</p></section>
 <section className="section section-tight"><h2>Why guides disagree</h2><p>Guides are updated at different times. Keep the table and calculator consistent, and use your in-game result when numbers differ.</p></section>
 <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><ul><li><a href="https://growagarden2.fandom.com/wiki/Mutations?oldid=6848" target="_blank" rel="noreferrer">Grow a Garden 2 Mutations reference</a></li><li><a href="https://www.gag2.gg/wiki/mutations" target="_blank" rel="noreferrer">GAG2.GG comparison table</a></li><li><Link href="/grow-a-garden-2-plant-size-guide">Plant size and weight guide</Link></li></ul></details></section>
 <section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map(f=><article className="panel" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></section>
</>}
