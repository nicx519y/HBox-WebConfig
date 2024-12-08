import type { NextConfig } from "next";
import compression from "compression";
import type { Express } from 'express';

const nextConfig: NextConfig = {
    async serverMiddleware({ app }: { app: Express }) {
        app.use(
            compression({
                level: 6,
            })
        );
    },
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    outDir: "dist",
    exportPathMap: async function (
        defaultPathMap,
        { dev, dir, outDir, distDir, buildId }
    ) {
        return {
            ...defaultPathMap,
            "/": { page: "/" },
            "/keys-setting": { page: "/keys-setting" },
            "/leds-setting": { page: "/leds-setting" },
            "/rapid-trigger": { page: "/rapid-trigger" },
            "/hotkeys-setting": { page: "/hotkeys-setting" },
            "/firmware": { page: "/firmware" },
        };
    },
};

export default nextConfig;