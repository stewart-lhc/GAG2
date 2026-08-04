"use client";

import { useMemo, useState } from "react";
import { entityRecords } from "@/data/game/entities";
import { relativeTradeValueObservations } from "@/data/game/values";
import { calculateTradeComparison, type TradingItemInput } from "@/lib/calculators/trading";

const entityById = new Map(entityRecords.map((item) => [item.id, item]));
const options = relativeTradeValueObservations.map((observation) => ({ observation, entity: entityById.get(observation.entityId)! })).filter((item) => item.entity);
type Row = { id: number; entityId: string; quantity: number };
const makeRow = (id: number): Row => ({ id, entityId: options[0]?.entity.id ?? "", quantity: 1 });

function Editor({ title, rows, update, add, remove }: { title: string; rows: Row[]; update: (id: number, field: "entityId" | "quantity", value: string) => void; add: () => void; remove: (id: number) => void }) {
  return <section className="panel"><span className="badge badge-confirmed">{title}</span><h2 style={{ marginTop: 14 }}>{title}</h2>{rows.map((row, index) => <div className="grid" key={row.id} style={{ marginTop: 14 }}><div className="field"><label htmlFor={`${title}-item-${row.id}`}>Item {index + 1}</label><select className="select" id={`${title}-item-${row.id}`} onChange={(event) => update(row.id, "entityId", event.target.value)} value={row.entityId}>{options.map(({ entity, observation }) => <option key={entity.id} value={entity.id}>{entity.name} · {observation.value} reference</option>)}</select></div><div className="field"><label htmlFor={`${title}-qty-${row.id}`}>Quantity</label><input className="input" id={`${title}-qty-${row.id}`} min="0" onChange={(event) => update(row.id, "quantity", event.target.value)} type="number" value={row.quantity} /></div>{rows.length > 1 ? <button className="button secondary" onClick={() => remove(row.id)} type="button">Remove</button> : null}</div>)}<button className="button blue" onClick={add} style={{ marginTop: 18 }} type="button">Add item</button></section>;
}

function toInputs(rows: Row[]): TradingItemInput[] { return rows.map((row) => { const observation = relativeTradeValueObservations.find((item) => item.entityId === row.entityId)!; const entity = entityById.get(row.entityId)!; return { entityId: row.entityId, name: entity.name, value: observation.value, quantity: row.quantity, valueType: "relative_trade_value" }; }); }

export function TradingCalculator() {
  const [nextId, setNextId] = useState(3); const [given, setGiven] = useState<Row[]>([makeRow(1)]); const [received, setReceived] = useState<Row[]>([makeRow(2)]);
  const result = useMemo(() => calculateTradeComparison(toInputs(given), toInputs(received)), [given, received]);
  const updater = (side: "given" | "received", id: number, field: "entityId" | "quantity", value: string) => (side === "given" ? setGiven : setReceived)((rows) => rows.map((row) => row.id === id ? { ...row, [field]: field === "quantity" ? Number(value) : value } : row));
  const add = (side: "given" | "received") => { const row = makeRow(nextId); setNextId((id) => id + 1); (side === "given" ? setGiven : setReceived)((rows) => [...rows, row]); };
  const remove = (side: "given" | "received", id: number) => (side === "given" ? setGiven : setReceived)((rows) => rows.filter((row) => row.id !== id));
  return <div><div className="callout"><strong>Trade reference only — not Sheckles.</strong> This is a rough comparison from player trades, not Robux, cash, or a guaranteed price. Within ±10% is roughly even.</div><div className="two-col" style={{ marginTop: 22 }}><Editor title="You give" rows={given} update={(...args) => updater("given", ...args)} add={() => add("given")} remove={(id) => remove("given", id)} /><Editor title="You receive" rows={received} update={(...args) => updater("received", ...args)} add={() => add("received")} remove={(id) => remove("received", id)} /></div><section aria-live="polite" className="panel result-panel" style={{ marginTop: 22 }}><span className={`badge ${result.outcome === "fair" ? "badge-confirmed" : "badge-unknown"}`}>{result.outcome === "fair" ? "Fair" : result.outcome === "win" ? "You win" : "You lose"}</span><h2 style={{ marginTop: 14 }}>How does this trade look?</h2><div className="stat-grid"><div className="stat"><span>You give</span><strong>{result.totalGiven.toLocaleString()} reference</strong></div><div className="stat"><span>You receive</span><strong>{result.totalReceived.toLocaleString()} reference</strong></div><div className="stat"><span>Difference</span><strong>{result.difference.toLocaleString()}</strong></div><div className="stat"><span>Receive / give</span><strong>{result.receivedToGivenRatio === null ? "∞" : result.receivedToGivenRatio.toFixed(2)}</strong></div></div><p className="muted">Over 110%: you win; 90%–110%: fair; under 90%: you lose. Player offers change with demand.</p></section></div>;
}
