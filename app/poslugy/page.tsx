import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { services } from "@/data/services";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const TITLE = "Стоматологічні послуги у Хмельницькому — Центр Плоскирів";
const DESCRIPTION =
  "Повний спектр стоматологічних послуг у Хмельницькому: лікування зубів, імплантація, брекети, відбілювання, чистка зубів, дитяча стоматологія. Ціни та запис онлайн.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/poslugy" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/poslugy`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Стоматологічні послуги — Центр Плоскирів, Хмельницький",
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

const priceFormatter = new Intl.NumberFormat("uk-UA");

export default function PoslugyIndexPage() {
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
              Послуги
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="poslugy-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
          Послуги
        </p>
        <h1
          id="poslugy-h1"
          className="mt-3 max-w-[760px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Стоматологічні послуги у Хмельницькому
        </h1>
        <p className="mt-6 max-w-[760px] text-[17px] leading-relaxed text-text">
          Приватна стоматологічна клініка «Центр Плоскирів» надає повний спектр послуг — від
          лікування зубів і професійної чистки до імплантації та брекетів. Дізнайтесь ціни та
          записуйтесь на консультацію.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href={`/poslugy/${s.slug}`}
                className="flex h-full items-start gap-4 rounded-2xl bg-surface p-5 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] active:scale-[0.99]"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white">
                  <s.Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[15px] font-semibold text-dark">
                    {s.shortName}
                  </span>
                  <span className="mt-1 text-[13px] leading-relaxed text-muted">
                    {s.description}
                  </span>
                  <span className="mt-2 text-[13px] font-semibold text-accent">
                    від {priceFormatter.format(s.priceFrom)} грн
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/tsiny"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full border-2 border-cream-2 bg-surface px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Повний прайс-лист
        </Link>
      </section>
    </article>
  );
}
