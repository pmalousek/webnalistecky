import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
