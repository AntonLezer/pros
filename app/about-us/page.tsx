import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";
import { whyUsStats } from "@/data/why-us";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const TITLE = "Про нас — сімейна стоматологія «Центр Плоскирів» у Хмельницькому";
const DESCRIPTION =
  "Дізнайтеся більше про стоматологію «Центр Плоскирів» у Хмельницькому: наша місія, цінності та підхід до лікування. Понад 9 років турботи про здоров’я та усмішки пацієнтів усієї родини.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about-us" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about-us`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Про нас — Центр Плоскирів, стоматологія у Хмельницькому" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const principles = [
  {
    title: "Індивідуальний підхід",
    text: "Кожен план лікування складаємо під конкретну ситуацію, стан здоров’я та побажання пацієнта.",
  },
  {
    title: "Чесні ціни та гарантія",
    text: "Прозорий кошторис ще до початку процедур і гарантія на виконані роботи.",
  },
  {
    title: "Стерильність та безпека",
    text: "Суворий протокол обробки інструментів та одноразові матеріали на кожному прийомі.",
  },
  {
    title: "Команда професіоналів",
    text: "Сертифіковані лікарі з багаторічним досвідом і постійним підвищенням кваліфікації.",
  },
  {
    title: "Комфорт та турбота",
    text: "Спокійна атмосфера й уважне ставлення, щоб кожен візит проходив без стресу.",
  },
];

const approachSteps = [
  {
    title: "Консультація та діагностика",
    text: "Оглядаємо, з’ясовуємо причину проблеми й разом обираємо оптимальне рішення.",
  },
  {
    title: "Прозорий план і кошторис",
    text: "Погоджуємо план лікування та його вартість ще до початку — без прихованих доплат.",
  },
  {
    title: "Лікування без болю",
    text: "Сучасна анестезія та щадні методики роблять кожен візит спокійним і комфортним.",
  },
  {
    title: "Підтримка та гарантія",
    text: "Даємо гарантію на виконані роботи й супроводжуємо вас після завершення лікування.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about-us#about`,
  url: `${SITE_URL}/about-us`,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "uk-UA",
  mainEntity: { "@id": `${SITE_URL}#dentist` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Про нас", item: `${SITE_URL}/about-us` },
  ],
};

export default function AboutUsPage() {
  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
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
              Про нас
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="about-us-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">Про нас</p>
        <h1
          id="about-us-h1"
          className="mt-3 max-w-[820px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Сімейна стоматологія «Центр Плоскирів» у Хмельницькому
        </h1>
        <div className="mt-6 max-w-[760px] space-y-4 text-[17px] leading-relaxed text-text">
          <p>
            «Центр Плоскирів» — це медичний науково-виробничий центр і сімейна стоматологія у
            Хмельницькому. Понад 9 років ми дбаємо про здоров’я та усмішки пацієнтів будь-якого віку
            — від малюків до людей похилого віку.
          </p>
          <p>
            Ми віримо, що якісна стоматологія — це не лише сучасне обладнання та власна зуботехнічна
            лабораторія, а й чесність, турбота та увага до кожного пацієнта. Тому ми складаємо
            прозорий кошторис ще до початку лікування, працюємо без болю й даємо гарантію на свою
            роботу.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="about-us-principles-h2"
        className="border-t border-cream-2 bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="about-us-principles-h2"
            className="max-w-[640px] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Наші принципи
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl bg-cream p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <h3 className="font-display text-[16px] font-semibold leading-snug text-dark">
                  {p.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[15px] text-muted">
            За кожним принципом стоять люди.{" "}
            <Link href="/komanda" className="font-semibold text-accent transition-colors hover:text-accent-dark">
              Познайомтеся з нашою командою →
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="about-us-trust-h2" className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="about-us-trust-h2"
            className="max-w-[640px] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Чому пацієнти нам довіряють
          </h2>
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {whyUsStats.map((s) => (
              <div key={s.id} className="rounded-2xl bg-surface p-5 md:p-6">
                <dt>
                  <span className="block font-display text-[clamp(26px,3vw,36px)] font-bold leading-none text-accent">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-[14px] font-semibold leading-snug text-dark">
                    {s.title}
                  </span>
                </dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-muted">{s.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="about-us-approach-h2"
        className="border-t border-cream-2 bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="about-us-approach-h2"
            className="max-w-[640px] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Наш підхід до лікування
          </h2>
          <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-muted">
            Ми ведемо пацієнта від першого огляду до результату — зрозуміло, чесно й без болю.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-cream p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 font-display text-[15px] font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-[16px] font-semibold leading-snug text-dark">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-us-location-h2" className="bg-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <h2
              id="about-us-location-h2"
              className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
            >
              Як нас знайти
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-muted">
              Ми працюємо у Хмельницькому за адресою {contacts.address.line2}{" "}
              {contacts.address.district}. До клініки зручно дістатися з різних районів міста.
            </p>
            <a
              href={contacts.mapDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <MapPin className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
              Прокласти маршрут
            </a>
          </div>

          <dl className="rounded-[20px] bg-surface p-7 md:p-8">
            <dt className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">Адреса</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-text">
              {contacts.address.line1} {contacts.address.line2} {contacts.address.district}
            </dd>
            <dt className="mt-5 text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Графік роботи
            </dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-text">
              {contacts.hours.weekdays}
              <br />
              {contacts.hours.saturday}
            </dd>
            <dt className="mt-5 text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Телефон
            </dt>
            <dd className="mt-2">
              <a
                href={contacts.phoneHref}
                className="text-[15px] font-semibold text-dark transition-colors hover:text-accent"
              >
                {contacts.phone}
              </a>
            </dd>
          </dl>
        </div>
      </section>

      <section aria-labelledby="about-us-cta-h2" className="border-t border-cream-2 bg-surface py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <h2
              id="about-us-cta-h2"
              className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
            >
              Готові подбати про вашу усмішку
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-muted">
              Залиште заявку онлайн або зателефонуйте — ми підберемо зручний час і відповімо на всі
              питання.
            </p>
          </div>

          <aside className="rounded-[20px] bg-cream p-7 md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">Запис на прийом</p>
            <p className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-tight text-dark">
              Завітайте до «Центру Плоскирів»
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              {contacts.address.line1} {contacts.address.line2} {contacts.address.district}
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
    </article>
  );
}
