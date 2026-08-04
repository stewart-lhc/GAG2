"use client";
import { useEffect, useMemo, useState } from "react";
import { WatchIntentPanel } from "@/components/WatchIntentPanel";

const seedWatch=["Moon Bloom","Dragon's Breath","Star Fruit","Atlantic Giant Pumpkin","Sun Bloom","Hypno Bloom"];
const gearWatch=["Super Sprinkler","Super Watering Can","Legendary Sprinkler","Grappling Hook","Harp"];
const INTERVAL=5*60*1000;

function nextBoundary(now:number){return Math.ceil((now+1)/INTERVAL)*INTERVAL}
function formatCountdown(ms:number){const seconds=Math.max(0,Math.ceil(ms/1000));return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}`}

export function StockTracker(){
 const [now,setNow]=useState<number|null>(null);
 const [query,setQuery]=useState("");
 useEffect(()=>{const tick=()=>setNow(Date.now());tick();const id=window.setInterval(tick,1000);return()=>window.clearInterval(id)},[]);
 const next=now===null?null:nextBoundary(now);
 const rows=useMemo(()=>[
  ...seedWatch.map(name=>({name,shop:"Seed Shop"})),...gearWatch.map(name=>({name,shop:"Gear Shop"}))
 ].filter(row=>row.name.toLowerCase().includes(query.toLowerCase())),[query]);
 return <div className="panel">
  <div className="two-col"><div><span className="badge badge-warning">Reminder to check in game</span><h2 style={{marginTop:14}}>Next shop check</h2><p className="muted">Shops usually change every 5 minutes. The countdown tells you when to look; it does not show the current inventory.</p></div><div className="stat-grid"><div className="stat"><span>Time left</span><strong>{now===null||next===null?"--:--":formatCountdown(next-now)}</strong></div><div className="stat"><span>Change rate</span><strong>5 min</strong></div></div></div>
  <div style={{marginTop:18}}><WatchIntentPanel items={[{id:"rare_seed",label:"Rare seed",description:"Remember which rare seed to check at the next boundary."},{id:"premium_gear",label:"High-tier gear",description:"Remember which gear to check in game."}]} storageKey="gag2:stock-watch-intent" title="Local restock watch intent"/></div>
  <div className="field" style={{marginTop:18}}><label htmlFor="watch-search">Filter watchlist</label><input className="input" id="watch-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Moon Bloom, sprinkler..."/></div>
  <div className="table-wrap" style={{marginTop:16}}><table><thead><tr><th>Item</th><th>Shop</th><th>Current stock</th><th>Use</th></tr></thead><tbody>{rows.map(row=><tr key={`${row.shop}-${row.name}`}><th scope="row">{row.name}</th><td>{row.shop}</td><td>Unknown — check in game</td><td>Watchlist only</td></tr>)}</tbody></table></div>
 </div>
}
