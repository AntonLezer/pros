"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/banner/IMG_9507.jpg",
    alt: "Команда стоматології Центр Плоскирів — лікарі у Хмельницькому",
  },
  {
    src: "/images/banner/IMG_9286.jpg",
    alt: "Лікарі стоматології Центр Плоскирів у Хмельницькому, командне фото",
  },
  {
    src: "/images/banner/IMG_9320.jpg",
    alt: "Стоматологи Центр Плоскирів у Хмельницькому за роботою",
  },
  {
    src: "/images/banner/IMG_9390.jpg",
    alt: "Команда стоматології Центр Плоскирів — здорова усмішка у Хмельницькому",
  },
];

const ROTATE_MS = 5000;

export default function BannerSlider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, active]);

  return (
    <div
      className="relative aspect-[4/5] max-h-screen w-full overflow-hidden md:aspect-[3/2] md:min-h-[600px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
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
            className="object-cover object-top md:object-center"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/30 md:to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 md:inset-y-0 md:flex md:items-center">
        {children}
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
            className={`rounded transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface focus-visible:ring-offset-2 focus-visible:ring-offset-black/0 ${
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
  );
}
