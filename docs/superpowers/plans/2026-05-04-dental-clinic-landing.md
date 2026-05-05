# Dental Clinic Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Ukrainian-language dental clinic landing page (Центр Плоскирів), mobile-primary with sensible responsive expansion above `md`.

**Architecture:** All sections rendered in `app/page.tsx`. Sections are server components in `app/_components/`. Interactive bits are isolated `"use client"` components. Hardcoded content lives in `data/*.ts`. Booking form posts to a stubbed server action in `app/_actions/booking.ts`.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19.2.4, Tailwind CSS 4, TypeScript 5, Onest from `next/font/google`, `lucide-react` for generic icons, custom SVG components for dental icons.

**Spec:** [`docs/superpowers/specs/2026-05-04-dental-clinic-landing-design.md`](../specs/2026-05-04-dental-clinic-landing-design.md)

---

## Conventions for this plan

**Verification, not TDD.** Per the spec, this build has no automated tests. Each task ends with two verification steps: a `npm run lint && npm run build` step and a manual browser check. Both must pass before moving on.

**No commit steps.** Git is unavailable in this session's environment. Each task ends with a "Checkpoint" line that marks a natural review point. Commit later in batches if/when git is enabled.

**Container pattern.** Every section uses the page container utility `mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8`. Section components apply this on their root element rather than introducing a `<Container>` wrapper.

**Branding tokens (already declared in `globals.css` after Task 1):** `bg-brand`, `text-brand`, `bg-brand-tint`, `text-ink`, `text-ink-muted`, `bg-surface`, `bg-surface-alt`, `border-rule`. Use these instead of raw hex.

**Anchor IDs:** `#top` (hero), `#services`, `#about` (why-us), `#reviews`, `#doctors`, `#booking-form`, `#contacts`. Set on each `<section>`.

**Server vs client.** Sections are server components by default. Only files that use state, browser APIs, or event handlers carry `"use client"`. Listed explicitly per task.

**Manual verification port.** The dev server (`npm run dev`) runs at `http://localhost:3000`. After each task, open it in a browser at viewport widths 375px (mobile) and 1280px (desktop) — Chrome devtools "Toggle device toolbar" makes this fast.

---

## File layout (target)

```
app/
  layout.tsx              # Onest font, metadata
  page.tsx                # Composes sections in order
  globals.css             # Tailwind 4 + brand tokens
  _actions/
    booking.ts            # "use server" — validate, log, return ok/error
  _components/
    header.tsx            # "use client" — logo, nav, CTA, hamburger menu
    hero.tsx              # Server component
    services.tsx          # Server component
    before-after.tsx      # "use client" — draggable slider
    why-us.tsx            # Server component
    reviews.tsx           # Server component (renders track + dot client child)
    reviews-dots.tsx      # "use client" — dot indicators
    doctors.tsx           # Server component
    doctors-dots.tsx      # "use client" — dot indicators
    booking-form.tsx      # "use client" — name + phone + submit
    contacts.tsx          # Server component
    footer.tsx            # Server component
    icons/
      tooth.tsx
      braces.tsx
      implant.tsx
      droplet.tsx
      baby-tooth.tsx
      shield-check.tsx
data/
  services.ts             # Service[]
  doctors.ts              # Doctor[]
  reviews.ts              # Review[]
  features.ts             # Feature[]
  contacts.ts             # Contacts
public/
  images/
    before-after.svg      # In-repo composite
    map-placeholder.svg   # In-repo neutral street grid
next.config.ts            # remotePatterns for Unsplash
package.json              # adds lucide-react
```

**Note on dot-indicator subcomponents:** Reviews and doctors each split into a server-rendered list (the carousel track with all cards) and a tiny `"use client"` dot-indicator component. This keeps the heavy markup on the server while isolating browser-only logic (`IntersectionObserver`).

---

## Task 0: Install dependencies

**Files:**
- Modify: `package.json` (added by npm install)
- Modify: `package-lock.json` (added by npm install)

- [ ] **Step 1: Install lucide-react**

Run from project root:
```bash
npm install lucide-react
```

Expected: `lucide-react` appears in `package.json` `"dependencies"` and the install completes with no errors.

- [ ] **Step 2: Verify**

Run:
```bash
npm run dev
```

Expected: dev server starts on http://localhost:3000 with no errors. Stop the server (Ctrl+C) before proceeding.

- [ ] **Checkpoint:** dependencies installed, dev server boots clean.

---

## Task 1: Foundation — fonts, brand tokens, root layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `app/page.tsx` (replace default content with empty shell)

- [ ] **Step 1: Update `app/globals.css`**

Replace the entire file with:

```css
@import "tailwindcss";

@theme {
  --color-brand: #C97B3F;
  --color-brand-dark: #A85F2C;
  --color-brand-tint: #FBF1E8;
  --color-brand-tint-strong: #F5D9BF;
  --color-ink: #1F2937;
  --color-ink-muted: #6B7280;
  --color-surface: #FFFFFF;
  --color-surface-alt: #FAF8F5;
  --color-rule: #E5E7EB;

  --font-sans: var(--font-onest);
}

html {
  background: var(--color-surface-alt);
  color: var(--color-ink);
}

body {
  font-family: var(--font-sans);
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

Note: drop the previous `prefers-color-scheme: dark` block; no dark mode in scope.

- [ ] **Step 2: Update `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Центр Плоскирів — сучасна стоматологія у Хмельницькому",
  description:
    "Лікуємо зуби з турботою про вас. Комплексний підхід, новітні технології та комфорт на кожному етапі лікування.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${onest.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
```

Notes:
- `lang="uk"` matches the page language.
- The `Geist` and `Geist_Mono` imports from the original layout are removed.

- [ ] **Step 3: Replace `app/page.tsx` with empty shell**

Replace the entire file with:

```tsx
export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-md px-4 py-16 text-center md:max-w-6xl md:px-8">
        <p className="text-ink-muted">Sections will appear here.</p>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors. The build prints route `/` as a static page.

- [ ] **Step 5: Manual verification**

Run `npm run dev` and visit http://localhost:3000.

Expected:
- Page background is the warm off-white (`#FAF8F5`).
- Text "Sections will appear here." appears in Onest (look at glyphs — the lowercase `a` and `g` should be the geometric Onest forms, not Helvetica defaults).
- No console errors.
- View source: `<html lang="uk" class="__variable_xxx h-full antialiased">`. The variable class confirms Onest is wired.

Stop the dev server.

- [ ] **Checkpoint:** foundation in place — fonts, tokens, brand colors, blank shell ready for sections.

---

## Task 2: Custom dental icon components

**Files:**
- Create: `app/_components/icons/tooth.tsx`
- Create: `app/_components/icons/braces.tsx`
- Create: `app/_components/icons/implant.tsx`
- Create: `app/_components/icons/droplet.tsx`
- Create: `app/_components/icons/baby-tooth.tsx`
- Create: `app/_components/icons/shield-check.tsx`

