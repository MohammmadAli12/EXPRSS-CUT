import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    /* Google reviewer photos, shown only where supplied (unoptimized, no referrer) */
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  /**
   * Testing on a real phone goes through a tunnel, so the dev server is reached
   * from a hostname that is not localhost. Without this, Next refuses the dev
   * runtime for that origin and the page renders but never becomes interactive.
   * Patterns only — never a single temporary tunnel hostname.
   */
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.loca.lt",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "192.168.*.*",
    "10.*.*.*",
  ],
  /* The offers design was built at /offers-2 before it became the live page */
  async redirects() {
    return [{ source: "/offers-2", destination: "/offers", permanent: true }];
  },
};

export default nextConfig;
