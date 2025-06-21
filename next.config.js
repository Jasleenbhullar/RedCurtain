// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for new projects
  // Add any other Next.js specific configurations here.
  // For example, image optimization domains:
  images: {
    domains: ['placehold.co'], // Allow images from placehold.co
  },
  // If you are using the `src` directory, you might need to specify it.
  // This is typically handled by Next.js automatically when `src` exists.
  // If you encounter issues, you might add:
  // experimental: {
  //   outputFileTracingRoot: require('path').join(__dirname, '../../'),
  // },
};

module.exports = nextConfig;
