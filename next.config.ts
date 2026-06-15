import type { NextConfig } from "next";

const isDodamBuild = process.env.BUILD_TARGET === "dodam";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: isDodamBuild ? "." : undefined,
  trailingSlash: true,
};

export default nextConfig;
