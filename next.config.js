/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },

  //  serverActions are stll in Alpha - 08/10/2023
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