All icons follow the same shape: a default-export functional component that accepts `SVGProps<SVGSVGElement>`, renders a 24×24 SVG with `currentColor` strokes, default `stroke-width={1.6}`, no fill. Using `currentColor` lets callers set color via `text-brand` Tailwind classes.

- [ ] **Step 1: Create `app/_components/icons/tooth.tsx`**

```tsx
import type { SVGProps } from "react";

export default function ToothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 3.5C5 3.5 3.5 5 3.5 7c0 2.2.6 4 1.4 5.6.6 1.2 1 2.3 1.2 3.5l.5 3.4c.1.7.7 1.2 1.4 1.2.7 0 1.3-.5 1.4-1.2l.5-2.8c.1-.6.6-1 1.2-1h1.6c.6 0 1.1.4 1.2 1l.5 2.8c.1.7.7 1.2 1.4 1.2.7 0 1.3-.5 1.4-1.2l.5-3.4c.2-1.2.6-2.3 1.2-3.5.8-1.6 1.4-3.4 1.4-5.6 0-2-1.5-3.5-3.5-3.5-1.6 0-2.5.7-3.5 1.5-.6.5-1.4.5-2 0C9.5 4.2 8.6 3.5 7 3.5Z" />
    </svg>
  );
}
```

- [ ] **Step 2: Create `app/_components/icons/braces.tsx`**

```tsx
import type { SVGProps } from "react";

export default function BracesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 10c0-1 .8-1.8 1.8-1.8h14.4c1 0 1.8.8 1.8 1.8v4c0 1-.8 1.8-1.8 1.8H4.8C3.8 15.8 3 15 3 14v-4Z" />
      <path d="M3 12h18" />
      <path d="M7 8.2v7.6M11 8.2v7.6M13 8.2v7.6M17 8.2v7.6" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
```

- [ ] **Step 3: Create `app/_components/icons/implant.tsx`**

```tsx
import type { SVGProps } from "react";

export default function ImplantIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 3.5c-1.8 0-3 1.4-3 3 0 .9.2 1.7.5 2.5L9 14h6l2.5-5c.3-.8.5-1.6.5-2.5 0-1.6-1.2-3-3-3-1 0-1.7.4-2.4.9-.4.3-.9.3-1.3 0-.6-.5-1.4-.9-2.3-.9Z" />
      <path d="M10 14v2M14 14v2M9 16h6M10.5 18h3M11 20h2" />
    </svg>
  );
}
```

- [ ] **Step 4: Create `app/_components/icons/droplet.tsx`**

```tsx
import type { SVGProps } from "react";

export default function DropletIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3.5c-.6 0-1.1.3-1.4.8L6.5 11c-.7 1.2-1 2.5-1 3.8C5.5 18 8.4 21 12 21s6.5-3 6.5-6.2c0-1.3-.3-2.6-1-3.8L13.4 4.3c-.3-.5-.8-.8-1.4-.8Z" />
      <path d="M9 14.5c0 1.5 1.2 2.7 2.7 2.7" strokeOpacity="0.6" />
    </svg>
  );
}
```

- [ ] **Step 5: Create `app/_components/icons/baby-tooth.tsx`**

```tsx
import type { SVGProps } from "react";

export default function BabyToothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 5C6.3 5 5 6.3 5 8c0 1.7.5 3.1 1.1 4.4.5 1 .9 1.9 1 2.8l.4 2.6c.1.6.6 1 1.2 1 .6 0 1.1-.4 1.2-1l.4-2.2c.1-.5.5-.8 1-.8h1.4c.5 0 .9.3 1 .8l.4 2.2c.1.6.6 1 1.2 1 .6 0 1.1-.4 1.2-1l.4-2.6c.1-.9.5-1.8 1-2.8C18.5 11.1 19 9.7 19 8c0-1.7-1.3-3-3-3-1.2 0-1.9.5-2.6 1-.5.4-1.3.4-1.8 0C10.9 5.5 10.2 5 9 5h-1Z" />
      <circle cx="9.5" cy="10" r="0.7" fill="currentColor" />
      <circle cx="14.5" cy="10" r="0.7" fill="currentColor" />
      <path d="M10.5 12.5c.5.5 1.5.5 2 0" />
    </svg>
  );
}
```

- [ ] **Step 6: Create `app/_components/icons/shield-check.tsx`**

```tsx
import type { SVGProps } from "react";

export default function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3 4.5 6v6c0 4.5 3 7.5 7.5 9 4.5-1.5 7.5-4.5 7.5-9V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
```

- [ ] **Step 7: Lint**

Run:
```bash
npm run lint
```

