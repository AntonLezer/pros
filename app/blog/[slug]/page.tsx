import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock3 } from "lucide-react";
import { blogPosts, formatBlogDate, getBlogPost } from "@/data/blog";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
type Params = { slug: string };

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-accent" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.metaTitle,
      description: post.metaDescription,
      images: [{ url: post.image, width: 1200, height: 750, alt: post.imageAlt }],
      publishedTime: new Date(`${post.publishedAt}T00:00:00`).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}${post.image}`,
    datePublished: new Date(`${post.publishedAt}T00:00:00`).toISOString(),
    author: { "@type": "Organization", name: "Центр Плоскирів", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Центр Плоскирів", url: SITE_URL },
    mainEntityOfPage: url,
  };

  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
            <li>
              <Link href="/blog" className="transition-colors hover:text-accent">
                Блог
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-muted/60" strokeWidth={2} />
            </li>
            <li aria-current="page" className="line-clamp-1 text-dark">
              {post.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-[900px] px-5 pt-8 pb-16 md:px-8 md:pt-10 md:pb-20">
        <header>
          <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
            {post.category}
          </p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
            <time dateTime={post.publishedAt}>{formatBlogDate(post.publishedAt)}</time>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div className="relative mt-8 overflow-hidden rounded-[20px]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={750}
            priority
            sizes="(max-width: 900px) 100vw, 836px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-text">
          {post.content.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={`${block.type}-${index}`}
                  className="pt-3 font-display text-[22px] font-semibold leading-snug text-dark"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={`${block.type}-${index}`} className="list-disc space-y-2 pl-6 marker:text-accent">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (block.type === "instagram") {
              return (
                <a
                  key={`${block.type}-${block.postId}`}
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-4 rounded-2xl border border-cream-2 bg-surface p-5 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-start gap-3">
                    <InstagramIcon />
                    <span className="text-[15px] leading-relaxed text-dark">{block.caption}</span>
                  </span>
                  <span className="shrink-0 text-[14px] font-semibold text-accent">
                    {block.ctaText}
                  </span>
                </a>
              );
            }
            return <p key={`${block.type}-${index}`}>{block.text}</p>;
          })}
        </div>

        <Link
          href="/blog"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-full border-2 border-cream-2 bg-surface px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Усі статті блогу
        </Link>
      </div>
    </article>
  );
}
