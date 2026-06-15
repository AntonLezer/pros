import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";
import { doctors, type Doctor, type DoctorRole } from "@/data/doctors";
import { formatExperience } from "@/lib/format-experience";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const TITLE = "Команда стоматології «Центр Плоскирів» — лікарі у Хмельницькому";
const DESCRIPTION =
  "Команда стоматології «Центр Плоскирів» у Хмельницькому: сертифіковані лікарі-стоматологи, хірург-імплантолог, ортодонт і власна зуботехнічна лабораторія. Досвід та кваліфікація кожного спеціаліста.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/komanda" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/komanda`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Команда стоматології Центр Плоскирів у Хмельницькому" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const GROUPS: { role: DoctorRole; heading: string }[] = [
  { role: "doctor", heading: "Лікарі-стоматологи" },
  { role: "technician", heading: "Зуботехнічна лабораторія" },
  { role: "admin", heading: "Адміністрація" },
];

const doctorCount = doctors.filter((d) => d.role === "doctor").length;

const stats = [
  { value: String(doctorCount), label: "лікарі-стоматологи" },
  { value: "власна", label: "зуботехнічна лабораторія" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Головна", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Команда", item: `${SITE_URL}/komanda` },
  ],
};

const peopleSchema = {
  "@context": "https://schema.org",
  "@graph": doctors.map((d) => {
    const isDoctor = d.role === "doctor";
    return {
      "@type": isDoctor ? "Physician" : "Person",
      "@id": `${SITE_URL}#${d.id}`,
      name: d.name,
      jobTitle: d.specialty,
      worksFor: { "@id": `${SITE_URL}#dentist` },
      ...(d.image ? { image: `${SITE_URL}${d.image}` } : {}),
      ...(isDoctor ? { medicalSpecialty: "Dentistry" } : {}),
      ...(d.bio ? { description: d.bio } : {}),
      ...(d.education?.length
        ? { alumniOf: d.education.map((e) => ({ "@type": "EducationalOrganization", name: e })) }
        : {}),
      ...(d.certificates?.length
        ? { hasCredential: d.certificates.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })) }
        : {}),
      ...(d.focusAreas?.length ? { knowsAbout: d.focusAreas } : {}),
    };
  }),
};

function MemberCard({ d, priority }: { d: Doctor; priority: boolean }) {
  return (
    <li className="overflow-hidden rounded-[20px] bg-surface">
      <div className="grid sm:grid-cols-[200px_1fr]">
        <div className="relative aspect-[3/4] bg-cream-2 sm:aspect-auto sm:min-h-[280px]">
          {d.image ? (
            <Image
              src={d.image}
              alt={`${d.name} — ${d.specialty}, стоматологія Центр Плоскирів у Хмельницькому`}
              fill
              sizes="(max-width: 640px) 100vw, 200px"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <span className="grid h-full w-full place-items-center font-display text-3xl font-bold text-accent">
              {d.initials}
            </span>
          )}
        </div>
        <div className="p-6 md:p-7">
          <h3 className="font-display text-[18px] font-semibold leading-snug text-dark">{d.name}</h3>
          <p className="mt-1 text-[14px] font-medium text-accent">{d.specialty}</p>
          {d.experienceYears !== undefined && (
            <p className="mt-1 text-[13px] text-muted">Досвід: {formatExperience(d.experienceYears)}</p>
          )}
          {d.bio && <p className="mt-4 text-[15px] leading-relaxed text-text">{d.bio}</p>}
          {d.focusAreas?.length ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {d.focusAreas.map((f) => (
                <li key={f} className="rounded-full bg-cream px-3 py-1 text-[12px] font-medium text-muted">
                  {f}
                </li>
              ))}
            </ul>
          ) : null}
          {d.education?.length ? (
            <div className="mt-4">
              <p className="text-[12px] font-semibold uppercase tracking-[1px] text-muted">Освіта</p>
              <ul className="mt-1.5 space-y-1 text-[14px] leading-relaxed text-text">
                {d.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {d.certificates?.length ? (
            <div className="mt-4">
              <p className="text-[12px] font-semibold uppercase tracking-[1px] text-muted">Сертифікати</p>
              <ul className="mt-1.5 space-y-1 text-[14px] leading-relaxed text-text">
                {d.certificates.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export default function TeamPage() {
  return (
    <article className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(peopleSchema) }}
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
              Команда
            </li>
          </ol>
        </nav>
      </div>

      <section
        aria-labelledby="team-h1"
        className="mx-auto max-w-[1200px] px-5 pt-8 pb-12 md:px-8 md:pt-10 md:pb-16"
      >
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">Наша команда</p>
        <h1
          id="team-h1"
          className="mt-3 max-w-[820px] font-display text-[clamp(28px,4vw,48px)] font-bold leading-[1.1] tracking-tight text-dark"
        >
          Команда стоматології «Центр Плоскирів» у Хмельницькому
        </h1>
        <div className="mt-6 max-w-[760px] space-y-4 text-[17px] leading-relaxed text-text">
          <p>
            За кожною здоровою усмішкою стоять люди. Наша команда — це сертифіковані лікарі-стоматологи,
            хірург-імплантолог, ортодонт та зубні техніки власної лабораторії. Ми постійно підвищуємо
            кваліфікацію, працюємо на сучасному обладнанні й дбаємо про комфорт пацієнтів будь-якого віку.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:max-w-[520px] sm:gap-6">
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

      {GROUPS.map((group) => {
        const members = doctors.filter((d) => d.role === group.role);
        if (members.length === 0) return null;
        const isFirstGroup = group.role === GROUPS[0].role;
        return (
          <section
            key={group.role}
            aria-labelledby={`team-${group.role}`}
            className="border-t border-cream-2 bg-surface py-14 first:border-t-0 md:py-16"
          >
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
              <h2
                id={`team-${group.role}`}
                className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
              >
                {group.heading}
              </h2>
              <ul className="mt-8 grid gap-4 lg:grid-cols-2">
                {members.map((d, index) => (
                  <MemberCard key={d.id} d={d} priority={isFirstGroup && index === 0} />
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section aria-labelledby="team-cta-h2" className="bg-cream py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <h2
              id="team-cta-h2"
              className="font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-tight tracking-tight text-dark"
            >
              Оберіть свого лікаря — ми подбаємо про вашу усмішку
            </h2>
            <p className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-muted">
              Запишіться на консультацію, і ми підберемо спеціаліста та зручний час саме під ваш запит.
            </p>
          </div>

          <aside className="rounded-[20px] bg-surface p-7 md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">Запис на прийом</p>
            <p className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-tight text-dark">
              Готові подбати про вашу усмішку
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">
              Залиште заявку онлайн або зателефонуйте — ми відповімо на всі питання.
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