Expected: no errors. (No build needed yet — the icons aren't imported anywhere.)

- [ ] **Checkpoint:** six dental icon components ready for use in data files and section components.

---

## Task 3: Data files

**Files:**
- Create: `data/services.ts`
- Create: `data/doctors.ts`
- Create: `data/reviews.ts`
- Create: `data/features.ts`
- Create: `data/contacts.ts`

The `data/` folder is at the project root (not inside `app/`). The `@/*` path alias from `tsconfig.json` resolves `@/data/services` → `./data/services.ts`.

- [ ] **Step 1: Create `data/services.ts`**

```ts
import type { ComponentType, SVGProps } from "react";
import ToothIcon from "@/app/_components/icons/tooth";
import ShieldCheckIcon from "@/app/_components/icons/shield-check";
import BracesIcon from "@/app/_components/icons/braces";
import ImplantIcon from "@/app/_components/icons/implant";
import DropletIcon from "@/app/_components/icons/droplet";
import BabyToothIcon from "@/app/_components/icons/baby-tooth";

export type Service = {
  id: string;
  name: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const services: Service[] = [
  {
    id: "therapy",
    name: "Лікування зубів",
    description: "Терапевтичне лікування карієсу та його ускладнень",
    Icon: ToothIcon,
  },
  {
    id: "hygiene",
    name: "Професійна гігієна",
    description: "Комплексне чищення та профілактика захворювань ясен",
    Icon: ShieldCheckIcon,
  },
  {
    id: "braces",
    name: "Брекети",
    description: "Вирівнювання прикусу та естетика вашої усмішки",
    Icon: BracesIcon,
  },
  {
    id: "implants",
    name: "Імплантація",
    description: "Відновлення зубів імплантами під ключ",
    Icon: ImplantIcon,
  },
  {
    id: "whitening",
    name: "Відбілювання",
    description: "Безпечне освітлення емалі та видалення пігментації",
    Icon: DropletIcon,
  },
  {
    id: "pediatric",
    name: "Дитяча стоматологія",
    description: "Турбота та безболісне лікування для найменших",
    Icon: BabyToothIcon,
  },
];
```

- [ ] **Step 2: Create `data/doctors.ts`**

```ts
export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  initials: string;
};

export const doctors: Doctor[] = [
  {
    id: "ploskyriv",
    name: "Іван Плоскирів",
    specialty: "Головний лікар, імплантолог",
    experienceYears: 12,
    initials: "ІП",
  },
  {
    id: "kovalchuk",
    name: "Ольга Ковальчук",
    specialty: "Терапевт, ендодонтист",
    experienceYears: 8,
    initials: "ОК",
  },
  {
    id: "melnyk",
    name: "Юлія Мельник",
    specialty: "Ортодонт",
    experienceYears: 7,
    initials: "ЮМ",
  },
  {
    id: "tkachuk",
    name: "Максим Ткачук",
    specialty: "Хірург, імплантолог",
    experienceYears: 10,
    initials: "МТ",
  },
];
```

- [ ] **Step 3: Create `data/reviews.ts`**

```ts
export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export const reviews: Review[] = [
  {
    id: "olena-m",
    name: "Олена М.",
    initials: "ОМ",
    rating: 5,
    text: "Дуже уважний персонал і професіонали своєї справи. Лікування пройшло комфортно і без болю. Рекомендую!",
  },
  {
    id: "andriy-k",
    name: "Андрій К.",
    initials: "АК",
    rating: 5,
    text: "Робив імплантацію у клініці Плоскирів. Все на найвищому рівні: від консультації до результату. Дякую!",
  },
  {
    id: "mariya-l",
    name: "Марія Л.",
    initials: "МЛ",
    rating: 5,
    text: "Чистка зубів пройшла ідеально! Лікар все пояснив і дав корисні рекомендації. Обов'язково повернусь ще.",
  },
  {
    id: "viktor-s",
    name: "Віктор С.",
    initials: "ВС",
    rating: 5,
    text: "Привів дитину на огляд — лікар знайшов підхід одразу. Жодних сліз, тільки усмішки після прийому.",
  },
  {
    id: "iryna-d",
    name: "Ірина Д.",
    initials: "ІД",
    rating: 5,
    text: "Поставила брекети тут пів року тому. Прогрес помітний, лікар Юлія завжди на зв'язку. Дякую команді!",
  },
];
```

- [ ] **Step 4: Create `data/features.ts`**

```ts
import type { ComponentType, SVGProps } from "react";
import ShieldCheckIcon from "@/app/_components/icons/shield-check";
import { Award, Microscope } from "lucide-react";

export type Feature = {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const heroFeatures: Feature[] = [
  { id: "modern", label: "Сучасне обладнання", Icon: Microscope },
  { id: "experience", label: "Досвід 10+ років", Icon: Award },
  { id: "warranty", label: "Гарантія на лікування", Icon: ShieldCheckIcon },
];

export const whyUsItems: { id: string; label: string }[] = [
  { id: "personal", label: "Індивідуальний підхід" },
  { id: "honest-prices", label: "Чесні ціни та гарантія" },
  { id: "sterile", label: "Стерильність та безпека" },
  { id: "team", label: "Команда професіоналів" },
  { id: "comfort", label: "Комфорт та турбота" },
];
```

Notes:
- `lucide-react`'s component types are compatible with `ComponentType<SVGProps<SVGSVGElement>>` for the prop spread we'll do; if TypeScript complains about a stricter union, change the type to `ComponentType<{ className?: string; "aria-hidden"?: boolean }>` and adjust call sites accordingly.

- [ ] **Step 5: Create `data/contacts.ts`**

```ts
export type Contacts = {
  address: { line1: string; line2: string; district: string };
  phone: string;
  phoneHref: string;
  hours: { weekdays: string; saturday: string };
  socials: { instagram: string; facebook: string };
  mapDirectionsHref: string;
};

export const contacts: Contacts = {
  address: {
    line1: "м. Хмельницький,",
    line2: "вул. Бажана, 19",
    district: "(р-н Заготзерно)",
  },
  phone: "+38 068 38 00 052",
  phoneHref: "tel:+380683800052",
  hours: {
    weekdays: "Пн–Пт: 9:00 – 18:00",
    saturday: "Сб: за домовленістю",
  },
  socials: {
    instagram: "#",
    facebook: "#",
  },
  mapDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("вул. Бажана 19, Хмельницький"),
};
```

Notes: social hrefs are intentionally `#` placeholders. The clinic supplies real URLs later.

- [ ] **Step 6: Lint**

Run:
```bash
npm run lint
```

Expected: no errors.

- [ ] **Checkpoint:** all data ready for consumption by section components.

---

## Task 4: Static SVG assets

**Files:**
- Create: `public/images/before-after.svg`
- Create: `public/images/map-placeholder.svg`

These are simple in-repo SVGs to avoid remote dependencies for the before/after composite and the map preview. They are placeholder-quality; the clinic replaces them with real assets later.

- [ ] **Step 1: Create `public/images/before-after.svg`**

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img">
  <title>До та після лікування</title>
  <defs>
    <linearGradient id="bgBefore" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F4D8C0"/>
      <stop offset="1" stop-color="#E2B58E"/>
    </linearGradient>
    <linearGradient id="bgAfter" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFE9D6"/>
      <stop offset="1" stop-color="#F5C9A1"/>
    </linearGradient>
    <radialGradient id="toothShadow" cx="0.5" cy="0.95" r="0.6">
      <stop offset="0" stop-color="#000" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="0" y="0" width="400" height="600" fill="url(#bgBefore)"/>
  <rect x="400" y="0" width="400" height="600" fill="url(#bgAfter)"/>
  <!-- before teeth (slight yellow tint, uneven) -->
  <g transform="translate(80,160)">
    <rect x="0" y="0" width="40" height="120" rx="10" fill="#EBD5A6"/>
    <rect x="50" y="-10" width="42" height="130" rx="10" fill="#E8CC95"/>
    <rect x="100" y="0" width="40" height="120" rx="10" fill="#E8CC95"/>
    <rect x="148" y="6" width="40" height="118" rx="10" fill="#EAD3A2"/>
    <rect x="196" y="-2" width="42" height="124" rx="10" fill="#E5C58A"/>
    <rect x="246" y="2" width="40" height="120" rx="10" fill="#EBD5A6"/>
  </g>
  <ellipse cx="200" cy="380" rx="170" ry="22" fill="url(#toothShadow)"/>
  <!-- after teeth (whiter, even) -->
  <g transform="translate(480,160)">
    <rect x="0" y="0" width="40" height="120" rx="10" fill="#FBF8F2"/>
    <rect x="48" y="0" width="42" height="120" rx="10" fill="#FFFFFF"/>
    <rect x="96" y="0" width="40" height="120" rx="10" fill="#FBF8F2"/>
    <rect x="142" y="0" width="40" height="120" rx="10" fill="#FFFFFF"/>
    <rect x="188" y="0" width="42" height="120" rx="10" fill="#FBF8F2"/>
    <rect x="238" y="0" width="40" height="120" rx="10" fill="#FFFFFF"/>
  </g>
  <ellipse cx="600" cy="380" rx="170" ry="22" fill="url(#toothShadow)"/>
</svg>
```

- [ ] **Step 2: Create `public/images/map-placeholder.svg`**

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" role="img">
  <title>Карта розташування</title>
  <rect x="0" y="0" width="800" height="400" fill="#EAEFE7"/>
  <!-- pale park polygon -->
  <path d="M40 40 L260 30 L300 180 L80 220 Z" fill="#D6E2CB"/>
  <!-- streets -->
  <g stroke="#FFFFFF" stroke-width="14" stroke-linecap="round">
    <line x1="0" y1="120" x2="800" y2="100"/>
    <line x1="0" y1="260" x2="800" y2="280"/>
    <line x1="180" y1="0" x2="220" y2="400"/>
    <line x1="540" y1="0" x2="500" y2="400"/>
  </g>
  <g stroke="#FFFFFF" stroke-width="6" stroke-linecap="round">
    <line x1="0" y1="60" x2="800" y2="50"/>
    <line x1="0" y1="340" x2="800" y2="360"/>
    <line x1="350" y1="0" x2="370" y2="400"/>
    <line x1="660" y1="0" x2="640" y2="400"/>
  </g>
  <!-- pin -->
  <g transform="translate(440,180)">
    <path d="M0 0 C-20 0 -36 16 -36 36 C-36 60 0 96 0 96 C0 96 36 60 36 36 C36 16 20 0 0 0 Z" fill="#C97B3F"/>
    <circle cx="0" cy="32" r="12" fill="#FFFFFF"/>
  </g>
</svg>
```

- [ ] **Step 3: Verify**

Run `npm run dev` and open both:
- http://localhost:3000/images/before-after.svg
- http://localhost:3000/images/map-placeholder.svg

Expected: each renders directly in the browser. The before/after shows two halves with two rows of "teeth" rectangles (yellower on left, whiter on right). The map shows a simple stylized street grid with an orange pin.

Stop the dev server.

- [ ] **Checkpoint:** local SVG assets ready.

---

## Task 5: Configure remote image patterns

**Files:**
- Modify: `next.config.ts`

We use two Unsplash images (hero team, clinic exterior). `next/image` requires whitelisting any external host via `images.remotePatterns`.

- [ ] **Step 1: Update `next.config.ts`**

Replace the entire file with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Checkpoint:** Unsplash images can now be loaded via `next/image`.

---

## Task 6: Header with mobile slide-down menu

**Files:**
- Create: `app/_components/header.tsx`
- Modify: `app/page.tsx`

The header is a single client component because it owns the mobile menu open/closed state. `useState` is used for that state plus a small `useEffect` to close on Escape key and on scroll.

- [ ] **Step 1: Create `app/_components/header.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { contacts } from "@/data/contacts";

const NAV_LINKS = [
  { href: "#services", label: "Послуги" },
  { href: "#about", label: "Про нас" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openScrollY = useRef(0);

  useEffect(() => {
    if (!menuOpen) return;
    openScrollY.current = window.scrollY;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openScrollY.current) > 200) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 py-3 md:max-w-6xl md:px-8">
        <Link href="#top" className="flex items-center gap-2" aria-label="Центр Плоскирів — на головну">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-surface text-sm font-bold">ЦП</span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide">ЦЕНТР ПЛОСКИРІВ</span>
            <span className="block text-xs text-ink-muted">стоматологія</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contacts.phoneHref}
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded"
            aria-label={`Зателефонувати ${contacts.phone}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {contacts.phone}
          </a>
          <Link
            href="#booking-form"
            className="hidden md:inline-flex items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-medium text-surface hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Записатися
          </Link>
          <a
            href={contacts.phoneHref}
            className="md:hidden grid h-11 w-11 place-items-center rounded-md text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={`Зателефонувати ${contacts.phone}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden grid h-11 w-11 place-items-center rounded-md text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-rule bg-surface">
          <nav className="mx-auto flex w-full max-w-md flex-col px-4 py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={handleLinkClick}
                className="block py-3 text-base text-ink border-b border-rule last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Mount header in `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <div className="mx-auto w-full max-w-md px-4 py-16 text-center md:max-w-6xl md:px-8">
          <p className="text-ink-muted">Sections coming next.</p>
        </div>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

Run `npm run dev`. At viewport 375px:
- Header sticks to top, has the orange "ЦП" badge, clinic name + "стоматологія", phone-icon button, hamburger.
- Nav links and the desktop phone+CTA are hidden.
- Tap hamburger: panel slides down below the header showing the 5 nav links stacked. Tap a link: panel closes, page smooth-scrolls (only the `#top` exists for now, so it stays at top).
- Press Escape while open: panel closes.

At viewport 1280px:
- Hamburger and the mobile phone-icon button are hidden.
- Nav links inline; phone number text + "Записатися" button visible on the right.

Stop the dev server.

- [ ] **Checkpoint:** header complete with sticky positioning, working mobile menu, desktop nav.

---

## Task 7: Hero section

**Files:**
- Create: `app/_components/hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/hero.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { heroFeatures } from "@/data/features";
import { contacts } from "@/data/contacts";

const HERO_IMAGE = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80";

export default function Hero() {
  return (
    <section aria-labelledby="hero-h1" className="bg-surface-alt">
      <div className="mx-auto w-full max-w-md px-4 pt-6 pb-10 md:max-w-6xl md:px-8 md:py-16 md:grid md:grid-cols-2 md:gap-10 md:items-center">
        <div>
          <span className="inline-block rounded-md bg-brand-tint px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-dark">
            Сучасна стоматологія у Хмельницькому
          </span>
          <h1 id="hero-h1" className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl md:leading-tight">
            Лікуємо зуби<br />з турботою про вас
          </h1>
          <p className="mt-4 text-ink-muted md:text-lg">
            Комплексний підхід, новітні технології та комфорт на кожному етапі лікування.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#booking-form"
              className="inline-flex h-12 items-center justify-center rounded-md bg-brand px-6 text-base font-medium text-surface hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Записатися на прийом
            </Link>
            <a
              href={contacts.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-rule bg-surface px-6 text-base font-medium text-ink hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Подзвонити
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-3 gap-3 md:mt-10 md:gap-6">
            {heroFeatures.map((f) => (
              <li key={f.id} className="flex flex-col items-start gap-2 text-xs text-ink-muted md:text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-tint text-brand">
                  <f.Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 md:mt-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-tint">
            <Image
              src={HERO_IMAGE}
              alt="Команда лікарів стоматології Центр Плоскирів"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

Notes:
- The Unsplash photo is a public dental scene. If the URL ever 404s, swap to another `images.unsplash.com/...` photo of similar subject.

- [ ] **Step 2: Wire hero into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors. Build output may warn on hero image dimensions; should not fail.

- [ ] **Step 4: Manual verification**

Run `npm run dev`. At 375px:
- Eyebrow chip appears with brand-tinted background.
- H1 reads "Лікуємо зуби з турботою про вас" with proper Cyrillic glyphs.
- Two CTAs stack vertically; "Записатися на прийом" is solid orange, "Подзвонити" is outlined with phone icon.
- Three feature badges in a row below: microscope, sparkles, shield-check icons in tinted circles, labels under each.
- Team photo loads below content in 4:3 rounded rectangle.
- Tap "Записатися на прийом" → page tries to scroll to `#booking-form` (won't exist yet — fine).
- Tap "Подзвонити" → opens phone dialer.

At 1280px:
- Two-column layout: text left, photo right.
- H1 is larger.

Stop the dev server.

- [ ] **Checkpoint:** hero section complete and visually correct on both viewports.

---

## Task 8: Services section

**Files:**
- Create: `app/_components/services.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/services.tsx`**

```tsx
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-h2" className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="services-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Наші послуги
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id} className="rounded-2xl border border-rule bg-surface p-5">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand">
                <s.Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

Note: no "Детальніше" link per the spec scope decision.

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

At 375px:
- "Наші послуги" centered heading with short orange underline.
- 6 cards stacked single-column. Each: tinted circle with dental icon top-left, name, description.
- Tap-friendly card padding.

At 1280px:
- Cards in 3 columns × 2 rows.

Stop the dev server.

- [ ] **Checkpoint:** services section live, dental icons render correctly.

---

## Task 9: Before/after slider

**Files:**
- Create: `app/_components/before-after.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/before-after.tsx`**

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const STEP = 5;
const HANDLE_RADIUS = 18;

export default function BeforeAfter() {
  const [x, setX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setX(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setX((v) => Math.max(0, v - STEP));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setX((v) => Math.min(100, v + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      setX(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setX(100);
    }
  };

  // Tap-anywhere-on-the-image to set divider position
  const onContainerPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).dataset.handle === "true") return;
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    return () => setDragging(false);
  }, []);

  return (
    <section aria-labelledby="ba-h2" className="bg-surface-alt py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="ba-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Результати, які говорять самі за себе
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <div
          ref={containerRef}
          onPointerDown={onContainerPointerDown}
          className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl bg-brand-tint select-none"
        >
          {/* before image (base layer, full width) */}
          <Image
            src="/images/before-after.svg"
            alt="Зуби до лікування"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover pointer-events-none"
            priority={false}
          />
          {/* after image (overlay, clipped from x% to 100%) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
            <Image
              src="/images/before-after.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover pointer-events-none"
              priority={false}
              aria-hidden="true"
            />
          </div>

          {/* divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-surface shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
            style={{ left: `${x}%`, transform: "translateX(-50%)" }}
            aria-hidden="true"
          />

          {/* handle */}
          <button
            type="button"
            data-handle="true"
            role="slider"
            aria-label="Розділювач до/після"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(x)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={onKeyDown}
            className="absolute top-1/2 grid h-9 w-9 place-items-center rounded-full bg-surface text-ink-muted shadow-md ring-1 ring-rule focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            style={{
              left: `${x}%`,
              transform: `translate(-${HANDLE_RADIUS}px, -${HANDLE_RADIUS}px)`,
              touchAction: "none",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* labels */}
          <span className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white">До</span>
          <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white">Після</span>
        </div>
      </div>
    </section>
  );
}
```

Notes:
- The "before" and "after" images here are the same SVG; the SVG is itself a side-by-side composite, so the clip-path effect produces a credible left/right reveal. Replacing with two distinct photos later requires only swapping the two `src` values.
- `touchAction: "none"` on the handle prevents the browser from intercepting drag for scroll on mobile.

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

At 375px:
- "Результати..." heading with underline.
- Image renders showing both halves of the composite. Vertical divider at horizontal center with a circular handle.
- Drag the handle left/right with mouse: divider follows.
- Tap-and-drag on touch devices: works (use Chrome's "responsive" mode + finger emulation, or test on a real phone).
- Tap-and-hold anywhere else on the image: divider jumps to that position.
- Tab to focus handle (visible focus ring), then ArrowLeft/Right move it 5%.
- "До" and "Після" labels at bottom-left/right.

Stop the dev server.

- [ ] **Checkpoint:** before/after slider draggable and keyboard-accessible.

---

## Task 10: Why-us section

**Files:**
- Create: `app/_components/why-us.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/why-us.tsx`**

```tsx
import { Check } from "lucide-react";
import { whyUsItems } from "@/data/features";

export default function WhyUs() {
  return (
    <section id="about" aria-labelledby="why-h2" className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="why-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Чому обирають нас
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <ul className="mx-auto mt-8 max-w-3xl grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {whyUsItems.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl bg-surface p-4 ring-1 ring-rule">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-surface">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm text-ink md:text-base">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

At 375px: 5 list items in single column, each with orange circle ✓ icon and label. At 1280px: two columns. All five items use ✓ (no ✗).

Stop the dev server.

- [ ] **Checkpoint:** why-us section complete with consistent checkmarks.

---

## Task 11: Reviews section (carousel + dot indicators)

**Files:**
- Create: `app/_components/reviews.tsx`
- Create: `app/_components/reviews-dots.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/reviews-dots.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function ReviewsDots({ count, trackId }: { count: number; trackId: string }) {
  const [active, setActive] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    if (cards.length === 0) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );
    cards.forEach((c) => observer.current?.observe(c));
    return () => observer.current?.disconnect();
  }, [trackId]);

  const goTo = (i: number) => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="mt-4 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Гортати відгуки">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Відгук ${i + 1}`}
          onClick={() => goTo(i)}
          className={
            "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand " +
            (i === active ? "w-6 bg-brand" : "w-2 bg-rule")
          }
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/_components/reviews.tsx`**

