/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.extensionAlias = {
            test: /swiper\.css$/,
            use: ['style-loader', 'css-loader'],
            '.js': ['.js', '.ts'],
            '.jsx': ['.jsx', '.tsx'],
        };
        return config;
    },
};
