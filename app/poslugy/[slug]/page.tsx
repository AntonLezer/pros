import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Phone } from "lucide-react";
import { services } from "@/data/services";
import { contacts } from "@/data/contacts";
import { faqItems } from "@/data/faq";

const SITE_URL = "https://ploskyriv.com.ua";
const priceFormatter = new Intl.NumberFormat("uk-UA");

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const url = `${SITE_URL}/poslugy/${service.slug}`;
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/poslugy/${service.slug}` },
    openGraph: {
      type: "article",
      url,
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: service.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const url = `${SITE_URL}/poslugy/${service.slug}`;

  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${url}#procedure`,
    name: service.name,
    description: service.longDescription,
    procedureType: "Therapeutic",
    bodyLocation: "Mouth",
    url,
    offers: {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: service.priceFrom,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}#dentist` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Послуги", item: `${SITE_URL}#services` },
      { "@type": "ListItem", position: 3, name: service.shortName, item: url },
    ],
  };

  const otherServices = services.filter((s) => s.id !== service.id);

  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
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
            <li>
              <Link href="/#services" className="transition-colors hover:text-accent">
                Послуги
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-muted/60" strokeWidth={2} />
            </li>
            <li aria-current="page" className="text-dark">
              {service.shortName}
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="service-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Послуга
            </p>
            <h1
              id="service-h1"
              className="mt-3 font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
            >
              {service.name}
            </h1>
            <p className="mt-5 max-w-[640px] text-[17px] leading-relaxed text-text">
              {service.longDescription}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-2xl bg-surface p-4 text-[14px] leading-relaxed text-text"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-[12px] font-bold text-accent"
                  >
                    ✓
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-[20px] bg-surface p-7 md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Ціна
            </p>
            <p className="mt-3 font-display text-[clamp(28px,3.4vw,40px)] font-bold leading-tight text-dark">
              від {priceFormatter.format(service.priceFrom)} грн
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Точна вартість залежить від клінічного випадку. Безкоштовна консультація — і ви отримаєте детальний кошторис ще до початку лікування.
            </p>
            <Link
              href="/#booking"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Записатись на консультацію
            </Link>
            <a
              href={contacts.phoneHref}
              className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-cream-2 bg-cream text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              {contacts.phone}
            </a>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="other-services-h2"
        className="border-t border-cream-2 bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="other-services-h2"
            className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Інші послуги клініки
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/poslugy/${s.slug}`}
                  className="flex h-full items-start gap-4 rounded-2xl bg-cream p-5 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] active:scale-[0.99]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-white">
                    <s.Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display text-[15px] font-semibold text-dark">
                      {s.shortName}
                    </span>
                    <span className="mt-1 text-[13px] text-muted">
                      від {priceFormatter.format(s.priceFrom)} грн
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="service-faq-h2"
        className="bg-cream py-14 md:py-20"
      >
        <div className="mx-auto max-w-[800px] px-5 md:px-8">
          <h2
            id="service-faq-h2"
            className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Часті питання
          </h2>
          <dl className="mt-8 divide-y divide-cream-2">
            {faqItems.map((q) => (
              <div key={q.id} className="py-5">
                <dt className="font-display text-[16px] font-semibold leading-snug text-dark">
                  {q.question}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-muted">
                  {q.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </article>
  );
}
