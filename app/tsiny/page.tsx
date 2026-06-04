import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { services } from "@/data/services";
import { contacts } from "@/data/contacts";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const priceFormatter = new Intl.NumberFormat("uk-UA");
const TITLE = "Ціни на стоматологічні послуги у Хмельницькому — Центр Плоскирів";
const DESCRIPTION =
  "Ціни на стоматологічні послуги у Хмельницькому: консультація, лікування зубів, імплантація, брекети, протезування та дитяча стоматологія. Прозорі ціни без прихованих платежів.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/tsiny" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tsiny`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Ціни на стоматологію — Центр Плоскирів, Хмельницький" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

type PriceRow = {
  label: string;
  priceFrom: number;
  href?: string;
  note?: string;
};

// Консультація — не послуга з каталогу /poslugy, тому задана окремо.
// Решта цін тягнеться з єдиного джерела — data/services.ts.
const consultation: PriceRow = { label: "Консультація та огляд", priceFrom: 300 };

const serviceRows: PriceRow[] = services.flatMap((s) => {
  const primary: PriceRow = {
    label: s.shortName,
    priceFrom: s.priceFrom,
    href: `/poslugy/${s.slug}`,
  };
  if (!s.extraOffer) return [primary];
  const extra: PriceRow = {
    label: `${s.shortName} — ${s.extraOffer.label}`,
    priceFrom: s.extraOffer.priceFrom,
  };
  return [primary, extra];
});

const priceRows: PriceRow[] = [consultation, ...serviceRows];

const priceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/tsiny#prices`,
  name: "Ціни на стоматологічні послуги — Центр Плоскирів",
  url: `${SITE_URL}/tsiny`,
  itemListElement: services.map((s) => ({
    "@type": "Offer",
    priceCurrency: "UAH",
    price: s.priceFrom,
    seller: { "@id": `${SITE_URL}#dentist` },
    itemOffered: { "@type": "MedicalProcedure", name: s.name },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Ціни", item: `${SITE_URL}/tsiny` },
  ],
};

export default function PricesPage() {
  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(priceCatalogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
            <li aria-current="page" className="text-dark">
              Ціни
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="prices-h1"
        className="mx-auto max-w-[900px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">Ціни</p>
        <h1
          id="prices-h1"
          className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Ціни на стоматологічні послуги у Хмельницькому
        </h1>
        <p className="mt-5 max-w-[640px] text-[17px] leading-relaxed text-text">
          Прозорі ціни без прихованих платежів. Точну вартість лікування ви дізнаєтесь на
          консультації — ми складаємо детальний кошторис ще до початку процедур.
        </p>

        <ul className="mt-10 divide-y divide-cream-2 overflow-hidden rounded-[20px] bg-surface">
          {priceRows.map((row) => {
            const price = (
              <span className="shrink-0 font-display text-[15px] font-semibold text-accent">
                від {priceFormatter.format(row.priceFrom)} грн
              </span>
            );
            return (
              <li key={row.label}>
                {row.href ? (
                  <Link
                    href={row.href}
                    className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent md:px-7"
                  >
                    <span className="flex items-center gap-2 text-[15px] font-medium text-dark">
                      {row.label}
                      <ChevronRight
                        className="h-4 w-4 text-muted/50"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                    {price}
                  </Link>
                ) : (
                  <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-7">
                    <span className="text-[15px] font-medium text-dark">{row.label}</span>
                    {price}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-5 text-[14px] leading-relaxed text-muted">
          Вказані ціни «від» — орієнтовні та залежать від клінічного випадку. Повний прайс-лист
          надаємо на консультації або за телефоном.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#booking"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Записатись на консультацію
          </Link>
          <a
            href={contacts.phoneHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-cream-2 bg-cream px-6 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            {contacts.phone}
          </a>
        </div>
      </section>
    </article>
  );
}
