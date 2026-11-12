import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 80, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/pro-kliniku",
        permanent: true,
      },
      {
        source: "/aesthetic-dentistry",
        destination: "/poslugy/estetychna-stomatologiya",
        permanent: true,
      },
      {
        source: "/prosthetics",
        destination: "/poslugy/protezuvannya-zubiv",
        permanent: true,
      },
      {
        source: "/contacts",
        destination: "/#contacts",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/poslugy",
        permanent: true,
      },
      {
        source: "/our-specialists",
        destination: "/komanda",
        permanent: true,
      },
      {
        source: "/dentistry",
        destination: "/stomatologiya-khmelnytskyy",
        permanent: true,
      },
      {
        source: "/%D1%81hildrens-dentistry",
        destination: "/poslugy/dytyacha-stomatologiya",
        permanent: true,
      },
      {
        source: "/childrens-dentistry",
        destination: "/poslugy/dytyacha-stomatologiya",
        permanent: true,
      },
      {
        source: "/surgical-dentistry",
        destination: "/poslugy/implantatsiya-zubiv",
        permanent: true,
      },
      {
        source: "/x-ray",
        destination: "/pro-kliniku",
        permanent: true,
      },
      {
        source: "/veraview",
        destination: "/pro-kliniku",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
