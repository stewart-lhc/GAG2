import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { metadata, viewport } from "@/app/layout";
import { pageMetadata } from "@/lib/seo";

const publicDir = path.resolve(process.cwd(), "public");

async function pngDimensions(file: string) {
  const bytes = await readFile(path.join(publicDir, file));
  expect(bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))).toBe(true);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

async function jpegDimensions(file: string) {
  const bytes = await readFile(path.join(publicDir, file));
  expect(bytes.subarray(0, 2).equals(Buffer.from([0xff, 0xd8]))).toBe(true);
  let offset = 2;
  while (offset < bytes.length) {
    if (bytes[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  throw new Error(`JPEG dimensions not found in ${file}`);
}

describe("brand asset contract", () => {
  it("ships the referenced icon and logo files", async () => {
    const files = [
      "logo-mark.svg", "logo-lockup.svg", "favicon.svg", "favicon.ico", "favicon-16x16.png",
      "favicon-32x32.png", "apple-touch-icon.png", "android-chrome-192x192.png",
      "android-chrome-512x512.png", "maskable-icon-512x512.png", "og-default.jpg", "twitter-card.jpg",
      "site.webmanifest"
    ];
    await Promise.all(files.map(async (file) => expect((await stat(path.join(publicDir, file))).size).toBeGreaterThan(0)));

    const [mark, lockup, favicon, ico] = await Promise.all([
      readFile(path.join(publicDir, "logo-mark.svg"), "utf8"),
      readFile(path.join(publicDir, "logo-lockup.svg"), "utf8"),
      readFile(path.join(publicDir, "favicon.svg"), "utf8"),
      readFile(path.join(publicDir, "favicon.ico"))
    ]);
    for (const svg of [mark, lockup, favicon]) {
      expect(svg).toContain("<svg");
      expect(svg).toContain("#8cff4f");
    }
    expect(ico.subarray(0, 4).equals(Buffer.from([0, 0, 1, 0]))).toBe(true);
  });

  it("keeps icon, card, manifest, and metadata references in sync", async () => {
    await expect(pngDimensions("favicon-16x16.png")).resolves.toEqual({ width: 16, height: 16 });
    await expect(pngDimensions("favicon-32x32.png")).resolves.toEqual({ width: 32, height: 32 });
    await expect(pngDimensions("apple-touch-icon.png")).resolves.toEqual({ width: 180, height: 180 });
    await expect(pngDimensions("android-chrome-192x192.png")).resolves.toEqual({ width: 192, height: 192 });
    await expect(pngDimensions("android-chrome-512x512.png")).resolves.toEqual({ width: 512, height: 512 });
    await expect(pngDimensions("maskable-icon-512x512.png")).resolves.toEqual({ width: 512, height: 512 });
    await expect(jpegDimensions("og-default.jpg")).resolves.toEqual({ width: 1200, height: 630 });
    await expect(jpegDimensions("twitter-card.jpg")).resolves.toEqual({ width: 1200, height: 630 });

    const manifest = JSON.parse(await readFile(path.join(publicDir, "site.webmanifest"), "utf8"));
    expect(manifest.icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: "/android-chrome-192x192.png", sizes: "192x192" }),
      expect.objectContaining({ src: "/android-chrome-512x512.png", sizes: "512x512" }),
      expect.objectContaining({ src: "/maskable-icon-512x512.png", purpose: "maskable" })
    ]));

    expect(metadata.manifest).toBe("/site.webmanifest");
    expect(metadata.icons).toEqual(expect.objectContaining({
      shortcut: [expect.objectContaining({ url: "/favicon.ico" })],
      apple: [expect.objectContaining({ url: "/apple-touch-icon.png" })]
    }));
    expect(viewport.themeColor).toBe("#8cff4f");

    const page = pageMetadata("Example title", "Example description", "/example");
    expect(page.openGraph?.images).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: "https://growagarden2.pro/og-default.jpg", alt: "Grow a Garden 2 Calculator" })
    ]));
    expect(page.twitter?.images).toEqual(expect.arrayContaining([
      expect.objectContaining({ url: "https://growagarden2.pro/twitter-card.jpg", alt: "Grow a Garden 2 Calculator — unofficial player tool" })
    ]));
  });
});
