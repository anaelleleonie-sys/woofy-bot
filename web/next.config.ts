import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },   // ne bloque pas le build sur TS
  eslint: { ignoreDuringBuilds: true },      // ne bloque pas le build sur ESLint
};

export default nextConfig;
