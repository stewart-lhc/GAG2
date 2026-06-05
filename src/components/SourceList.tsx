import { sourceList } from "@/data/site";

export function SourceList() {
  return (
    <section className="section section-tight">
      <h2>Sources and Verification</h2>
      <div className="grid">
        {sourceList.map((source) => (
          <article className="panel" key={source.id}>
            <h3>{source.label}</h3>
            <p>{source.sourceType}</p>
            <p>
              Confidence: <strong>{source.confidence}</strong>
              <br />
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
