import { sourceList } from "@/data/site";

export function SourceList() {
  return (
    <section className="section section-tight">
      <p className="eyebrow">Trust loop</p>
      <h2>Sources and Verification</h2>
      <div className="grid">
        {sourceList.map((source) => (
          <article className="panel" key={source.id}>
            <span className="badge badge-confirmed">{source.confidence} confidence</span>
            <h3>{source.label}</h3>
            <p>{source.sourceType}</p>
            <p>
              Last verified: <strong>{source.lastVerified}</strong>
            </p>
            <a className="button secondary" href={source.href} rel="noreferrer" target="_blank">
              Open source
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
