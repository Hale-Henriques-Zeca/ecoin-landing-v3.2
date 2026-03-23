/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
    unoptimized: false,
  },
  experimental: {
    serverActions: {},
  },
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
};

export default nextConfig;