```tsx
import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import ReviewsDots from "./reviews-dots";

const TRACK_ID = "reviews-track";

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-h2" className="bg-surface-alt py-12 md:py-20">
      <div className="mx-auto w-full max-w-md md:max-w-6xl md:px-8">
        <h2 id="reviews-h2" className="px-4 text-center text-2xl font-semibold text-ink md:text-3xl md:px-0">
          Відгуки пацієнтів
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        {/* Mobile carousel */}
        <ul
          id={TRACK_ID}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((r) => (
            <li key={r.id} data-card className="snap-center shrink-0 w-[85%]">
              <article className="h-full rounded-2xl bg-surface p-5 ring-1 ring-rule">
                <div className="flex items-center gap-1 text-brand" aria-label={`Оцінка ${r.rating} з 5`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-brand-dark">
                    {r.initials}
                  </span>
                  <span className="text-sm font-medium text-ink">{r.name}</span>
                </div>
                <p className="mt-3 text-sm text-ink-muted">{r.text}</p>
              </article>
            </li>
          ))}
        </ul>
        <ReviewsDots count={reviews.length} trackId={TRACK_ID} />

        {/* Desktop grid */}
        <ul className="mt-8 hidden grid-cols-3 gap-6 md:grid">
          {reviews.slice(0, 3).map((r) => (
            <li key={r.id}>
              <article className="h-full rounded-2xl bg-surface p-5 ring-1 ring-rule">
                <div className="flex items-center gap-1 text-brand" aria-label={`Оцінка ${r.rating} з 5`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-brand-dark">
                    {r.initials}
                  </span>
                  <span className="text-sm font-medium text-ink">{r.name}</span>
                </div>
                <p className="mt-3 text-sm text-ink-muted">{r.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

Note: this duplicates the card markup once for mobile carousel and once for desktop grid. The duplication is minor (single card template) and avoids passing data through extra wrappers. If it grows, extract a `ReviewCard` subcomponent.

- [ ] **Step 3: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 5: Manual verification**

At 375px:
- Heading "Відгуки пацієнтів" + underline.
- Horizontally swipeable cards visible — first card centered, peek of second on right.
- Swipe left/right: smooth momentum, snaps to next card.
- Dots below: 5 dots, the active one is wider/orange.
- Tap a dot: scrolls to that card.

At 1280px: 3 review cards in a row, no carousel, no dots.

Stop the dev server.

- [ ] **Checkpoint:** reviews carousel works on mobile, grid on desktop.

---

## Task 12: Doctors section

**Files:**
- Create: `app/_components/doctors.tsx`
- Create: `app/_components/doctors-dots.tsx`
- Modify: `app/page.tsx`

The doctors-dots component is structurally identical to reviews-dots but bound to a different track ID. We duplicate intentionally — the alternative (a generic component) needs prop drilling and abstracts away the small markup differences.

- [ ] **Step 1: Create `app/_components/doctors-dots.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function DoctorsDots({ count, trackId }: { count: number; trackId: string }) {
  const [active, setActive] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
    if (cards.length === 0) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );
    cards.forEach((c) => observer.current?.observe(c));
    return () => observer.current?.disconnect();
  }, [trackId]);

  const goTo = (i: number) => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (!card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="mt-4 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Гортати лікарів">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === active}
          aria-label={`Лікар ${i + 1}`}
          onClick={() => goTo(i)}
          className={
            "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand " +
            (i === active ? "w-6 bg-brand" : "w-2 bg-rule")
          }
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `app/_components/doctors.tsx`**

