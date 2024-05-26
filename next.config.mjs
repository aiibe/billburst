/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.multiavatar.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
