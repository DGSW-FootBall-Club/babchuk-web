import type { NextConfig } from "next";

const PROD_URL = "https://babchuk-web.vercel.app";

const nextConfig: NextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production" ? PROD_URL : undefined,
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
