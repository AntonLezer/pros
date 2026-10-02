import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
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
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.publishedAt}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.65,
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
      url: `${SITE_URL}/poslugy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/komanda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/stomatologiya-khmelnytskyy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...servicePages,
    ...blogPages,
  ];
}
