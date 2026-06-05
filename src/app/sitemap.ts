import type { MetadataRoute } from "next";
import { routes, siteConfig } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, siteConfig.siteUrl).toString(),
    lastModified: siteConfig.lastVerified,
    changeFrequency: route.priority >= 0.8 ? "daily" : "weekly",
    priority: route.priority
  }));
}
