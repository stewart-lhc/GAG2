import { siteConfig, sourceList } from "@/data/site";

export function SourceList() {
  const currentCheckSucceeded = siteConfig.apiSnapshot.fetchStatus === "success";
  const latestCheck = siteConfig.apiSnapshot.currentCheckAt?.slice(0, 10) ?? "Unknown";
  const sourceStatus = currentCheckSucceeded ? "checked" : "not checked";

  return (
    <section className="section section-tight">
      <p className="eyebrow">Want to double-check?</p>
      <h2>Where the numbers come from</h2>
      <div className="grid">
        {sourceList.map((source) => (
          <article className="panel" key={source.id}>
            <span className={`badge ${currentCheckSucceeded ? "badge-confirmed" : "badge-warning"}`}>
              {currentCheckSucceeded ? "Recently checked" : "Check again"}
            </span>
            <h3>{source.label}</h3>
            <p>{source.sourceType}</p>
            <p>
              Last checked: <strong>{source.lastVerified}</strong>
            </p>
            <p>
              Latest check: <strong>{sourceStatus}</strong> ({latestCheck}).
              {currentCheckSucceeded ? " This page uses these numbers." : " This page has not rechecked it."}
            </p>
            <a className="button secondary" href={source.href} rel="noreferrer" target="_blank">
              Open original page
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
