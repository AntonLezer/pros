# Dental Clinic Landing Page — Design Spec

**Date:** 2026-05-04
**Project:** Центр Плоскирів — single-page marketing site for a dental clinic in Khmelnytskyi.
**Stack:** Next.js 16.2.4, React 19.2.4, Tailwind CSS 4, TypeScript 5.

## Goal

Build a complete single-page Ukrainian-language marketing site for a dental clinic, mobile-primary, based on two provided mockups. The mobile mockup is the source of truth; desktop is a sensible responsive expansion above the `md` breakpoint, not a pixel-faithful match of the desktop mockup.

## Scope

### In scope
- Single landing page (`/`) with all sections rendered top-to-bottom.
- Hardcoded content in TypeScript modules (`data/*.ts`).
- Stubbed booking form: server action validates and logs; real delivery (email/Telegram) wired later.
- Interactive: mobile slide-down menu, draggable before/after slider, scroll-snap carousels for reviews and doctors, form submit with success/error states.
- Tailwind 4 brand tokens, Onest font with Cyrillic, `next/image` for photos, custom SVG icons for dental, lucide-react for generic.
- Accessibility baseline: semantic landmarks, focus-visible rings, alt text, reduced-motion respect.
- Production build must pass `npm run build` and `npm run lint` cleanly.

### Out of scope
- Detail pages (`/services/[slug]`, `/doctors/[slug]`, `/cases`, `/prices`, `/privacy`).
- CMS or external content source.
- Pricing display anywhere.
- Real form delivery (email, Telegram, etc.).
- "Детальніше" links/buttons on cards.
- "Усі відгуки" CTA.
- Dark mode.
- Automated tests (manual visual verification only for this build).
- Analytics, SEO beyond basic metadata, sitemaps.

## Decisions log (from brainstorming)

- Single landing page, no detail pages.
- Hardcoded TS data.
- Booking form: stubbed server action with success/error UI.
- Mobile-primary; responsive expansion above `md` (768px).
- Homepage before/after slider only.
- Imagery: Unsplash for hero / clinic-exterior; in-repo SVG for before/after composite and map placeholder; initial-circle avatars for doctors and reviewers.
- Icons: lucide-react for generic; custom SVG for dental (tooth, braces, implant, droplet, baby-tooth, shield-check).
- No prices, drop "Ціни" from nav.
- Hamburger opens slide-down panel from header.
- Font: Onest (latin + cyrillic).
- Map: static placeholder image + "Прокласти маршрут" links to Google Maps.
- Social links: stubbed `#` hrefs.
- Rate limit on booking form: implemented but only active in production (`NODE_ENV === 'production'`).

## File layout

```
app/
  layout.tsx              Onest font, root metadata
  page.tsx                Composes sections in order
  globals.css             Tailwind 4 + brand tokens
  _actions/
    booking.ts            "use server" — validates, logs, returns ok/error
  _components/
    header.tsx            Logo + nav + CTA + hamburger (client)
    hero.tsx              Eyebrow + H1 + CTAs + features + team photo
    services.tsx          6 service cards
    before-after.tsx      Draggable slider (client)
    why-us.tsx            Checkmark list
    reviews.tsx           Scroll-snap carousel (client for dot indicators)
    doctors.tsx           Scroll-snap carousel (client for dot indicators)
    booking-form.tsx      Name + phone + submit (client)
    contacts.tsx          Address, phone, hours, socials, map, exterior
    footer.tsx            Logo, nav repeat, copyright
    icons/
      tooth.tsx
      braces.tsx
      implant.tsx
      droplet.tsx
      baby-tooth.tsx
      shield-check.tsx
data/
  services.ts             Service[]
  doctors.ts              Doctor[]
  reviews.ts              Review[]
  features.ts             Feature[]
  contacts.ts             Contacts
public/
  images/
    before-after.svg      In-repo composite (no remote dependency)
    map-placeholder.svg   In-repo neutral street grid + brand pin
    # Hero team photo and clinic-exterior photo are loaded remotely from
    # Unsplash via next/image with images.remotePatterns whitelisting.
```

`_components/` and `_actions/` use the underscore prefix so the App Router treats them as private and never tries to make them routes.

## Data shapes

```ts
import type { ComponentType, SVGProps } from "react";

export type Service = {
  id: string;
  name: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  initials: string;
};

export type Review = {
  id: string;
  name: string;
  initials: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

export type Feature = {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type Contacts = {
  address: { line1: string; line2: string; district: string };
  phone: string;
  phoneHref: string; // tel:+380...
  hours: { weekdays: string; saturday: string };
  socials: { instagram: string; facebook: string };
  mapDirectionsHref: string;
};
```

## Page sections

In rendering order, top to bottom. Each is one component in `app/_components/`.

