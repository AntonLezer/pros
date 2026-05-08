"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { contacts } from "@/data/contacts";

type Slide = {
  src: string;
  alt: string;
  title: string;
  accent: string;
  paragraph: string;
};

const SLIDES: Slide[] = [
  {
    src: "/images/banner/IMG_9286.jpg",
    alt: "Лікарі стоматології Центр Плоскирів у Хмельницькому, командне фото",
    title: "Ваша здорова посмішка — наша турбота",
    accent: "здорова",
    paragraph:
      "Сучасна стоматологія з індивідуальним підходом. Лікуємо без болю, працюємо з любов'ю до кожного пацієнта.",
  },
  {
    src: "/images/banner/IMG_9507.jpg",
    alt: "Команда стоматології Центр Плоскирів — лікарі у Хмельницькому",
    title: "Лікуємо без болю — спокійно і впевнено",
    accent: "без болю",
    paragraph:
      "Делікатна анестезія, сучасні протоколи та уважні лікарі. Ваш комфорт — наш стандарт від першого візиту.",
  },
  {
    src: "/images/banner/IMG_9320.jpg",
    alt: "Стоматологи Центр Плоскирів у Хмельницькому за роботою",
    title: "Точна діагностика із сучасним обладнанням",
    accent: "Точна",
    paragraph:
      "Цифровий рентген, інтраоральна камера та мікроскоп. Бачимо більше — лікуємо точніше та зберігаємо ваші зуби.",
  },
  {
    src: "/images/banner/IMG_9390.jpg",
    alt: "Команда стоматології Центр Плоскирів — здорова усмішка у Хмельницькому",
    title: "Команда, якій довіряєш свою посмішку",
    accent: "довіряєш",
    paragraph:
      "Досвідчені стоматологи з постійною практикою у Хмельницькому. Працюємо так, як лікували б рідних.",
  },
];

const ROTATE_MS = 5000;

function splitTitle(title: string, accent: string) {
  const idx = title.indexOf(accent);
  if (idx === -1) return { before: title, accentText: "", after: "" };
  return {
    before: title.slice(0, idx),
    accentText: title.slice(idx, idx + accent.length),
    after: title.slice(idx + accent.length),
  };
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    touchStart.current = null;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
    if (dx < 0) setActive((i) => (i + 1) % SLIDES.length);
    else setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  };

  const current = SLIDES[active];
  const { before, accentText, after } = splitTitle(current.title, current.accent);

  return (
    <section aria-labelledby="hero-h1" className="bg-cream-2">
      <div
        className="relative h-[calc(100vh-69px)] lg:h-[calc(100dvh-14px)] w-full overflow-hidden md:h-auto md:aspect-[3/2] md:min-h-[600px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Команда та інтер'єр стоматології Центр Плоскирів"
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              quality={90}
              className="object-cover object-top md:object-center"
            />
          </div>
        ))}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 md:inset-y-0 md:flex md:items-center">
          <div className="mx-auto w-full max-w-md px-4 pb-8 md:max-w-[1200px] md:px-8 md:pb-0">
            <div className="md:max-w-xl">
              <span className="inline-flex invisible md:visible items-center gap-2 rounded-full border border-accent/20 bg-cream-2/95 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider text-accent">
                <span aria-hidden="true">★</span>
                Хмельницький · Стоматологія
              </span>

              <div
                aria-live="polite"
                className="min-h-[230px] md:min-h-[330px]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <h1
                      id="hero-h1"
                      className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-[52px] md:leading-[1.05]"
                    >
                      {before}
                      <em className="not-italic text-accent-light">{accentText}</em>
                      {after}
                    </h1>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-[17px]">
                      {current.paragraph}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="#booking"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.35)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Записатись на прийом
                </Link>
                <a
                  href={contacts.phoneHref}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  Подзвонити
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute right-4 top-4 md:bottom-6 md:right-8 md:top-auto flex items-center gap-3 text-xs font-mono tabular-nums"
          role="tablist"
          aria-label="Слайди банера"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Слайд ${i + 1} з ${SLIDES.length}`}
              onClick={() => setActive(i)}
              className={`rounded transition-[transform,color] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-black/0 ${
                i === active
                  ? "scale-110 font-semibold text-surface"
                  : "text-surface/55 hover:text-surface/85"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
