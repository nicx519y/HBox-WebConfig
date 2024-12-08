import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    // distDir: ".dist",
    // output: "export",
    webpack: (config) => {
        config.optimization.splitChunks = {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10,
                },
                chakra: {
                    test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
                    name: 'chakra-ui',
                    chunks: 'all',
                    priority: 20,
                },
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'all',
                    priority: -10,
                    reuseExistingChunk: true,
                },
            },
            maxInitialRequests: 25,
            minSize: 20000,
            maxSize: 20000000,
        };

        config.optimization.minimize = true;

        return config;
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
};

export default nextConfig;