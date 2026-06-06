import Link from "next/link";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.shortName} Arcade</strong>
        <p>
          Unofficial fan tools. Not affiliated with Roblox, Grow a Garden, Grow A Garden 2,
          or their creators. Do not enter Roblox passwords, cookies, or tokens here.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/about">About</Link>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </nav>
    </footer>
  );
}
