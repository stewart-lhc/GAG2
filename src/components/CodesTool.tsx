"use client";
import { useState } from "react";

const reportedCodes=[
 {code:"TEAMGREENBEAN",reward:"3× Green Bean Seeds"},
 {code:"WATERYOPLANTS",reward:"10× Common Watering Cans"},
 {code:"REMEMBERTODRINKWATER",reward:"1× Common Watering Can"}
];

export function CodesTool(){
 const [copied,setCopied]=useState<string|null>(null);
 async function copyCode(code:string){await navigator.clipboard.writeText(code);setCopied(code)}
 return <div className="panel">
  <span className="badge badge-warning">Reported active · not in-game tested by this site</span>
  <h2 style={{marginTop:14}}>Reported active codes</h2>
  <p className="muted">Three independent editorial/code trackers still listed these codes as active on July 24–25, 2026. Codes can expire without notice.</p>
  <div className="grid">{reportedCodes.map(item=><article className="flat-panel" key={item.code}><h3>{item.code}</h3><p>{item.reward}</p><button className="button" type="button" onClick={()=>copyCode(item.code)}>{copied===item.code?"Copied":"Copy code"}</button></article>)}</div>
  <div className="flat-panel" style={{marginTop:18}}><h3>How to redeem</h3><ol><li>Open the official Grow a Garden 2 Roblox experience.</li><li>Open Settings from the top-left cog.</li><li>Paste the case-sensitive code into the code box and press Claim.</li></ol><p className="muted">Never enter Roblox credentials on a third-party code page.</p></div>
 </div>
}