```tsx
import { doctors } from "@/data/doctors";
import DoctorsDots from "./doctors-dots";

const TRACK_ID = "doctors-track";

function pluralizeYears(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} рік`;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} роки`;
  return `${n} років`;
}

function DoctorCard({ d }: { d: (typeof doctors)[number] }) {
  return (
    <article className="h-full overflow-hidden rounded-2xl bg-surface ring-1 ring-rule">
      <div className="aspect-[4/5] grid place-items-center bg-brand-tint">
        <span className="text-3xl font-semibold text-brand-dark">{d.initials}</span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-ink">{d.name}</h3>
        <p className="mt-1 text-sm text-ink-muted">{d.specialty}</p>
        <p className="mt-2 text-xs text-ink-muted">Досвід {pluralizeYears(d.experienceYears)}</p>
      </div>
    </article>
  );
}

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-h2" className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-md md:max-w-6xl md:px-8">
        <h2 id="doctors-h2" className="px-4 text-center text-2xl font-semibold text-ink md:text-3xl md:px-0">
          Наші лікарі
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        {/* Mobile carousel */}
        <ul
          id={TRACK_ID}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {doctors.map((d) => (
            <li key={d.id} data-card className="snap-center shrink-0 w-[80%]">
              <DoctorCard d={d} />
            </li>
          ))}
        </ul>
        <DoctorsDots count={doctors.length} trackId={TRACK_ID} />

        {/* Desktop grid */}
        <ul className="mt-8 hidden grid-cols-4 gap-6 md:grid">
          {doctors.map((d) => (
            <li key={d.id}>
              <DoctorCard d={d} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

Note: `pluralizeYears` is a small helper for Ukrainian noun pluralization with numbers (1 рік, 2-4 роки, 5+ років, with edge cases at 11-14). Keeping it inline rather than in a util module.

- [ ] **Step 3: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";
import Doctors from "./_components/doctors";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
        <Doctors />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 5: Manual verification**

At 375px: heading + underline; 4 doctor cards swipeable. Each card: tinted square with initials (e.g. "ІП"), name, specialty, "Досвід 12 років". Dots track active card.

At 1280px: 4 doctors in a single row.

Verify Ukrainian pluralization: 7 → "Досвід 7 років", 8 → "Досвід 8 років", 10 → "Досвід 10 років", 12 → "Досвід 12 років" (per data: 12, 8, 7, 10).

Stop the dev server.

- [ ] **Checkpoint:** doctors section live with carousel + correct pluralization.

---

## Task 13: Booking form + server action

**Files:**
- Create: `app/_actions/booking.ts`
- Create: `app/_components/booking-form.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_actions/booking.ts`**

```ts
"use server";