### 1. Header (sticky)
- Mobile: logo + clinic name (left), inline phone-icon button + hamburger button (right).
- ≥md: nav links (Послуги, Про нас, Лікарі, Відгуки, Контакти) inline, phone number with icon, "Записатися" button (primary).
- Smooth-scroll behavior on anchor links via `html { scroll-behavior: smooth }` (gated by `@media (prefers-reduced-motion: no-preference)`).
- Sticky on scroll with subtle bottom border.

### 2. Hero (`#top`)
- Eyebrow chip "СУЧАСНА СТОМАТОЛОГІЯ У ХМЕЛЬНИЦЬКОМУ" (uppercase, brand-tint background).
- H1 "Лікуємо зуби з турботою про вас".
- Subhead paragraph.
- Two CTAs: "Записатися на прийом" (primary, brand color, links to `#booking-form`) and "Подзвонити" (outlined, phone icon, `tel:` link).
- Three feature badges row: icon + label.
- Team photo full-width below ≤md, right-side ≥md.

### 3. Services (`#services`)
- H2 "Наші послуги".
- 6 cards. Each: dental icon top-left in brand-tint circle, name, 2-line description.
- Mobile: 1 column. ≥sm: 2. ≥lg: 3.

### 4. Before/After
- H2 "Результати, які говорять самі за себе".
- One image with vertical draggable divider. Initial position 50%. Labels "До" (bottom-left) and "Після" (bottom-right).
- No "Переглянути кейси" CTA.

### 5. Why us (`#about`)
- H2 "Чому обирають нас".
- Checkmark bullet list (5 items): "Індивідуальний підхід", "Чесні ціни та гарантія", "Стерильність та безпека", "Команда професіоналів", "Комфорт та турбота".
- Orange circle ✓ icons consistently (mockup shows ✗ on one — fix to ✓).
- Mobile: single column. ≥md: two columns.

### 6. Reviews (`#reviews`)
- H2 "Відгуки пацієнтів".
- Scroll-snap horizontal carousel of review cards (mobile). Each: 5-star row, initial-circle avatar + name, review text.
- Dot indicators below.
- ≥md: 3 cards visible in a row, no carousel.

### 7. Doctors (`#doctors`)
- H2 "Наші лікарі".
- Scroll-snap horizontal carousel on mobile. Each card: portrait or initial-circle, name, specialty, experience.
- Dot indicators below.
- ≥md: 4 cards in a row.

### 8. Booking form (`#booking-form`)
- Brand-orange-tinted band.
- H2 "Запишіться на прийом вже сьогодні!".
- Subhead paragraph.
- Inputs: name (text), phone (tel).
- Submit button "Записатися".
- On success: replace form with thank-you card and "Надіслати ще одну заявку" reset link.
- On error: red error message above submit; preserve input values.

### 9. Contacts (`#contacts`)
- H2 "Контакти".
- Stacked cards on mobile:
  - Адреса with map placeholder image.
  - Телефон (tel: link), Hours.
  - Соціальні мережі (Instagram, Facebook icons).
  - Як нас знайти with clinic-exterior photo and short description.
- Full-width "Прокласти маршрут" button at the bottom of the section.
- ≥md: address card, hours/phone card, and "Як нас знайти" arranged in a sensible multi-column layout.

### 10. Footer
- Centered logo + clinic name.
- Tagline.
- Nav links (anchors).
- "Політика конфіденційності" — present visually but `href="#"` (no privacy page exists; flag in code).
- Copyright "© 2026 Центр Плоскирів. Усі права захищені."

## Interactive components

### Mobile menu (`header.tsx`)
- `"use client"` for menu open/closed state.
- Hamburger toggles slide-down panel anchored under the header bar.
- Panel contains nav links stacked vertically.
- Closes on: link tap, Escape, scroll past 200px from menu-open position.
- Body scroll is NOT locked.

### Before/after slider (`before-after.tsx`)
- `"use client"`. Uses `useState` for divider X position (0–100), pointer + touch handlers.
- Container: fixed aspect ratio (e.g. `aspect-[4/3]`), `position: relative`.
- Two layered images: "before" rendered as the base layer, "after" rendered on top and masked with inline `style={{ clipPath: \`inset(0 0 0 ${x}%)\` }}` so only the right portion (from X% to 100%) of the "after" image is visible. Result: dragging the handle right reveals more of the "after".
- Vertical divider line + circular drag handle positioned at `left: ${x}%`.
- Pointer and touch events on the handle update X. Container clamps X to [0, 100].
- Keyboard: handle is a `<button role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={x}>` with `onKeyDown` for ArrowLeft/Right (±5).
- "До" / "Після" labels are absolutely positioned, always visible.

