/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["picsum.photos", "fastly.picsum.photos", "image.tmdb.org"],
        // formats: ["image/avif", "image/webp"],
    },
    // loaders: ["style-loader", "css-loader"],
};

module.exports = nextConfig;
