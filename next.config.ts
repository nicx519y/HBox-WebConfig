import type { NextConfig } from "next";
import compression from "compression";
import type { Express } from 'express';

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    distDir: ".dist",
    output: "export", // for static export
};

export default nextConfig;