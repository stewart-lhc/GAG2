/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  // Keep canonical exported routes slash-terminated, but let explicit legacy
  // redirects handle their no-slash source in one hop at the Vercel edge.
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: import.meta.dirname
  }
};

export default nextConfig;
