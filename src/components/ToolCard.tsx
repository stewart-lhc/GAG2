import Link from "next/link";

export function ToolCard({
  title,
  body,
  href,
  action,
  icon
}: {
  title: string;
  body: string;
  href: string;
  action: string;
  icon?: string;
}) {
  return (
    <article className="panel tool-card">
      <div className="tool-icon" aria-hidden="true">
        {icon ?? title.slice(0, 3)}
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <Link className="button secondary" href={href}>
        {action}
      </Link>
    </article>
  );
}