### Scroll-snap carousels (`reviews.tsx`, `doctors.tsx`)
- Pure CSS for the swipe: `overflow-x-auto snap-x snap-mandatory` on the track, `snap-center shrink-0 w-[85%]` on each card.
- Native momentum scroll on mobile.
- Dot indicators: small `"use client"` sub-component using `IntersectionObserver` to track which card is centered, lights the matching dot. Tapping a dot calls `card.scrollIntoView({ behavior: 'smooth', inline: 'center' })`.
- ≥md: switch to static grid (`md:grid md:grid-cols-3` etc.), hide dots.

### Booking form (`booking-form.tsx` + `_actions/booking.ts`)
- `"use client"` form using `useActionState`.
- Client-side validation:
  - `name`: trim, length ≥ 2.
  - `phone`: strip non-digits, accept lengths 10 (e.g. `0681234567`) or 12 (`380681234567`).
- Submits via `<form action={action}>`.
- Server action (`"use server"`):
  - Re-validates input identically.
  - Returns `{ ok: false, error: string, fieldErrors?: { name?: string; phone?: string } }` or `{ ok: true }`.
  - On valid: `console.log({ ts: new Date().toISOString(), name, phone })`. `// TODO: wire delivery (email or Telegram)` comment.
  - Rate limit: in-memory `Map<string, number[]>` keyed by IP from request headers. Max 3 submissions / 10 min. Active only when `process.env.NODE_ENV === 'production'`.
- On `{ ok: true }`: client replaces form with thank-you card.
- On `{ ok: false }`: render error above submit. Preserve values via `defaultValue` from form data round-trip.

## Styling, responsive, fonts

### Tailwind 4 tokens (`globals.css`)

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

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

Remove the existing `prefers-color-scheme: dark` rule. No dark mode.

### Font setup (`layout.tsx`)

```ts
import { Onest } from "next/font/google";

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});
```

Apply `onest.variable` on `<html>`. Body uses `font-sans` (which now resolves to Onest via the theme token).

Remove existing Geist font imports.

### Responsive

- Single primary breakpoint: `md` (768px).
- Page container: `mx-auto px-4 md:px-8 max-w-md md:max-w-6xl`.
- Touch targets ≥ 44×44px on buttons and nav links.

### Asset URLs

- Hero team photo: Unsplash photo of dental team (specific URL to be selected during implementation, whitelisted in `next.config.ts` `images.remotePatterns`).
- Clinic exterior photo: Unsplash photo of a clinic/medical building (selected during implementation).
- Before/after: in-repo SVG composite at `public/images/before-after.svg` (two paired teeth illustrations or two slightly-toned crops; designed in implementation phase).
- Map placeholder: in-repo SVG at `public/images/map-placeholder.svg` (neutral street grid + brand-color pin).
- Directions href: `https://www.google.com/maps/dir/?api=1&destination=вул.+Бажана+19+Хмельницький` (URL-encoded).

### `next/image`

- Hero photo uses `priority` and explicit width/height (or `fill` with parent `position: relative` and an aspect-ratio class).
- All other photos use `next/image` with explicit width/height, no `priority`.
- Decorative SVGs (icons, before-after, map) imported directly as React components or `<img>`/`<Image>` with appropriate alt.

## Accessibility baseline

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section aria-labelledby="<heading-id>">` per major section.
- Focus ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2`.
- Images: meaningful alt text in Ukrainian, decorative images get `alt=""`.
- Form: visible `<label>` for each input (not just placeholder), `aria-invalid` on error, error text linked via `aria-describedby`.
- `prefers-reduced-motion`: scroll-behavior, before/after dragging transitions, and dot-indicator scroll animations skipped.
- Slider handle: `role="slider"` with `aria-valuemin/max/now` and arrow-key support.
- All interactive elements reachable by keyboard.

## Verification

No automated tests for this build. Verification is manual:

1. `npm run build` succeeds with no errors.
2. `npm run lint` passes.
3. `npm run dev` and verify on viewport widths 375px and 1280px:
   - Each section renders matching mockup intent.
   - Sticky header behavior.
   - Mobile menu opens/closes on tap, link tap closes and scrolls.
   - Before/after slider drags with mouse and touch; arrow keys move handle.
   - Reviews and doctors carousels swipe smoothly with momentum; dots track active card.
   - Form: empty submit shows errors; valid submit shows thank-you card; "send another" resets.
   - All `tel:` and external links work.
   - Focus-visible rings appear on Tab navigation.

## Open questions / future wiring

- Real photographs (clinic team, doctor portraits, clinic exterior, real before/after cases) replace placeholders when the clinic provides assets.
- Real social URLs replace stubbed `#` hrefs.
- Real address/phone/hours replace mockup defaults if different.
- Form delivery: wire Telegram bot or email service when clinic provides credentials. The `// TODO: wire delivery` comment in `_actions/booking.ts` marks the spot.
- Privacy policy page: build if/when legal copy is provided.
- Content depth (detail pages, prices, cases gallery) — explicit out-of-scope; revisit only on new request.
