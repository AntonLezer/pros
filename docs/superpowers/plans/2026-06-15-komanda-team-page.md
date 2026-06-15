# Team page (`/komanda`) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new SEO-focused team page at `/komanda` presenting the clinic's specialists (grouped by role) with rich, owner-fillable per-person fields and Person/Physician + BreadcrumbList JSON-LD, leaving `/pro-kliniku` and the home page untouched.

**Architecture:** A single server-rendered route `app/komanda/page.tsx` (mirroring the existing `app/pro-kliniku/page.tsx` patterns and design tokens). It reads the existing `doctors` data, extended with optional fields (`role`, `bio`, `education`, `certificates`, `focusAreas`). Optional fields render only when present, so the home `Doctors` component is unaffected and no fake/placeholder text reaches the live, indexed site. Internal linking is achieved by repointing the three existing `/#doctors` links (header nav, footer nav, pro-kliniku "Наші лікарі" button) to `/komanda` and adding `/komanda` to the sitemap.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `next/image`, `next/link`, lucide-react.

**Spec:** `docs/superpowers/specs/2026-06-15-komanda-team-page-design.md`

> **Note (deviation from spec):** The spec said "add a 'Команда' nav link." During planning we found the nav already has a "Лікарі" item → `/#doctors`. To avoid a redundant team entry, we instead **repoint** the existing "Лікарі" links (header + footer) and the pro-kliniku "Наші лікарі" button to `/komanda`. Net effect is the same goal (strong internal links to the new page) with less nav clutter.

> **Testing note:** This repo has **no unit-test runner** (no test script/framework in `package.json`). Per the codebase reality, verification for each task is: `npm run build` (TypeScript + compile), `npm run lint`, and DOM/JSON-LD checks against the dev server with `curl`/grep. We do not introduce a test framework for this feature (YAGNI / surgical changes).

---

## File Structure

- **Create** `lib/format-experience.ts` — the Ukrainian experience-pluralization helper, extracted from `doctors.tsx` so both the home section and the new page reuse one implementation (DRY).
- **Modify** `app/_components/doctors.tsx` — import `formatExperience` from the new lib file instead of the local copy (behavior-identical).
- **Modify** `data/doctors.ts` — extend the `Doctor` type with optional team-page fields, add a `role` to every entry, add a TODO comment for owner-supplied content.
- **Create** `app/komanda/page.tsx` — the team page: `metadata`, JSON-LD (`BreadcrumbList` + Person/Physician `@graph`), breadcrumb, intro, role-grouped member cards, booking CTA.
- **Modify** `app/_components/header.tsx` — repoint the "Лікарі" drawer item to `/komanda`.
- **Modify** `app/_components/footer.tsx` — repoint the "Лікарі" footer link to `/komanda`.
- **Modify** `app/pro-kliniku/page.tsx` — repoint the "Наші лікарі" button to `/komanda`.
- **Modify** `app/sitemap.ts` — add the `/komanda` entry.

---

### Task 1: Extract `formatExperience` into a shared lib helper

**Files:**
- Create: `lib/format-experience.ts`
- Modify: `app/_components/doctors.tsx:4-9` (remove local fn) and `:1-2` (add import)

- [ ] **Step 1: Create the helper file**

Create `lib/format-experience.ts` with the exact logic currently in `doctors.tsx`:

```ts
export function formatExperience(value: number | string) {
  if (typeof value === "string") return `${value} років`;
  if (value % 10 === 1 && value % 100 !== 11) return `${value} рік`;
  if ([2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100)) return `${value} роки`;
  return `${value} років`;
}
```

- [ ] **Step 2: Update `doctors.tsx` to import it**

In `app/_components/doctors.tsx`, delete the local `function formatExperience(...) { ... }` block (lines 4-9) and add this import after the existing `import { doctors } from "@/data/doctors";` line:

```ts
import { formatExperience } from "@/lib/format-experience";
```

