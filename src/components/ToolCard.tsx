import Link from "next/link";

export function ToolCard({
  title,
  body,
  href,
  action
}: {
  title: string;
  body: string;
  href: string;
  action: string;
}) {
  return (
    <article className="panel">
      <h3>{title}</h3>
      <p>{body}</p>
      <Link className="button secondary" href={href}>
        {action}
      </Link>
    </article>
  );
}
