# Hero + BannerSlider merge — design

## Goal

Make the hero text (h1 + paragraph) rotate in sync with the background image. Currently `BannerSlider` rotates 4 images while a single static text block sits on top. After this change, each of the 4 slides has its own h1 + paragraph; the badge and CTA buttons remain identical across slides.

## Scope

- `app/_components/hero.tsx` — becomes the single owner of slide data, image rotation, and per-slide text.
- `app/_components/banner-slider.tsx` — deleted. It is used only by `hero.tsx`, so the wrapper has no second consumer to justify it (per the project's "no abstractions for single-use code" rule).
- No other files change. No new dependencies.

## Data shape

```ts
type Slide = {
  src: string;        // /images/banner/*.jpg
  alt: string;
  title: string;      // full headline; the accent word is rendered via `accent`
  accent: string;     // substring of `title` to wrap in <em class="text-accent-light">
  paragraph: string;
};
```

Four entries. The accent word is split out as a separate field (rather than markup-in-string) so the file stays free of dangerouslySetInnerHTML. At render time, split `title` on the first occurrence of `accent`.

## Slide content

| # | Title (accent in [brackets]) | Paragraph |
|---|------------------------------|-----------|
| 1 | Ваша [здорова] посмішка — наша турбота | Сучасна стоматологія з індивідуальним підходом. Лікуємо без болю, працюємо з любов'ю до кожного пацієнта. |
| 2 | Лікуємо [без болю] — спокійно і впевнено | Делікатна анестезія, сучасні протоколи та уважні лікарі. Ваш комфорт — наш стандарт від першого візиту. |
| 3 | [Точна] діагностика із сучасним обладнанням | Цифровий рентген, інтраоральна камера та мікроскоп. Бачимо більше — лікуємо точніше та зберігаємо ваші зуби. |
| 4 | Команда, якій [довіряєш] свою посмішку | Досвідчені стоматологи з постійною практикою у Хмельницькому. Працюємо так, як лікували б рідних. |

Image alt strings are kept as in the current `banner-slider.tsx`.

## Behavior

- Auto-rotate every 5000 ms (unchanged).
- Pause on hover/focus inside the carousel region (unchanged).
- Reduced-motion: no auto-rotate (unchanged).
- Image crossfade: identical to current — absolute layers, `transition-opacity duration-700`.
- Text crossfade: `AnimatePresence mode="wait"` keyed on `active`. Opacity-only, ~250 ms. Reduced-motion path renders the active text without animation, mirroring `MotionFade`.
- Static elements (badge, buttons) render once outside the keyed text container — they do not re-animate per slide.

## Accessibility

- Only the active slide's h1 is in the DOM, so `id="hero-h1"` stays unique and the section's `aria-labelledby` keeps resolving.
- The swapping h1 + paragraph wrapper carries `aria-live="polite"` so screen reader users hear the change.
- Tab-list pagination (1/4 dots) and `aria-roledescription="carousel"` on the region — unchanged.

## CLS safeguard

The text wrapper gets a `min-h-*` sized to the tallest of the 4 variants on mobile (worst case = paragraph 1 / 2, ~3 lines). This prevents the buttons from jumping when copy length differs across slides. Exact value to be measured during implementation; aim for the smallest min-height that holds all four without shift.

## Out of scope

- Changing CTA targets or copy.
- Changing layout, gradient overlay, or the pagination control.
- Adding swipe gestures or arrow controls.
- Changing the image set.
