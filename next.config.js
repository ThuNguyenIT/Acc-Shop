/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ["utfs.io", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig
