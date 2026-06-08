import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/"]
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot"
        ],
        allow: "/",
        disallow: ["/admin/"]
      }
    ],
    sitemap: new URL("/sitemap.xml", siteConfig.siteUrl).toString()
  };
}
