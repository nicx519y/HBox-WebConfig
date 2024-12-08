import type { NextConfig } from "next";
import compression from "compression";
import type { Express } from 'express';

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    distDir: ".dist",
    output: "export", // for static export
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 10000,
                minChunks: 1,
                maxAsyncRequests: 2,
                maxInitialRequests: 2,
            }
        } else {
            config.optimization.splitChunks = {
                chunks: 'all',
                minSize: 10000,
                minChunks: 1,
                maxAsyncRequests: 2,
                maxInitialRequests: 2,
            }
        }
        return config;
    },
};

export default nextConfig;