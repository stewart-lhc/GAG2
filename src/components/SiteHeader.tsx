import Link from "next/link";
import { siteConfig } from "@/data/site";

const navItems = [
  ["Release", "/grow-a-garden-2-release-date"],
  ["Official Link", "/grow-a-garden-2-official-link"],
  ["Stock", "/grow-a-garden-2-stock-tracker"],
  ["Codes", "/grow-a-garden-2-codes"],
  ["Calculator", "/grow-a-garden-2-calculator"],
  ["Night Guide", "/grow-a-garden-2-night-stealing-guide"]
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="GAG2 Tools home">
        <img src="/favicon.svg" alt="" width="32" height="32" />
        <span>{siteConfig.shortName}</span>
      </Link>
      <nav className="top-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
