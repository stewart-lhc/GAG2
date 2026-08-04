import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
const path="/grow-a-garden-2-plant-size-guide";
const title="Grow a Garden 2 Plant Size & Weight Guide";
const description="Understand the current Grow a Garden 2 size-to-weight and diminishing-return value curve, including Mushroom and Bamboo overrides.";
export const metadata:Metadata=pageMetadata(title,description,path);
const faqs=[
 {question:"Is plant height the same as fruit weight?",answer:"No. The current mechanics model calculates fruit weight from the crop's base weight and a size multiplier. Visual plant height is not a substitute for the weight shown on produce."},
 {question:"How does size change sell value?",answer:"Larger crops are usually worth more, but growth differs by plant; Mushroom and Bamboo use different curves."},
 {question:"Can a sprinkler guarantee a target weight?",answer:"No. It changes the random outcome but cannot promise a fixed weight."}
];
export default function PlantSizeGuidePage(){return <>
 <JsonLd data={{"@context":"https://schema.org","@type":"Article",headline:title,description,inLanguage:"en"}}/><JsonLd data={faqSchema(faqs)}/><JsonLd data={breadcrumbSchema([{name:"Home",path:"/"},{name:"Plant Size Guide",path}])}/>
 <section className="section section-hero"><p className="eyebrow">Plant size and sell value</p><h1>Grow a Garden 2 Plant Size Guide</h1><p className="lead">Heavier crops are usually worth more, but not in a simple one-to-one way. The weight shown in your game is the key calculator input.</p><div className="button-row"><Link className="button blue" href="/">Open crop calculator</Link><Link className="button secondary" href="/grow-a-garden-2-gear">See sprinklers</Link></div></section>
 <section className="section section-tight"><h2>Current size model</h2><div className="panel"><p><code>Weight (kg) = BaseWeight × Size</code></p><p><code>SizeFactor = Size^Exponent</code> while Size is at or below the knee. Above the knee, the curve uses the lower tail exponent to reduce runaway growth.</p></div><div className="table-wrap"><table><thead><tr><th>Parameter</th><th>Current value</th><th>Meaning</th></tr></thead><tbody><tr><th>Default exponent</th><td>2.5</td><td>Most crops</td></tr><tr><th>Mushroom exponent</th><td>1.9</td><td>Crop-specific override</td></tr><tr><th>Bamboo exponent</th><td>1.75</td><td>Crop-specific override</td></tr><tr><th>Default knee</th><td>5</td><td>Diminishing returns begin</td></tr><tr><th>Tail exponent</th><td>1.5</td><td>Growth above the knee</td></tr></tbody></table></div></section>
 <section className="section section-tight"><h2>What sprinklers can do</h2><p>Sprinklers affect the random size result, but they do not guarantee a giant crop. Compare several harvests before treating a pattern as reliable.</p></section>
 <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><p>The size and sell curves come from the current GAG2 Mechanics reference; older guides may differ.</p><ul><li><a href="https://growagarden2.fandom.com/wiki/Mechanics" target="_blank" rel="noreferrer">Grow a Garden 2 Mechanics reference</a></li><li><Link href="/grow-a-garden-2-seeds">Crop base sell values</Link></li></ul></details></section>
 <section className="section section-tight"><h2>Plant size FAQ</h2><div className="grid">{faqs.map(f=><article className="panel" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></section>
</>}
