import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true"; // Check if running in GitHub Actions

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enable static export
  basePath: isGithubPages ? "/mockguru" : "", // Set basePath for GitHub Pages
  assetPrefix: isGithubPages ? "/mockguru/" : "", // Set assetPrefix for GitHub Pages
  trailingSlash: true, // Good practice for static export
};

export default nextConfig;
