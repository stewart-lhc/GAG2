import { stockItems, codes, sourceList } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Data Console Blueprint",
  "Static MVP data console blueprint for Grow a Garden 2 source, stock, code, and report operations.",
  "/admin/data-console"
);

export default function DataConsolePage() {
  return (
    <section className="section section-hero">
      <p className="eyebrow">Verification queue</p>
      <h1>Data Console Blueprint</h1>
      <p className="muted">
        Static MVP view for the data model. Production should protect this route and persist
        changes to a database or CMS.
      </p>
      <div className="grid">
        <article className="panel">
          <h3>Sources</h3>
          <p>{sourceList.length} configured source records.</p>
        </article>
        <article className="panel">
          <h3>Stock rows</h3>
          <p>{stockItems.length} starter rows, all marked unknown or awaiting verification.</p>
        </article>
        <article className="panel">
          <h3>Codes</h3>
          <p>{codes.active.length} active, {codes.expired.length} expired.</p>
        </article>
      </div>
      <div className="panel" style={{ marginTop: 18 }}>
        <h2>Sev-1 Update Flow</h2>
        <p>
          If the official link, active code status, or stock state is wrong, hide or downgrade
          the front-end claim first, then update the source record and last verified timestamp.
        </p>
      </div>
    </section>
  );
}
