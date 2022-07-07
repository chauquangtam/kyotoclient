const path = require('path');
const intercept = require("intercept-stdout")
const baseUrl = '';
function interceptStdout(text) {
    if (text.includes("Duplicate atom key")) {
        return ""
    }
    return text
}

if (process.env.NODE_ENV === "production") {
    intercept(interceptStdout)
}
/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    poweredByHeader: false,
    basePath: baseUrl,
    trailingSlash: true,
    env: {
        baseUrl,
    },
    experimental: {
        nextScriptWorkers: true,
    },
    webpack: (config) => {
        config.resolve.alias['~'] = path.resolve(__dirname, 'src');

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    images: {
        domains: ['st.nettruyenco.com', 'st.ntcdntempv3.com'],
        minimumCacheTTL: 24 * 60 * 60 * 7,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    staticPageGenerationTimeout: 5 * 6 * 1000,
};
