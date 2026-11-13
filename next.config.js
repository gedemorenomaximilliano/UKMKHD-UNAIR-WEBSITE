/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allows smooth serving of local asset files
  },
};

module.exports = nextConfig;
