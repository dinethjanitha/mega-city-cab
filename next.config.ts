import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3005/api/:path*", // Proxy to your backend
      },
    ];
  },
  images: {
    domains: [
      "www.w3schools.com",
      "img.daisyui.com",
      "tailwindui.com",
      "st3.depositphotos.com",
      "localhost",
      "unpkg.com"
    ],
  },
};

export default nextConfig;
