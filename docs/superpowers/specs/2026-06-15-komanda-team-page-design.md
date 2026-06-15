# Team page (`/komanda`) — Design

**Date:** 2026-06-15
**Status:** Approved (pending spec review)

## Goal

Add a new, distinct, SEO-focused page about the clinic's specialists ("our team")
at a Ukrainian keyword-relevant slug. It must **not** overlap with the existing
`/pro-kliniku` ("Про клініку") page, which stays untouched. The team page is the
strongest available E-E-A-T signal for a medical site.

## Decisions (from brainstorming)

- **New page**, distinct topic; `/pro-kliniku` is left as-is.
- **Topic:** the clinic's team / doctors.
- **Slug:** Ukrainian. Chosen: `/komanda` ("Команда"). The team includes an
  administrator and two dental technicians alongside three clinicians, so
  `/likari` ("doctors") would be inaccurate; `/komanda` is accurate and
  keyword-relevant. (Alternatives if owner prefers: `/nasha-komanda`, `/likari`.)
- **Content depth:** scaffold now. Build the full page + data fields, populated
  with existing data; richer per-person text is owner-supplied later.
- **Approach A** (single rich team page) over per-person sub-pages (B). One
  indexable URL, deep content, no thin pages. B is a future upgrade once real
  bios exist.

## Constraint: live, indexed site — no fake content

The site is live and indexable. We do **not** publish visible placeholder/lorem
text and do **not** invent medical credentials (SEO risk + medical-accuracy/trust
problem). "Placeholders" means:

- `TODO` comments in the data file naming exactly what the owner must supply
  (same pattern as the existing TODO in `app/pro-kliniku/page.tsx`).
- The page **conditionally renders** each rich field and **gracefully omits**
  empty ones. The page is honest today and deepens as fields are filled in.

## Data model

Extend the `Doctor` type in `data/doctors.ts` with **optional** fields so the
existing home `Doctors` component (`app/_components/doctors.tsx`) keeps working
unchanged:

- `role?: "doctor" | "technician" | "admin"` — for grouping on the team page.
- `bio?: string`
- `education?: string[]`
- `certificates?: string[]`
- `focusAreas?: string[]`

Populate `role` for all existing entries. Add the new text fields as TODO-marked
empty/absent values for the owner to fill. No existing fields change.

## Route & file structure

- `app/komanda/page.tsx` — server component. Holds `metadata` export, JSON-LD,
  and the full markup, matching the single-file pattern of
  `app/pro-kliniku/page.tsx`. A small local helper/sub-render for a member card
  is acceptable if it improves readability; no new shared component required.

## Page structure (semantic HTML5, existing design tokens)

1. **Breadcrumb** `<nav aria-label="Хлібні крихти">`: Головна › Команда.
2. **Intro** `<section aria-labelledby>`: eyebrow "Наша команда", keyword-rich
   `<h1>` (e.g. *"Команда стоматології «Центр Плоскирів» у Хмельницькому"*),
   intro paragraph, small stats (team size / combined experience) reusing the
   pro-kliniku stat-card style.
3. **Members, grouped by role** with `<h2>` per group, in order:
   **Лікарі** → **Зуботехнічна лабораторія** → **Адміністрація**.
   Each member card: `next/image` photo (explicit dimensions, lazy below the
   fold, keyword-rich `alt` following the existing doctors-component pattern),
   name (`<h3>`), specialty, experience (reuse `formatExperience` logic), and the
   rich fields (`bio`, `education`, `certificates`, `focusAreas`) rendered
   **only when present**.
4. **Booking CTA** `<section>`: reuse the pro-kliniku aside pattern — online
   booking link (`/#booking`) + phone (`contacts.phoneHref`).

## SEO

- `metadata` export mirroring `app/pro-kliniku/page.tsx`:
  - keyword-rich `title` (via the existing root template `%s — Центр Плоскирів`),
    `description`, `alternates.canonical: "/komanda"`, OpenGraph, Twitter (reuse
    `/opengraph-image`).
- JSON-LD (`application/ld+json`):
  - `BreadcrumbList`: Головна → Команда.
  - One `Physician`/`Person` node per member, reusing the **existing stable
    `@id`** `${SITE_URL}#${d.id}` already declared in the global `Dentist.employee`
    array (`app/layout.tsx`), with `worksFor → ${SITE_URL}#dentist`. Add
    `alumniOf` / `hasCredential` / `knowsAbout` **only when** the corresponding
    fields (`education` / `certificates` / `focusAreas`) are filled.
- Semantic HTML5 (`<article>`, `<section>`, `<nav>`, `<h1>`/`<h2>`/`<h3>`).
- `next/link` for all internal navigation; `next/image` for all images with
  explicit width/height to protect CLS.

## Internal linking (avoid an orphan page)

- Add a "Команда" link (`href: "/komanda"`) to the nav arrays in
  `app/_components/header.tsx` and `app/_components/footer.tsx`.
- Add `/komanda` to `app/sitemap.ts` (priority ~0.7, monthly).
- Optional touches (nice internal linking, low risk): repoint the pro-kliniku
  "Наші лікарі" button and/or the home `Doctors` section from `/#doctors` to
  `/komanda`.

## Owner-supplied content (TODO)

Per specialist: short bio, education/university, certificates, focus areas.
Also relevant: the unverified facts already tracked in memory
(`ploskyriv-content-facts-to-confirm`).

## Out of scope (YAGNI)

- Per-person detail pages / dynamic `/komanda/[slug]` route (future Approach B).
- Any change to `/pro-kliniku` content or the home page beyond the optional
  internal-link repoints above.

## Verification

- `npm run build` succeeds; `npm run lint` clean.
- `/komanda` renders: breadcrumb, H1, grouped members, CTA.
- Exactly one `<h1>`; logical heading order.
- Empty rich fields are omitted (no blank labels, no placeholder text visible).
- View source: valid `BreadcrumbList` + `Physician` JSON-LD; `@id`s match the
  global `Dentist.employee` `@id`s.
- `/komanda` present in `sitemap.xml` and linked from header + footer.
- Existing home `Doctors` section and `/pro-kliniku` unchanged in behavior.
