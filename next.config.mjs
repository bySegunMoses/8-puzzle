// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "cdn.marvel.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ],
  },
};

// Conditional configurations based on environment
if (process.env.NODE_ENV === 'development') {
  nextConfig.devIndicators = {
    autoPrerender: false,
  };
}

export default nextConfig;
