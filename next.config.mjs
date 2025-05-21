/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: 5 * 1024 * 1024, // 5 MB limit (adjust as necessary)
    },
  },
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary's domain here
  },
};

export default nextConfig;
