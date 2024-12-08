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
};

export default nextConfig;