import { headers } from "next/headers";

export type BookingResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: { name?: string; phone?: string }; values?: { name: string; phone: string } };

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const submissions = new Map<string, number[]>();

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function validate(name: string, phone: string): { name?: string; phone?: string } {
  const errors: { name?: string; phone?: string } = {};
  if (name.trim().length < 2) errors.name = "Введіть ім'я (мін. 2 символи)";
  const digits = digitsOnly(phone);
  if (digits.length !== 10 && digits.length !== 12) {
    errors.phone = "Введіть телефон (наприклад, 068 123 4567)";
  }
  return errors;
}

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

export async function submitBooking(
  _prev: BookingResult | null,
  formData: FormData
): Promise<BookingResult> {
  const name = String(formData.get("name") ?? "");
  const phone = String(formData.get("phone") ?? "");

  const fieldErrors = validate(name, phone);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Перевірте поля форми",
      fieldErrors,
      values: { name, phone },
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return {
      ok: false,
      error: "Забагато спроб. Спробуйте за кілька хвилин.",
      values: { name, phone },
    };
  }

  // TODO: wire delivery (email or Telegram) when credentials are provided.
  console.log("[booking]", {
    ts: new Date().toISOString(),
    name: name.trim(),
    phone: digitsOnly(phone),
  });

  return { ok: true };
}
```

- [ ] **Step 2: Create `app/_components/booking-form.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { submitBooking, type BookingResult } from "../_actions/booking";

