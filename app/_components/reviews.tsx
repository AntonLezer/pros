"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { reviews } from "@/data/reviews";

const GAP = 24;

function getVisibleCount(width: number) {
  if (width < 600) return 1;
  if (width < 900) return 2;
  return 3;
}

export default function Reviews() {
  const [visible, setVisible] = useState(3);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const update = () => setVisible(getVisibleCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const updateBounds = () => {
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 1);
    };
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [visible]);

  const cardWidth = `calc((100% - ${(visible - 1) * GAP}px) / ${visible})`;

  const move = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardPx = (el.clientWidth - (visible - 1) * GAP) / visible;
    el.scrollBy({ left: dir * (cardPx + GAP), behavior: "smooth" });
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
              disabled={atStart}
              aria-label="Попередній відгук"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream-2 bg-cream text-text transition-all enabled:hover:border-accent enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={atEnd}
              aria-label="Наступний відгук"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream-2 bg-cream text-text transition-all enabled:hover:border-accent enabled:hover:bg-accent enabled:hover:text-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </header>

        <ul
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ overscrollBehaviorX: "contain" }}
        >
          {reviews.map((r) => (
            <li
              key={r.id}
              className="shrink-0 rounded-[20px] bg-cream p-7 [scroll-snap-align:start]"
              style={{ width: cardWidth }}
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
    </section>
  );
}
