import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";
import { services } from "@/data/services";
import { whyUsStats } from "@/data/why-us";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const PATH = "/stomatologiya-khmelnytskyy";
const TITLE =
  "Стоматологія Хмельницький — сучасна клініка з лікуванням без болю | Центр Плоскирів";
const DESCRIPTION =
  "Стоматологія у Хмельницькому: лікування зубів, імплантація, брекети, дитяча стоматологія. Центр «Плоскирів» — 9+ років досвіду, власна лабораторія, рейтинг 4.9★. Запис на консультацію.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    url: `${SITE_URL}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Стоматологія у Хмельницькому — Центр Плоскирів",
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

const choosingTips = [
  {
    title: "Досвід і кваліфікація лікарів",
    text: "Перевірте, скільки років працює клініка та чи мають лікарі сертифікати з постійним підвищенням кваліфікації. У «Плоскирів» — понад 9 років практики та команда з п’яти спеціалістів.",
  },
  {
    title: "Сучасне обладнання",
    text: "Мікроскоп, цифровий рентген, 3D-сканування та інтраоральна камера дозволяють точніше діагностувати і зберігати зуби. Ми інвестуємо в технології, щоб лікування було передбачуваним.",
  },
  {
    title: "Прозорі ціни до початку лікування",
    text: "Надійна стоматологія у Хмельницькому складає детальний кошторис ще на консультації. Первинний огляд у нас — 300 грн, далі ви знаєте вартість кожного етапу.",
  },
  {
    title: "Відгуки реальних пацієнтів",
    text: "Рейтинг 4.9★ на основі понад 1200 відгуків — один із показників, на які варто звернути увагу. Почитайте відгуки на головній сторінці або в Google Maps.",
  },
  {
    title: "Комфорт і безболісність",
    text: "Сучасні анестетики, щадні методики та можливість седації роблять візит спокійним навіть для тих, хто боїться стоматолога.",
  },
];

const faqItems = [
  {
    id: "why-khmelnytskyi",
    question: "Чому обирати стоматологію саме у Хмельницькому?",
    answer:
      "Місцева клініка зручна для регулярних візитів, контрольних оглядів і термінової допомоги. Центр «Плоскирів» знаходиться на вул. Бажана, 19 (р-н Заготзерно) — легко дістатися з будь-якого району міста.",
  },
  {
    id: "services",
    question: "Які послуги надає ваша стоматологія у Хмельницькому?",
    answer:
      "Ми надаємо повний спектр послуг: терапевтичне лікування, імплантацію, брекети та елайнери, відбілювання, протезування, дитячу стоматологію та професійну гігієну.",
  },
  {
    id: "consultation",
    question: "Скільки коштує первинна консультація?",
    answer:
      "Первинна консультація та огляд — 300 грн. Ви отримаєте план лікування та детальний кошторис ще до початку будь-яких процедур.",
  },
  {
    id: "pain",
    question: "Чи боляче лікувати зуби у вашій клініці?",
    answer:
      "Ні — ми використовуємо сучасні анестетики, які повністю знімають біль. Пацієнти часто засинають під час процедур.",
  },
  {
    id: "kids",
    question: "Чи приймаєте дітей?",
    answer: "Так, ми приймаємо дітей від 3 років у спокійній, ігровій атмосфері без страху та стресу.",
  },
  {
    id: "hours",
    question: "Який графік роботи клініки?",
    answer: `${contacts.hours.weekdays}. ${contacts.hours.saturday}.`,
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${PATH}#webpage`,
  url: `${SITE_URL}${PATH}`,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "uk-UA",
  about: { "@id": `${SITE_URL}#dentist` },
  isPartOf: { "@id": SITE_URL },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Стоматологія Хмельницький",
      item: `${SITE_URL}${PATH}`,
    },
  ],
};

