import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.116",
    "http://192.168.1.116:3001",
    "http://192.168.1.116",
    "*.local",
    "192.168.1.*",
  ],
};

export default nextConfig;


