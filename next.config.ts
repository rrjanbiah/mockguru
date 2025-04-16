import type { NextConfig } from "next";
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read and parse package.json
const pkg = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'));
const homepage = pkg.homepage || '';
const repoName = homepage.split('/').pop() || '';

const {GITHUB_ACTIONS} = process.env;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enable static export
  basePath: GITHUB_ACTIONS ? `/${repoName}` : '', // Set basePath for GitHub Pages
  assetPrefix: GITHUB_ACTIONS ? `/${repoName}/` : '', // Set assetPrefix for GitHub Pages
  trailingSlash: true, // Good practice for static export
  env: {
    SITE_URL: GITHUB_ACTIONS ? homepage : 'http://localhost:3000',
  },
};

export default nextConfig;
