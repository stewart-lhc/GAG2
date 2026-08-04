import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
const path="/grow-a-garden-2-night-stealing-guide";
export const metadata=pageMetadata("Grow a Garden 2 Night Safety Guide","What to protect at night, how to stay safe, and which claims have no reliable numbers yet.",path);
const faqs=[
 {question:"Can crops be stolen at night?",answer:"The official game description says stealing starts at night."},
 {question:"Is there a theft timer or guaranteed defense?",answer:"No reliable official numbers or guaranteed defense item are published."},
 {question:"Does this guide include scripts or exploits?",answer:"No. It covers ordinary account safety and farm preparation only."}
];
export default function NightStealingPage(){return <>
 <JsonLd data={faqSchema(faqs)}/><JsonLd data={breadcrumbSchema([{name:"Home",path:"/"},{name:"Night Stealing Guide",path}])}/>
 <section className="section section-hero"><p className="eyebrow">Protect your farm before night</p><h1>Grow a Garden 2 Night Safety Guide</h1><p className="lead">The official description confirms that <strong>stealing starts at night</strong>. It does not publish exact odds or a guaranteed defense, so this page sticks to safe preparation.</p><div className="button-row"><a className="button blue" href="https://www.roblox.com/games/97598239454123/Grow-a-Garden-2" target="_blank" rel="noreferrer">Open official game</a><Link className="button secondary" href="/grow-a-garden-2-gear">Review gear</Link></div></section>
 <section className="section section-tight"><h2>What the official description says</h2><blockquote className="panel"><p>Players buy seeds, grow and sell crops for Sheckles, form guilds, face stealing at night, and keep growing while offline.</p></blockquote><p className="muted">Paraphrased from the official Roblox description; no hidden mechanic is implied.</p></section>
 <section className="section section-tight"><h2>Three things before night</h2><div className="grid"><article className="panel"><h3>Harvest valuable crops</h3><p>Deal with the things you care about before stepping away.</p></article><article className="panel"><h3>Use clearly described gear</h3><p>Review pets and gear with a stated use, but do not treat anything as guaranteed protection.</p></article><article className="panel"><h3>Protect your account</h3><p>Do not install scripts, share credentials, or pay strangers for “protection.”</p></article></div></section>
 <section className="section section-tight"><h2>Known and unknown</h2><div className="table-wrap"><table><thead><tr><th>Claim</th><th>Current status</th></tr></thead><tbody><tr><th scope="row">Stealing starts at night</th><td>Mentioned in the official description</td></tr><tr><th scope="row">Gardens grow while offline</th><td>Mentioned in the official description</td></tr><tr><th scope="row">Exact theft odds or cooldown</th><td>Not published</td></tr><tr><th scope="row">Guaranteed defense item</th><td>Not published</td></tr></tbody></table></div></section>
 <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><p><a href="https://www.roblox.com/games/97598239454123/Grow-a-Garden-2" target="_blank" rel="noreferrer">Official Grow a Garden 2 Roblox page</a></p></details></section>
 <section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map(f=><article className="panel" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></section>
 </>}
