import Link from "next/link";
import { CodesTool } from "@/components/CodesTool";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
const path="/grow-a-garden-2-codes";
export const metadata=pageMetadata("Grow a Garden 2 Codes","Copy recently reported Grow a Garden 2 codes and redeem them in the game.",path);
const faqs=[
 {question:"Which codes are listed as active?",answer:"TEAMGREENBEAN, WATERYOPLANTS, and REMEMBERTODRINKWATER are listed as active by recent guides."},
 {question:"Were these codes tested in game?",answer:"No. Redeem them in game; an invalid message means the code has expired."},
 {question:"Can a code expire suddenly?",answer:"Yes. Codes can expire without notice. Stop trying when the game rejects one."}
];
export default function CodesPage(){return <>
 <JsonLd data={faqSchema(faqs)}/><JsonLd data={breadcrumbSchema([{name:"Home",path:"/"},{name:"Codes",path}])}/>
 <section className="section section-hero"><p className="eyebrow">Recently reported active</p><h1>Grow a Garden 2 Codes</h1><p className="lead">Copy a code, open Settings in the game, and paste it in. Codes expire, so the in-game message is final.</p><div className="button-row"><Link className="button" href="/">Open calculator</Link><Link className="button secondary" href="/grow-a-garden-2-seeds">See seed prices</Link></div></section>
 <section className="section section-tight"><CodesTool/></section>
 <section className="section section-tight"><details className="source-details"><summary>Where do these numbers come from?</summary><ul><li><a href="https://www.gamesradar.com/games/simulation/grow-a-garden-2-codes/" target="_blank" rel="noreferrer">GamesRadar code roundup</a></li><li><a href="https://www.pcgamer.com/roblox/grow-a-garden-2-codes/" target="_blank" rel="noreferrer">PC Gamer code roundup</a></li><li><a href="https://robloxden.com/game-codes/grow-a-garden-2" target="_blank" rel="noreferrer">RobloxDen code list</a></li></ul></details></section>
 <section className="section section-tight"><h2>Common questions</h2><div className="grid">{faqs.map(f=><article className="panel" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></article>)}</div></section>
 </>}
