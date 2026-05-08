import type { MetadataRoute } from "next";

// Test environment: block all crawlers from indexing the test domain to avoid
// duplicate-content penalties when the production site launches.
// Production swap:
//   const SITE_URL = "https://ploskyriv.com.ua";
//   rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
//   sitemap: `${SITE_URL}/sitemap.xml`,
//   host: SITE_URL,
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
