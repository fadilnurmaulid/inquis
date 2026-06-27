import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React 19 is stable in Next.js 15
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
