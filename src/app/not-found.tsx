import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section section-hero">
      <p className="eyebrow">Missing tool</p>
      <h1>Page not found</h1>
      <p className="muted">The tool or guide you requested is not available.</p>
      <Link className="button" href="/">
        Return home
      </Link>
    </section>
  );
}