export default function BookingForm() {
  const [state, formAction, pending] = useActionState<BookingResult | null, FormData>(submitBooking, null);

  if (state?.ok) {
    return (
      <div className="rounded-2xl bg-surface p-6 text-center text-ink shadow-sm">
        <p className="text-lg font-semibold">Дякуємо!</p>
        <p className="mt-2 text-sm text-ink-muted">Ми зв'яжемося з вами найближчим часом.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-rule bg-surface px-4 text-sm font-medium text-ink hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  const nameError = state && !state.ok ? state.fieldErrors?.name : undefined;
  const phoneError = state && !state.ok ? state.fieldErrors?.phone : undefined;
  const generalError = state && !state.ok ? state.error : undefined;
  const initialName = state && !state.ok ? state.values?.name ?? "" : "";
  const initialPhone = state && !state.ok ? state.values?.phone ?? "" : "";

  return (
    <form action={formAction} className="grid gap-3" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Ваше ім'я
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          defaultValue={initialName}
          aria-invalid={Boolean(nameError) || undefined}
          aria-describedby={nameError ? "name-error" : undefined}
          className="mt-1 block h-12 w-full rounded-md border border-rule bg-surface px-3 text-base text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          placeholder="Олена"
        />
        {nameError && (
          <p id="name-error" className="mt-1 text-sm text-red-700">
            {nameError}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          defaultValue={initialPhone}
          aria-invalid={Boolean(phoneError) || undefined}
          aria-describedby={phoneError ? "phone-error" : undefined}
          className="mt-1 block h-12 w-full rounded-md border border-rule bg-surface px-3 text-base text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          placeholder="+380 68 123 4567"
        />
        {phoneError && (
          <p id="phone-error" className="mt-1 text-sm text-red-700">
            {phoneError}
          </p>
        )}
      </div>
      {generalError && !nameError && !phoneError && (
        <p className="text-sm text-red-700" role="alert">
          {generalError}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-md bg-brand px-6 text-base font-medium text-surface hover:bg-brand-dark disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {pending ? "Надсилаємо..." : "Записатися"}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Add a wrapper section + wire into `app/page.tsx`**

Replace the entire `app/page.tsx` file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";
import Doctors from "./_components/doctors";
import BookingForm from "./_components/booking-form";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
        <Doctors />

        <section
          id="booking-form"
          aria-labelledby="booking-h2"
          className="bg-brand py-12 text-surface md:py-20"
        >
          <div className="mx-auto w-full max-w-md px-4 md:max-w-3xl md:px-8 md:text-center">
            <h2 id="booking-h2" className="text-2xl font-semibold md:text-3xl">
              Запишіться на прийом вже сьогодні!
            </h2>
            <p className="mt-2 text-sm text-surface/85 md:text-base">
              Залиште заявку і ми зв'яжемося з вами найближчим часом
            </p>
            <div className="mx-auto mt-6 max-w-md text-left">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
```

- [ ] **Step 4: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors. The build picks up the server action in the route.

- [ ] **Step 5: Manual verification**

At 375px, scroll to the orange "Запишіться на прийом" band:
- Heading + subhead, name + phone inputs (with visible labels), "Записатися" button.
- Submit empty: button briefly says "Надсилаємо...", form returns with red "Введіть ім'я..." and "Введіть телефон..." messages.
- Type valid name (≥2 chars) and a valid phone (e.g. `0681234567` or `+380 68 123 4567`), submit.
- Form replaced by "Дякуємо! Ми зв'яжемося з вами найближчим часом." card with "Надіслати ще одну заявку" button.
- Click that button: page reloads, form is back.
- In the dev server terminal, the `[booking] {...}` log line appeared with name and digits-only phone.

Stop the dev server.

- [ ] **Checkpoint:** booking form validates client- and server-side, server action logs valid submissions, success state shows correctly.

---

## Task 14: Contacts section

**Files:**
- Create: `app/_components/contacts.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/contacts.tsx`**

```tsx
import Image from "next/image";
import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";

const EXTERIOR_IMAGE = "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1200&q=80";

export default function Contacts() {
  return (
    <section id="contacts" aria-labelledby="contacts-h2" className="bg-surface-alt py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="contacts-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Контакти
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-2xl bg-surface p-5 ring-1 ring-rule">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-tint text-brand">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Наша адреса</p>
                <p className="mt-1 text-sm text-ink-muted">
                  {contacts.address.line1}
                  <br />
                  {contacts.address.line2}
                  <br />
                  {contacts.address.district}
                </p>
              </div>
            </div>
            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src="/images/map-placeholder.svg"
                alt="Карта розташування клініки"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-4 md:gap-6">
            <div className="rounded-2xl bg-surface p-5 ring-1 ring-rule">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-tint text-brand">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Телефон</p>
                  <a href={contacts.phoneHref} className="mt-1 block text-sm text-ink-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
                    {contacts.phone}
                  </a>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-brand-tint text-brand">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-ink-muted">{contacts.hours.weekdays}</p>
                  <p className="text-sm text-ink-muted">{contacts.hours.saturday}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-5 ring-1 ring-rule">
              <p className="text-sm font-medium text-ink">Соціальні мережі</p>
              <div className="mt-3 flex gap-3">
                <a
                  href={contacts.socials.instagram}
                  className="grid h-10 w-10 place-items-center rounded-md bg-brand-tint text-brand hover:bg-brand-tint-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Instagram"
                  rel="noopener"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={contacts.socials.facebook}
                  className="grid h-10 w-10 place-items-center rounded-md bg-brand-tint text-brand hover:bg-brand-tint-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Facebook"
                  rel="noopener"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-5 ring-1 ring-rule">
              <p className="text-sm font-medium text-ink">Як нас знайти</p>
              <p className="mt-1 text-sm text-ink-muted">Зручне розташування та паркування для наших пацієнтів</p>
              <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src={EXTERIOR_IMAGE}
                  alt="Будівля клініки зовні"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <a
          href={contacts.mapDirectionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-brand px-6 text-base font-medium text-surface hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Прокласти маршрут
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";
import Doctors from "./_components/doctors";
import BookingForm from "./_components/booking-form";
import Contacts from "./_components/contacts";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
        <Doctors />

        <section
          id="booking-form"
          aria-labelledby="booking-h2"
          className="bg-brand py-12 text-surface md:py-20"
        >
          <div className="mx-auto w-full max-w-md px-4 md:max-w-3xl md:px-8 md:text-center">
            <h2 id="booking-h2" className="text-2xl font-semibold md:text-3xl">
              Запишіться на прийом вже сьогодні!
            </h2>
            <p className="mt-2 text-sm text-surface/85 md:text-base">
              Залиште заявку і ми зв'яжемося з вами найближчим часом
            </p>
            <div className="mx-auto mt-6 max-w-md text-left">
              <BookingForm />
            </div>
          </div>
        </section>

        <Contacts />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

At 375px:
- "Контакти" heading.
- Address card with map placeholder image.
- Phone card (tap → dialer) with hours.
- Socials card with two icon buttons (`#` placeholders — clicking does nothing harmful).
- "Як нас знайти" card with the clinic-exterior Unsplash photo + short text.
- Full-width orange "Прокласти маршрут" button. Tap → opens new tab to Google Maps with destination preset.

At 1280px: address on the left, the right column is a stack of phone+hours, socials, "Як нас знайти".

Stop the dev server.

- [ ] **Checkpoint:** contacts complete, all links functional.

---

## Task 15: Footer

**Files:**
- Create: `app/_components/footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/_components/footer.tsx`**

```tsx
import Link from "next/link";

const FOOTER_NAV = [
  [
    { href: "#services", label: "Послуги" },
    { href: "#about", label: "Про нас" },
    { href: "#doctors", label: "Лікарі" },
  ],
  [
    { href: "#reviews", label: "Відгуки" },
    { href: "#contacts", label: "Контакти" },
  ],
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto w-full max-w-md px-4 py-10 text-center md:max-w-6xl md:px-8">
        <div className="flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-surface text-sm font-bold">ЦП</span>
          <span className="leading-tight text-left">
            <span className="block text-sm font-semibold tracking-wide">ЦЕНТР ПЛОСКИРІВ</span>
            <span className="block text-xs text-ink-muted">стоматологія</span>
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
          Лікуємо зуби з турботою про вас і вашу усмішку
        </p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink">
          {FOOTER_NAV.flat().map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 text-xs text-ink-muted">
          <a href="#" className="hover:text-brand">
            Політика конфіденційності
          </a>
          <span className="mx-2">·</span>
          <span>© 2026 Центр Плоскирів. Усі права захищені.</span>
        </div>
      </div>
    </footer>
  );
}
```

Notes:
- "Політика конфіденційності" `href="#"` is a known stub — no privacy page exists per scope.

- [ ] **Step 2: Wire into `app/page.tsx`**

Replace the entire file with:

```tsx
import Header from "./_components/header";
import Hero from "./_components/hero";
import Services from "./_components/services";
import BeforeAfter from "./_components/before-after";
import WhyUs from "./_components/why-us";
import Reviews from "./_components/reviews";
import Doctors from "./_components/doctors";
import BookingForm from "./_components/booking-form";
import Contacts from "./_components/contacts";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className="flex-1">
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
        <Doctors />

        <section
          id="booking-form"
          aria-labelledby="booking-h2"
          className="bg-brand py-12 text-surface md:py-20"
        >
          <div className="mx-auto w-full max-w-md px-4 md:max-w-3xl md:px-8 md:text-center">
            <h2 id="booking-h2" className="text-2xl font-semibold md:text-3xl">
              Запишіться на прийом вже сьогодні!
            </h2>
            <p className="mt-2 text-sm text-surface/85 md:text-base">
              Залиште заявку і ми зв'яжемося з вами найближчим часом
            </p>
            <div className="mx-auto mt-6 max-w-md text-left">
              <BookingForm />
            </div>
          </div>
        </section>

        <Contacts />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Lint and build**

Run:
```bash
npm run lint && npm run build
```

Expected: no errors.

- [ ] **Step 4: Manual verification**

Footer renders at the bottom on both viewports. Logo + name centered, tagline, nav links wrapped, "Політика конфіденційності · © 2026...".

Stop the dev server.

- [ ] **Checkpoint:** all sections of the page complete.

---

## Task 16: Final pass — accessibility, responsive, full smoke test

**Files:**
- (Possibly tweaks to any file based on findings; no scheduled changes)

This task verifies the whole page end-to-end and fixes anything missed in earlier tasks.

- [ ] **Step 1: Production build**

Run:
```bash
npm run lint && npm run build && npm run start
```

Expected: build succeeds, `npm run start` boots the production server on http://localhost:3000.

- [ ] **Step 2: Mobile smoke test (Chrome devtools, 375 × 812 viewport)**

Open http://localhost:3000 and verify, top to bottom:
- Header sticks while scrolling.
- Hamburger opens the slide-down panel.
- Tap a nav link in the panel: panel closes, page smooth-scrolls to that section.
- Hero CTAs work; "Записатися на прийом" scrolls to the form section.
- Service cards stack single-column with dental icons.
- Before/after slider drags smoothly with mouse and touch (use device-emulation mode for touch); arrow keys move handle.
- Why-us list shows 5 items, all with checkmarks.
- Reviews carousel: swipe through all 5; dot indicator updates as the active card centers.
- Doctors carousel: swipe through 4; pluralization correct.
- Booking form: empty submit shows two field errors; valid submit shows thank-you card; "Надіслати ще одну заявку" reload works.
- Contacts: tap phone link, "Прокласти маршрут" opens Google Maps in a new tab.
- Footer renders, all links navigate to their anchors.

- [ ] **Step 3: Desktop smoke test (1280 × 800 viewport)**

Same as above, but verify the multi-column layouts:
- Header: nav inline, phone + "Записатися" button on the right.
- Hero: text on left, photo on right, badges in a row.
- Services: 3-column grid.
- Why-us: 2-column grid.
- Reviews: 3 cards in a row, no carousel, no dots.
- Doctors: 4 cards in a row, no carousel, no dots.
- Contacts: address with map on the left; phone/hours, socials, "Як нас знайти" stacked on the right.

- [ ] **Step 4: Keyboard navigation**

Press Tab from the top of the page. Verify:
- Every interactive element is reachable in source order.
- Each focused element shows a visible orange focus ring.
- Skip the before/after handle: arrow keys move the divider; Home/End jump to 0/100.
- Form inputs and submit button focus correctly.

- [ ] **Step 5: Screen reader spot-check**

Using macOS VoiceOver (Cmd+F5) or Chrome's ARIA inspector, verify:
- Each major section announces its heading.
- Slider handle reads "Розділювач до/після, slider, 50".
- Star rating announces "Оцінка 5 з 5".
- Form fields announce their labels (not just placeholders).

If any element fails, fix it inline and re-run lint/build.

- [ ] **Step 6: Reduced motion**

In Chrome devtools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`" → "reduce". Reload. Verify:
- Smooth scroll is replaced by jump on anchor click.
- Dot-indicator clicks scroll without animation.

- [ ] **Step 7: Production rate-limit check (optional)**

`npm run build && NODE_ENV=production npm run start`. Submit the form 4 times in 10 minutes from the same browser tab. The 4th submission should return "Забагато спроб. Спробуйте за кілька хвилин." Stop the server. (In dev mode this branch is intentionally inert.)

- [ ] **Step 8: Final lint and build**

Run one last time:
```bash
npm run lint && npm run build
```

Expected: no warnings about unused imports, no type errors, no Next.js build warnings about images, fonts, or metadata.

- [ ] **Checkpoint:** site is feature-complete, accessible, responsive, and production-buildable. Ship-ready pending real photographs, social URLs, and form-delivery wiring.

---

## Spec coverage map

For each spec section, the implementing task(s):

| Spec section | Tasks |
| --- | --- |
| Goal: single-page Ukrainian site | All |
| Hardcoded TS data | 3 |
| Stubbed booking form + server action | 13 |
| Mobile slide-down menu | 6 |
| Draggable before/after slider | 9 |
| Scroll-snap carousels (reviews + doctors) | 11, 12 |
| Tailwind 4 brand tokens | 1 |
| Onest font with Cyrillic | 1 |
| `next/image` for photos + remotePatterns | 5, 7, 14 |
| Custom dental SVG icons | 2 |
| `lucide-react` for generic icons | 0, plus consumers |
| In-repo before-after.svg + map-placeholder.svg | 4 |
| Header (sticky, mobile + desktop) | 6 |
| Hero | 7 |
| Services (6 cards, 1/2/3 cols responsive) | 8 |
| Before/after | 9 |
| Why us (5 items, all checkmarks) | 10 |
| Reviews | 11 |
| Doctors (with Ukrainian pluralization) | 12 |
| Booking form (success/error states) | 13 |
| Contacts (address, phone, hours, socials, map, exterior) | 14 |
| Footer | 15 |
| Accessibility baseline | Built into each section + verified in 16 |
| Production build clean | 16 |
| Manual verification | 16 |

No spec items left without an implementing task.

---

## What's intentionally omitted

- Git commits — environment forbids `git` commands. Add commits later.
- Automated tests — out of scope per spec.
- Real form delivery — `// TODO: wire delivery` marker in `app/_actions/booking.ts`.
- Real photos and social URLs — placeholders documented in spec "Open questions" section.
