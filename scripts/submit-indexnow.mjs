import { readFile } from "node:fs/promises";
import process from "node:process";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "https://growagarden2.pro";
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "ee31a8c623b41b34e0b3e475ef31f2d3ec66d9b8edbebc823ee0ab7071ee9e2c";
const INDEXNOW_ENDPOINT = process.env.INDEXNOW_ENDPOINT ?? "https://api.indexnow.org/indexnow";
const sitemapInput =
  process.argv.find((arg) => !arg.startsWith("--") && arg !== process.argv[0] && arg !== process.argv[1]) ??
  new URL("/sitemap.xml", SITE_URL).toString();
const dryRun = process.argv.includes("--dry-run");

async function readSitemap(input) {
  if (!input.startsWith("http")) {
    return readFile(input, "utf8");
  }

  const response = await fetch(input, {
    headers: {
      accept: "application/xml,text/xml,text/plain",
      "user-agent": "growagarden2.pro indexnow submitter"
    }
  });

  if (!response.ok) {
    throw new Error(`${input} returned ${response.status}`);
  }

  return response.text();
}

function extractUrls(xml) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  return [...new Set(urls)];
}

async function main() {
  const site = new URL(SITE_URL);
  const xml = await readSitemap(sitemapInput);
  const urlList = extractUrls(xml).filter((url) => {
    try {
      return new URL(url).host === site.host;
    } catch {
      return false;
    }
  });

  if (urlList.length === 0) {
    throw new Error(`No URLs found in ${sitemapInput}`);
  }

  const payload = {
    host: site.host,
    key: INDEXNOW_KEY,
    keyLocation: new URL(`/${INDEXNOW_KEY}.txt`, SITE_URL).toString(),
    urlList
  };

  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "user-agent": "growagarden2.pro indexnow submitter"
    },
    body: JSON.stringify(payload)
  });

  const body = await response.text();
  console.log(`IndexNow ${response.status}: submitted ${urlList.length} URLs to ${INDEXNOW_ENDPOINT}`);
  if (body) {
    console.log(body);
  }

  if (!response.ok) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`IndexNow submission failed: ${error.message || error}`);
  process.exitCode = 1;
});
