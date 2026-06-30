import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const TITLE = "Про клініку «Центр Плоскирів» — стоматологія у Хмельницькому";
const DESCRIPTION =
  "Медичний науково-виробничий центр «Плоскирів» — сімейна стоматологія у Хмельницькому: понад 9 років досвіду, власна зуботехнічна лабораторія, сучасне обладнання та лікування без болю.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/pro-kliniku" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/pro-kliniku`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Центр Плоскирів — стоматологія у Хмельницькому" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const stats = [
  { value: "9+", label: "років досвіду" },
  { value: "5", label: "спеціалістів" },
  { value: "власна", label: "зуботехнічна лабораторія" },
  { value: "0%", label: "болю при лікуванні" },
];

const advantages = [
  {
    title: "Власна зуботехнічна лабораторія",
    text: "Коронки, мости та протези виготовляємо самостійно — це контроль якості на кожному етапі й менше часу на очікування.",
  },
  {
    title: "Точна діагностика",
    text: "Мікроскоп, цифровий рентген, інтраоральна камера та 3D-сканування — бачимо більше й зберігаємо ваші зуби.",
  },
  {
    title: "Лікування без болю",
    text: "Сучасні анестетики та седація за бажанням пацієнта роблять кожен візит спокійним і комфортним.",
  },
  {
    title: "Стерильність і безпека",
    text: "Суворий протокол обробки інструментів та одноразові матеріали на кожному прийомі.",
  },
  {
    title: "Сімейний підхід",
    text: "Приймаємо дітей від 3 років і дорослих — усю родину обслуговуємо в одній клініці.",
  },
  {
    title: "Працюємо без перебоїв",
    text: "Автономне живлення дозволяє приймати пацієнтів навіть під час відключень електроенергії.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/pro-kliniku#about`,
  url: `${SITE_URL}/pro-kliniku`,
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
    { "@type": "ListItem", position: 2, name: "Про клініку", item: `${SITE_URL}/pro-kliniku` },
  ],
};

export default function AboutPage() {
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
              Про клініку
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="about-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
          Про нас
        </p>
        <h1
          id="about-h1"
          className="mt-3 max-w-[760px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Сімейна стоматологія «Центр Плоскирів» у Хмельницькому
        </h1>
        <div className="mt-6 max-w-[760px] space-y-4 text-[17px] leading-relaxed text-text">
          <p>
            Медичний науково-виробничий центр «Плоскирів» — сучасна стоматологія у Хмельницькому на
            вул. Бажана, 19 (район Заготзерно). Понад 9 років ми дбаємо про здоров’я та усмішки
            пацієнтів будь-якого віку — від малюків до людей похилого віку.
          </p>
          <p>
            Команда з п’яти спеціалістів, сучасне обладнання та власна зуботехнічна лабораторія
            дозволяють нам контролювати якість на кожному етапі — від діагностики до виготовлення
            коронок і протезів. Ми лікуємо без болю, чесно складаємо кошторис ще до початку
            процедур і даємо гарантію на роботу.{" "}
            <Link href="/stomatologiya-khmelnytskyy" className="text-accent underline-offset-2 hover:underline">
              Детальніше про стоматологію у Хмельницькому
            </Link>
            .
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface p-5 md:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(26px,3vw,36px)] font-bold leading-none text-accent">
                  {s.value}
                </span>
                <span className="mt-2 block text-[13px] leading-snug text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="about-advantages-h2"
        className="border-t border-cream-2 bg-surface py-14 md:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2
            id="about-advantages-h2"
            className="max-w-[640px] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
          >
            Що вирізняє нашу клініку
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <li
                key={a.title}
                className="rounded-2xl bg-cream p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
              >
                <h3 className="font-display text-[16px] font-semibold leading-snug text-dark">
                  {a.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{a.text}</p>
              </li>
            ))}
          </ul>

          {/*
            TODO (потрібні реальні дані від клініки):
            — точний рік заснування клініки;
            — номер ліцензії на медичну практику;
            — сертифікати, дипломи та нагороди лікарів.
            Додати окремою секцією для посилення E-E-A-T.
          */}
        </div>
      </section>

      <section aria-labelledby="about-team-h2" className="bg-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <h2
              id="about-team-h2"
              className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
            >
              Команда, якій довіряють свою усмішку
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-muted">
              Кожен лікар — сертифікований спеціаліст із багаторічним клінічним досвідом і постійним
              підвищенням кваліфікації. Познайомтеся з нашими стоматологами та зубними техніками.
            </p>
            <Link
              href="/komanda"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full border-2 border-cream-2 bg-cream px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Наші лікарі
            </Link>
          </div>

          <aside className="rounded-[20px] bg-surface p-7 md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Запис на прийом
            </p>
            <p className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-tight text-dark">
              Готові подбати про вашу усмішку
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Залиште заявку онлайн або зателефонуйте — ми підберемо зручний час і відповімо на всі
              питання.
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
