import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const SITE_URL = "https://ploskyriv.com.ua";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/poslugy/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
  ];
}
