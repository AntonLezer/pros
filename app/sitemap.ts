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
    {
      url: `${SITE_URL}#services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}#booking`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}#before-after`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}#doctors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}#reviews`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}#faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}#contacts`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
