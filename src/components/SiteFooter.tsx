import Link from "next/link";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.shortName}</strong>
        <p>
          Unofficial fan tools. Not affiliated with Roblox, Grow a Garden, Grow A Garden 2, or their creators. We never ask for Roblox passwords, cookies, or codes.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/grow-a-garden-2-value-list">Value List</Link><Link href="/grow-a-garden-2-seeds">Seeds</Link><Link href="/grow-a-garden-2-gear">Gear</Link><Link href="/grow-a-garden-2-codes">Codes</Link><Link href="/grow-a-garden-2-release-date">Release</Link><Link href="/grow-a-garden-2-official-link">Link Check</Link><Link href="/grow-a-garden-2-night-stealing-guide">Night Guide</Link>
        <Link href="/about">About</Link>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
}
