import type { MetadataRoute } from "next";
import { routes } from "@/data/site";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: canonicalUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency ?? (route.priority >= 0.8 ? "daily" : "weekly"),
    priority: route.priority
  }));
}
