import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock3 } from "lucide-react";
import { blogPosts, formatBlogDate } from "@/data/blog";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const TITLE = "Блог про здоров'я зубів — Центр Плоскирів";
const DESCRIPTION =
  "Корисні поради стоматологів про догляд за зубами, профілактику та дитячу стоматологію від Центру Плоскирів у Хмельницькому.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Блог Центру Плоскирів — поради стоматологів",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function BlogPage() {
  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-[1200px] px-5 pt-8 md:px-8 md:pt-12">
        <nav aria-label="Хлібні крихти" className="text-[13px] text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Головна
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-muted/60" strokeWidth={2} />
            </li>
            <li aria-current="page" className="text-dark">
              Блог
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="blog-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-16 md:px-8 md:pt-10 md:pb-20"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
          Корисно знати
        </p>
        <h1
          id="blog-h1"
          className="mt-3 max-w-[760px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Блог про здоров&apos;я зубів
        </h1>
        <p className="mt-5 max-w-[720px] text-[17px] leading-relaxed text-text">
          Поради стоматологів Центру Плоскирів про профілактику, щоденний догляд і здорову усмішку.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <article className="flex h-full flex-col overflow-hidden rounded-[20px] bg-surface">
                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Читати: ${post.title}`}
                  className="group relative block aspect-[16/10] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                >
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-muted">
                    <span className="rounded-full bg-brand-tint px-3 py-1 font-semibold text-accent-dark">
                      {post.category}
                    </span>
                    <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
                  </div>
                  <h2 className="mt-4 font-display text-[18px] font-semibold leading-snug text-dark">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-cream-2 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
                      <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.readTime}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[13px] font-semibold text-accent transition-colors hover:text-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Читати статтю
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
