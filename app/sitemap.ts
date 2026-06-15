import type { MetadataRoute } from "next";
import { services } from "@/data/services";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";

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
    {
      url: `${SITE_URL}/tsiny`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/pro-kliniku`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/komanda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...servicePages,
  ];
}
