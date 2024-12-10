import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';


const nextConfig: NextConfig = {
    build: "export",
    distDir: '.dest',
    // experimental: {
    //     optimizePackageImports: ["@chakra-ui/react"],
    // },
    // 忽略 build 错误
    typescript: {
        ignoreBuildErrors: true,
    },
    // 禁用 telemetry   
    telemetry: {
        enabled: false,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // 将所有的代码打包成一个文件
                    all: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                        enforce: true,
                    },
                },
            };
            // 禁用代码拆分
            config.optimization.runtimeChunk = false;
            config.optimization.concatenateModules = true;

            // 将所有入口点合并成一个
            // const originalEntry = config.entry;
            // config.entry = async () => {
            //     const entries = await (typeof originalEntry === 'function' ? originalEntry() : originalEntry);
            //     if (typeof entries === 'object' && !Array.isArray(entries)) {
            //         return {
            //             main: Object.values(entries).flat()
            //         };
            //     }
            //     return entries;
            // };
        }

        return config;
    },
    // webpack: (config, { isServer }) => {
    //     config.resolve.fallback = {
    //         ...config.resolve.fallback,
    //         fs: false,
    //         net: false,
    //         tls: false,
    //     };
    //     if (!isServer) {
    //         config.output = {
    //             ...config.output,
    //             globalObject: 'globalThis',
    //         };
    //     }
    //     config.optimization = {
    //         ...config.optimization,
    //         splitChunks: {
    //             chunks: 'all',
    //             cacheGroups: {
    //                 default: false,
    //                 vendors: false,
    //                 lib: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     name: 'lib',
    //                     priority: 10,
    //                     enforce: true,
    //                     chunks: 'all'
    //                 },
    //                 commons: {
    //                     name: 'commons',
    //                     minChunks: 2,
    //                     priority: -10,
    //                     reuseExistingChunk: true,
    //                     chunks: 'all'
    //                 }
    //             },
    //         },
    //         minimize: true,
    //     };

    //     return config;
    // },
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

export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})(nextConfig);