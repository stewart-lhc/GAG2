/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  turbopack: {
    root: import.meta.dirname
  }
};

export default nextConfig;
