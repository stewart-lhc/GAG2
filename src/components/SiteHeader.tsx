import Link from "next/link";
import { siteConfig } from "@/data/site";

const navItems = [
  ["Calculator", "/"],
  ["Trading", "/grow-a-garden-2-trading-calculator"],
  ["Values", "/grow-a-garden-2-value-list"],
  ["Mutations", "/grow-a-garden-2-mutation-calculator"],
  ["Pets", "/grow-a-garden-2-pet-calculator"],
  ["Restock", "/grow-a-garden-2-seed-restock-time"]
];

type NavIconName = "calc" | "trading" | "values" | "restock";

function NavIcon({ name }: { name: NavIconName }) {
  const iconProps = {
    "aria-hidden": true,
    fill: "none",
    height: 24,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    width: 24
  };

  switch (name) {
    case "calc":
      return (
        <svg {...iconProps}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8M8 11h2m2 0h2m2 0h0M8 15h2m2 0h2m2 0h0M8 18h2m2 0h2" />
        </svg>
      );
    case "trading":
      return (
        <svg {...iconProps}>
          <path d="M4 7h11" />
          <path d="m12 4 3 3-3 3" />
          <path d="M20 17H9" />
          <path d="m12 14-3 3 3 3" />
        </svg>
      );
    case "values":
      return (
        <svg {...iconProps}>
          <path d="M12 3v18M17 6.5C16.2 5.6 14.8 5 13 5h-1.5C9.6 5 8 6.3 8 8s1.6 3 3.5 3h1c1.9 0 3.5 1.3 3.5 3s-1.6 3-3.5 3H11c-1.8 0-3.2-.6-4-1.5" />
        </svg>
      );
    case "restock":
      return (
        <svg {...iconProps}>
          <path d="M20 11a8 8 0 0 0-14.7-4L4 9" />
          <path d="M4 4v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L20 15" />
          <path d="M20 20v-5h-5" />
        </svg>
      );
  }
}

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" href="/">
          <img src="/logo-mark.svg" alt="" width="32" height="32" />
          <span>{siteConfig.shortName}</span>
        </Link>
        <nav className="top-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <a className="button header-cta" href={siteConfig.robloxUrl} rel="noreferrer" target="_blank">
          Check Roblox
        </a>
      </header>
      <nav className="mobile-bottom-nav" aria-label="Mobile primary navigation">
        <Link href="/">
          <NavIcon name="calc" />
          <span>Calc</span>
        </Link>
        <Link href="/grow-a-garden-2-trading-calculator">
          <NavIcon name="trading" />
          <span>Trading</span>
        </Link>
        <Link href="/grow-a-garden-2-value-list">
          <NavIcon name="values" />
          <span>Values</span>
        </Link>
        <Link href="/grow-a-garden-2-seed-restock-time">
          <NavIcon name="restock" />
          <span>Restock</span>
        </Link>
      </nav>
    </>
  );
}
