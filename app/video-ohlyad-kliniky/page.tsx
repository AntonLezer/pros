import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/_components/structured-data/json-ld";
import { clinicVideo } from "@/data/video";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const PAGE_URL = `${SITE_URL}/video-ohlyad-kliniky`;
const THUMBNAIL_URL = `${SITE_URL}${clinicVideo.thumbnailUrl}`;

export const metadata: Metadata = {
  title: {
    absolute: "Відеоогляд стоматології у Хмельницькому — Центр Плоскирів",
  },
  description: clinicVideo.description,
  alternates: {
    canonical: "/video-ohlyad-kliniky",
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Відеоогляд стоматології у Хмельницькому — Центр Плоскирів",
    description: clinicVideo.description,
    images: [{ url: clinicVideo.thumbnailUrl, alt: clinicVideo.title }],
  },
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: clinicVideo.title,
  description: clinicVideo.description,
  thumbnailUrl: THUMBNAIL_URL,
  uploadDate: clinicVideo.uploadDate,
  duration: clinicVideo.duration,
  contentUrl: clinicVideo.contentUrl,
  mainEntityOfPage: PAGE_URL,
  publisher: {
    "@type": "Organization",
    name: "Центр Плоскирів",
    url: SITE_URL,
  },
};

export default function ClinicVideoPage() {
  return (
    <article className="bg-cream">
      <JsonLd data={videoSchema} />
      <div className="mx-auto max-w-[1000px] px-5 py-12 md:px-8 md:py-16">
        <header className="mx-auto max-w-[800px] text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
            Про нашу клініку
          </p>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-bold leading-tight tracking-tight text-dark">
            {clinicVideo.title}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            {clinicVideo.description}
          </p>
        </header>

        <video
          src={clinicVideo.contentUrl}
          poster={clinicVideo.thumbnailUrl}
          title={clinicVideo.title}
          controls
          playsInline
          preload="metadata"
          className="mt-10 aspect-video w-full rounded-[20px] bg-black object-contain"
        >
          Ваш браузер не підтримує відтворення відео.
        </video>

        <div className="mt-8 text-center">
          <p className="text-[15px] leading-relaxed text-muted">
            Стоматологія «Центр Плоскирів»: Хмельницький, вул. Бажана, 19.
          </p>
          <Link
            href="/#booking"
            className="mt-4 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Записатися на прийом
          </Link>
        </div>
      </div>
    </article>
  );
}
