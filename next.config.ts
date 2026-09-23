import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    /* Google reviewer photos, shown only where supplied (unoptimized, no referrer) */
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  /* The offers design was built at /offers-2 before it became the live page */
  async redirects() {
    return [{ source: "/offers-2", destination: "/offers", permanent: true }];
  },
};

export default nextConfig;
