import type { NextConfig } from "next";

const {GITHUB_ACTIONS} = process.env;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enable static export
  basePath: GITHUB_ACTIONS ? "/mockguru" : "", // Set basePath for GitHub Pages
  assetPrefix: GITHUB_ACTIONS ? "/mockguru/" : "", // Set assetPrefix for GitHub Pages
  trailingSlash: true, // Good practice for static export
};

export default nextConfig;