The call site `formatExperience(d.experienceYears)` stays unchanged.

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint reports no errors. (The home page renders identically — only the helper's location changed.)

- [ ] **Step 4: Commit**

```bash
git add lib/format-experience.ts app/_components/doctors.tsx
git commit -m "refactor: extract formatExperience into lib for reuse"
```

---

### Task 2: Extend the `Doctor` data model with role + team-page fields

**Files:**
- Modify: `data/doctors.ts`

- [ ] **Step 1: Replace the file contents**

Set `data/doctors.ts` to exactly:

```ts
export type DoctorRole = "doctor" | "technician" | "admin";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears?: number | string;
  initials: string;
  image?: string;
  // --- Team page (/komanda) fields. All optional; the home Doctors section ignores them.
  // TODO (потрібні реальні дані від клініки): заповнити bio / education / certificates / focusAreas
  // для кожного спеціаліста. До заповнення відповідні блоки на сторінці /komanda не відображаються.
  role?: DoctorRole;
  bio?: string;
  education?: string[];
  certificates?: string[];
  focusAreas?: string[];
};

export const doctors: Doctor[] = [
  {
    id: "administrator",
    name: "Любов Андріївна",
    specialty: "Адміністратор, координатор всіх процесів клініки",
    //experienceYears: 5,
    initials: "ІП",
    image: "/images/doctors/IMG_9420.jpg",
    role: "admin",
  },
  {
    id: "chief-technician",
    name: "Анатолій Михайлович",
    specialty: "Головний зубний технік клініки",
    experienceYears: 38,
    initials: "ІП",
    image: "/images/doctors/IMG_9049.jpg",
    role: "technician",
  },
  {
    id: "ploskyriv",
    name: "Вадим Олександрович",
    specialty: "хірург-імплантолог",
    experienceYears: "10+",
    initials: "ІП",
    image: "/images/doctors/IMG_8994.jpg",
    role: "doctor",
  },
  {
    id: "kovalchuk",
    name: "Євгенія Володимирівна",
    specialty: "стоматолог загальної практики, ортодонт",
    experienceYears: "8+",
    initials: "ОК",
    image: "/images/doctors/IMG_8982.jpg",
    role: "doctor",
  },
  {
    id: "melnyk",
    name: "Катерина Петрівна",
    specialty: "стоматолог-терапевт, ендодонтист",
    experienceYears: "12+",
    initials: "ЮМ",
    image: "/images/doctors/IMG_9027.jpg",
    role: "doctor",
  },
  {
    id: "technician",
    name: "Ірина Петрівна",
    specialty: "Зубний технік",
    experienceYears: 20,
    initials: "ІП",
    image: "/images/doctors/IMG_9050.jpg",
    role: "technician",
  },
];
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: succeeds. (New fields are optional; nothing else changes.)

- [ ] **Step 3: Commit**

```bash
git add data/doctors.ts
git commit -m "feat: add role + team-page fields to Doctor model"
```

---

### Task 3: Create the `/komanda` team page

**Files:**
- Create: `app/komanda/page.tsx`

- [ ] **Step 1: Create the page file**

Create `app/komanda/page.tsx` with exactly:

```tsx
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

        <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 sm:max-w-[520px]">
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
```

- [ ] **Step 2: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean. The build output lists `/komanda` as a static route.

- [ ] **Step 3: Verify rendered DOM + JSON-LD**

Run the dev server in one shell: `npm run dev`
In another shell:

```bash
curl -s http://localhost:3000/komanda | grep -c '<h1'
curl -s http://localhost:3000/komanda | grep -o '"@type":"BreadcrumbList"'
curl -s http://localhost:3000/komanda | grep -o '"@id":"https://www.mnvcploskiriv.com.ua#ploskyriv"'
```

Expected: first command prints `1` (exactly one `<h1>`); second prints `"@type":"BreadcrumbList"`; third prints the matching `@id` (confirms person nodes reuse the global `#<id>` identifiers). Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add app/komanda/page.tsx
git commit -m "feat: add /komanda team page with Person/Breadcrumb schema"
```

---

### Task 4: Wire internal links + sitemap

**Files:**
- Modify: `app/_components/header.tsx:15`
- Modify: `app/_components/footer.tsx:38`
- Modify: `app/pro-kliniku/page.tsx:207`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Repoint the header "Лікарі" item**

In `app/_components/header.tsx`, change the `DRAWER_ITEMS` entry:

```ts
  { href: "/#doctors", label: "Лікарі" },
```

to:

```ts
  { href: "/komanda", label: "Лікарі" },
```

- [ ] **Step 2: Repoint the footer "Лікарі" link**

In `app/_components/footer.tsx`, change the `FOOTER_LINKS` entry:

```ts
  { href: "/#doctors", label: "Лікарі" },
```

to:

```ts
  { href: "/komanda", label: "Лікарі" },
```

- [ ] **Step 3: Repoint the pro-kliniku "Наші лікарі" button**

In `app/pro-kliniku/page.tsx`, change the `<Link>` href on line ~207 from:

```tsx
              href="/#doctors"
```

to:

```tsx
              href="/komanda"
```

(Leave the button text "Наші лікарі" unchanged.)

- [ ] **Step 4: Add `/komanda` to the sitemap**

In `app/sitemap.ts`, add this entry to the returned array, immediately after the `/pro-kliniku` object and before `...servicePages`:

```ts
    {
      url: `${SITE_URL}/komanda`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
```

- [ ] **Step 5: Verify build + lint + sitemap + links**

Run: `npm run build && npm run lint`
Expected: succeeds.

Then with the dev server running (`npm run dev`):

```bash
curl -s http://localhost:3000/sitemap.xml | grep -o '/komanda'
curl -s http://localhost:3000/pro-kliniku | grep -o 'href="/komanda"'
```

Expected: first prints `/komanda` (it is in the sitemap); second prints `href="/komanda"` (pro-kliniku button repointed). Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add app/_components/header.tsx app/_components/footer.tsx app/pro-kliniku/page.tsx app/sitemap.ts
git commit -m "feat: link team page from nav, footer, pro-kliniku and sitemap"
```

---

### Task 5: Final end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Clean build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds with `/komanda` listed as a route; lint clean.

- [ ] **Step 2: Confirm page structure and that empty fields are omitted**

With `npm run dev` running:

```bash
curl -s http://localhost:3000/komanda | grep -c '<h2'
curl -s http://localhost:3000/komanda | grep -o 'Лікарі-стоматологи'
curl -s http://localhost:3000/komanda | grep -c 'Освіта'
```

Expected: `grep -c '<h2'` prints `4` (three role groups + the CTA `<h2>`); "Лікарі-стоматологи" is found; `grep -c 'Освіта'` prints `0` (no education content yet, so the block is correctly omitted — confirms no empty/placeholder sections leak to the live page). Stop the dev server.

- [ ] **Step 3: Confirm untouched pages still work**

With `npm run dev` running:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/pro-kliniku
```

Expected: both print `200`. Stop the dev server.

- [ ] **Step 4: (Optional) Visual check**

Open `http://localhost:3000/komanda` in a browser (or via Playwright MCP). Confirm: breadcrumb, single H1, three role-grouped sections of member cards with photos, and the booking CTA all render correctly with the existing cream/accent design tokens.

---

## Self-Review

**Spec coverage:**
- New distinct page, `/pro-kliniku` untouched → Tasks 3 (new file) + 4 (no pro-kliniku content change, only one href). ✅
- Ukrainian slug `/komanda` → Task 3. ✅
- Topic = team/doctors → Task 3. ✅
- Optional data fields, home component unaffected → Task 2 (optional fields) + Task 1 (helper reuse, behavior-identical). ✅
- No fake content on live site; graceful omission → MemberCard conditional rendering (Task 3); verified in Task 5 Step 2. ✅
- Role grouping (Лікарі / Лабораторія / Адміністрація) → Task 3 `GROUPS`. ✅
- metadata mirror + canonical → Task 3. ✅
- JSON-LD BreadcrumbList + Person/Physician reusing `#<id>` + worksFor `#dentist` + conditional alumniOf/hasCredential/knowsAbout → Task 3; verified Task 3 Step 3. ✅
- Semantic HTML5, next/link, next/image with explicit dims (aspect-ratio container + `fill`) for CLS → Task 3. ✅
- Internal linking (no orphan) + sitemap → Task 4. (Implemented via repointing existing "Лікарі" links rather than adding a "Команда" item — see deviation note.) ✅
- Verification: build, lint, render/JSON-LD/sitemap checks → Tasks 3-5. ✅

**Placeholder scan:** No "TBD/TODO/implement later" steps. The only "TODO" is the intentional in-code comment in `data/doctors.ts` (owner content marker), which is content-process, not a plan gap. Full code given for every code step. ✅

**Type consistency:** `Doctor`/`DoctorRole` defined in Task 2 and imported in Task 3; `formatExperience` signature `(value: number | string)` consistent between Task 1 and its use in Task 3; `role` values `"doctor" | "technician" | "admin"` consistent between Task 2 data and Task 3 `GROUPS`; person `@id` format `${SITE_URL}#${d.id}` matches the layout's `employee[].@id`. ✅
