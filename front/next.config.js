/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const withSass = require('@zeit/next-sass');
const aliases = require('./alias');
const rewrites = require('./rewrites');

const env = () =>
    Object.entries(process.env).reduce(
        (vars, [name, value]) =>
            /^(?:__|NODE_)/.test(name) ? vars : { ...vars, [name]: value },
        {}
    );

module.exports = {
    env: env(),
    // env: {
    //     APP_URL: "https://prendsendelagraine.net",
    //     API_URL: "https://api.prendsendelagraine.net"
    // },

    webpack: defaultConfig => {
        const { ...config } = defaultConfig;

        config.resolve.alias = {
            ...config.resolve.alias,
            ...aliases,
        };

        config.module.rules = [
            ...config.module.rules,
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ];

        return config;
    },

    async rewrites() {
        return rewrites;
    },

    experimental: {
        pages404: true,
        polyfillsOptimization: true,
    },
};
