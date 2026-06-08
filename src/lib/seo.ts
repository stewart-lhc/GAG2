import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function canonicalUrl(path = "/") {
  const cleanPath = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return new URL(cleanPath, siteConfig.siteUrl).toString();
}

function assetUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

function verificationMetadata(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  if (!google && !bing) {
    return undefined;
  }

  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {})
  };
}

export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    verification: verificationMetadata(),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: assetUrl("/og-default.jpg"),
          width: 1200,
          height: 630,
          alt: "Grow A Garden 2 Tools Hub"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [assetUrl("/og-default.jpg")]
    }
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function webAppSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    url: canonicalUrl(path),
    isAccessibleForFree: true
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: canonicalUrl("/"),
    inLanguage: "en",
    isAccessibleForFree: true
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  };
}
