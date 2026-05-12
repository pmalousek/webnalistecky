import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  async redirects() {
    return [
      {
        source: "/zasady-ochrany-osobnich-udaju",
        destination:
          "https://www.realitakbrno.cz/gdpr-zpracovani-osobnich-udaju/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
