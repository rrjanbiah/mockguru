import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enable static export
  basePath: isGithubPages ? "/mockguru" : "", // Set basePath for GitHub Pages
  assetPrefix: isGithubPages ? "/mockguru/" : "", // Set assetPrefix for GitHub Pages
  trailingSlash: true, // Good practice for static export
};

export default nextConfig;
