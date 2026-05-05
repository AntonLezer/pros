"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { reviews } from "@/data/reviews";

function getVisibleCount(width: number) {
  if (width < 600) return 1;
  if (width < 900) return 2;
  return 3;
}

export default function Reviews() {
  const [offset, setOffset] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => setVisible(getVisibleCount(window.innerWidth));
    update();
    const onResize = () => {
      update();
      setOffset(0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const maxOffset = Math.max(0, reviews.length - visible);
  const cardBasis = `calc((100% - ${(visible - 1) * 24}px) / ${visible})`;
  const move = (dir: -1 | 1) => {
    setOffset((o) => Math.max(0, Math.min(maxOffset, o + dir)));
  };

  return (
    <section id="reviews" aria-labelledby="reviews-h2" className="bg-surface py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Відгуки пацієнтів
            </p>
            <h2
              id="reviews-h2"
              className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
            >
              Що кажуть наші пацієнти
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={offset === 0}
              aria-label="Попередній відгук"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream-2 bg-cream text-text transition-all enabled:hover:border-accent enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={offset >= maxOffset}
              aria-label="Наступний відгук"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream-2 bg-cream text-text transition-all enabled:hover:border-accent enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              gap: "24px",
              transform: `translateX(calc(-${offset} * (${cardBasis} + 24px)))`,
            }}
          >
            {reviews.map((r) => (
              <li
                key={r.id}
                className="shrink-0 rounded-[20px] bg-cream p-7"
                style={{ flex: `0 0 ${cardBasis}` }}
              >
                <div
                  className="mb-4 flex gap-1 text-[#F5A623]"
                  aria-label={`Оцінка ${r.rating} з 5`}
                >
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <p className="mb-5 text-[15px] leading-relaxed text-text">{r.text}</p>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-base font-bold text-white">
                    {r.initials}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-dark">{r.name}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
