import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This bypasses the Mixed Content error by letting Vercel's backend talk to EC2 directly
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_EC2_URL || "http://13.53.111.78:8080/api"}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
