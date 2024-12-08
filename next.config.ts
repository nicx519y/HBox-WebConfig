import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    build: "export",
    distDir: '.dist',
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    // 忽略 build 错误
    typescript: {
        ignoreBuildErrors: true,
    },
    // 禁用 telemetry   
    telemetry: {
        enabled: false,
    },
    webpack: (config, { isServer }) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };
        if (!isServer) {
            config.output = {
                ...config.output,
                globalObject: 'globalThis',
            };
        }
        config.optimization = {
            ...config.optimization,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    lib: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'lib',
                        priority: 10,
                        enforce: true,
                        chunks: 'all'
                    },
                    commons: {
                        name: 'commons',
                        minChunks: 2,
                        priority: -10,
                        reuseExistingChunk: true,
                        chunks: 'all'
                    }
                },
            },
            minimize: true,
        };

        return config;
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    async rewrites() {
        return [
            {
                source: '/keys',
                destination: '/',
            },
            {
                source: '/hotkeys',
                destination: '/',
            },
            {
                source: '/leds',
                destination: '/',
            },
            // {
            //     source: '/calibration',
            //     destination: '/',
            // },
            {
                source: '/rapid-trigger',
                destination: '/',
            },
            {
                source: '/firmware',
                destination: '/',
            },
        ];
    },
};

export default nextConfig;