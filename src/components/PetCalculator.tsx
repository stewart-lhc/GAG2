"use client";

import { useMemo, useState } from "react";
import { petRecords } from "@/data/game/entities";
import { calculatePetValue, type PetVariant } from "@/lib/calculators/pet";

export function PetCalculator() {
  const [petId, setPetId] = useState(petRecords[0]?.id ?? "");
  const [variant, setVariant] = useState<PetVariant>("normal");
  const pet = petRecords.find((item) => item.id === petId) ?? petRecords[0];
  const result = useMemo(() => calculatePetValue({ pet, variant }), [pet, variant]);

  return <div>
    <div className="callout"><strong>Check pets one at a time.</strong> Big, Mega, and Rainbow effects can differ by pet, so this tool does not use one global multiplier or guess age, weight, or trade value.</div>
    <div className="two-col" style={{ marginTop: 22 }}>
      <section className="panel"><span className="badge badge-confirmed">Current pet details</span><h2 style={{ marginTop: 14 }}>Choose a pet and variant</h2>
        <div className="field" style={{ marginTop: 16 }}><label htmlFor="pet-select">Pet</label><select className="select" id="pet-select" onChange={(event) => setPetId(event.target.value)} value={petId}>{petRecords.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.rarity}</option>)}</select></div>
        <div className="field" style={{ marginTop: 16 }}><label htmlFor="pet-variant">Variant to inspect</label><select className="select" id="pet-variant" onChange={(event) => setVariant(event.target.value as PetVariant)} value={variant}><option value="normal">Normal</option><option value="big">Big</option><option value="mega">Mega</option><option value="rainbow">Rainbow</option></select></div>
      </section>
      <section aria-live="polite" className="panel result-panel"><span className="badge badge-unknown">Details only</span><h2 style={{ marginTop: 14 }}>Pet details</h2>{result.ok ? <><div className="stat-grid"><div className="stat"><span>Pet</span><strong>{result.petName}</strong></div><div className="stat"><span>Rarity</span><strong>{result.rarity}</strong></div><div className="stat"><span>Baseline ability</span><strong>{result.ability}</strong></div><div className="stat"><span>Variant</span><strong>{result.variant}</strong></div></div><p className="callout" style={{ marginTop: 18 }}>{result.reason}</p><p className="muted">There is no reliable age, weight, or trade-value formula yet. <a href={result.sourceUrl} rel="noreferrer" target="_blank">View this pet&apos;s details</a></p></> : <div className="callout">{Object.values(result.errors).join(" ")}</div>}</section>
    </div>
  </div>;
}