export default function StomatologiyaKhmelnytskyyPage() {
  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              Стоматологія Хмельницький
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="seo-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
          Хмельницький · Стоматологія
        </p>
        <h1
          id="seo-h1"
          className="mt-3 max-w-[800px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Стоматологія у Хмельницькому — клініка «Центр Плоскирів»
        </h1>
        <div className="mt-6 max-w-[760px] space-y-4 text-[17px] leading-relaxed text-text">
          <p>
            Шукаєте надійну стоматологію у Хмельницькому? Медичний науково-виробничий центр
            «Плоскирів» — сімейна клініка на{" "}
            <span className="font-medium text-dark">
              {contacts.address.line2}, {contacts.address.district.replace(/[()]/g, "")}
            </span>
            . Ми лікуємо зуби без болю, встановлюємо імпланти, брекети та протези, приймаємо
            дітей від 3 років.
          </p>
          <p>
            Понад 9 років досвіду, власна зуботехнічна лабораторія та рейтинг 4.9★ — все, щоб
            ви отримали якісне лікування в одному місці, без зайвих поїздок і непередбачених
            витрат.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#booking"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Записатись на консультацію
          </Link>
          <a
            href={contacts.phoneHref}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-cream-2 bg-surface px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Phone className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
            {contacts.phone}
          </a>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {whyUsStats.map((s) => (
            <div key={s.id} className="rounded-2xl bg-surface p-5 md:p-6">
              <dt className="sr-only">{s.title}</dt>
              <dd>
                <span className="block font-display text-[clamp(26px,3vw,36px)] font-bold leading-none text-accent">
                  {s.value}
                </span>
                <span className="mt-2 block text-[13px] leading-snug text-muted">{s.title}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="seo-services-h2"
        className="border-t border-cream-2 bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="seo-services-h2"
            className="max-w-[640px] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Стоматологічні послуги у Хмельницькому
          </h2>
          <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-muted">
            Повний спектр стоматологічної допомоги для дорослих і дітей — від профілактики до
            складної імплантації.
          </p>
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
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
          <Link
            href="/tsiny"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full border-2 border-cream-2 bg-cream px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Повний прайс-лист
          </Link>
        </div>
      </section>

      <section
        aria-labelledby="seo-choosing-h2"
        className="bg-cream py-14 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="seo-choosing-h2"
            className="max-w-[640px] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Як обрати стоматологію у Хмельницькому
          </h2>
          <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-muted">
            На що звернути увагу, коли шукаєте клініку для себе або родини.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {choosingTips.map((tip) => (
              <li
                key={tip.title}
                className="rounded-2xl bg-surface p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <h3 className="font-display text-[16px] font-semibold leading-snug text-dark">
                  {tip.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{tip.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="seo-faq-h2"
        className="border-t border-cream-2 bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-[800px] px-5 md:px-8">
          <h2
            id="seo-faq-h2"
            className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Часті питання про стоматологію у Хмельницькому
          </h2>
          <dl className="mt-8 divide-y divide-cream-2">
            {faqItems.map((q) => (
              <div key={q.id} className="py-5">
                <dt className="font-display text-[16px] font-semibold leading-snug text-dark">
                  {q.question}
                </dt>
                <dd className="mt-2 text-[14px] leading-relaxed text-muted">{q.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="seo-cta-h2" className="bg-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <h2
              id="seo-cta-h2"
              className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
            >
              Запишіться до стоматолога у Хмельницькому
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-muted">
              Залиште заявку онлайн або зателефонуйте — підберемо зручний час для консультації та
              відповімо на всі питання щодо лікування.
            </p>
            <address className="mt-6 not-italic">
              <p className="inline-flex items-start gap-2 text-[15px] text-text">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.25} aria-hidden="true" />
                <span>
                  {contacts.address.line1} {contacts.address.line2}
                  <br />
                  {contacts.address.district}
                </span>
              </p>
              <p className="mt-2 text-[14px] text-muted">
                {contacts.hours.weekdays} · {contacts.hours.saturday}
              </p>
            </address>
            <Link
              href="/komanda"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full border-2 border-cream-2 bg-surface px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Наші лікарі
            </Link>
          </div>

          <aside className="rounded-[20px] bg-surface p-7 md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Запис на прийом
            </p>
            <p className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-tight text-dark">
              Консультація — 300 грн
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Отримаєте план лікування та детальний кошторис ще до початку процедур. Без прихованих
              доплат.
            </p>
            <Link
              href="/#booking"
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent px-6 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Записатись онлайн
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
    </article>
  );
}
