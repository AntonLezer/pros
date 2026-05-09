"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

const priceFormatter = new Intl.NumberFormat("uk-UA");
const MOBILE_GAP = 20;

export default function Services() {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const scrollRef = useRef<HTMLUListElement>(null);

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
  }, []);

  const move = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth + MOBILE_GAP), behavior: "smooth" });
  };

  return (
    <section id="services" aria-labelledby="services-h2" className="bg-surface py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <header className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-[640px]">
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Що ми лікуємо
            </p>
            <h2
              id="services-h2"
              className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
            >
              Наші послуги
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted">
              Повний спектр стоматологічних послуг для всієї родини — від дітей до людей похилого віку.
            </p>
          </div>
          <div className="flex gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={atStart}
              aria-label="Попередня послуга"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream-2 bg-cream text-text transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out enabled:hover:border-accent enabled:hover:bg-accent enabled:hover:text-white enabled:active:scale-[0.94] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={atEnd}
              aria-label="Наступна послуга"
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream-2 bg-cream text-text transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out enabled:hover:border-accent enabled:hover:bg-accent enabled:hover:text-white enabled:active:scale-[0.94] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </header>

        <ul
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible md:grid-cols-3"
          style={{ overscrollBehaviorX: "contain" }}
        >
          {services.map((s) => (
            <li
              key={s.id}
              className="group w-full shrink-0 rounded-[20px] border border-transparent bg-cream transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-accent/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] [scroll-snap-align:start] sm:w-auto sm:shrink"
            >
              <Link
                href={`/poslugy/${s.slug}`}
                className="block h-full p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:p-8"
                aria-label={`${s.name} — детальніше`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white">
                    <s.Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-muted/40 transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 font-display text-[15px] font-semibold leading-snug text-dark">
                  {s.name}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted">{s.description}</p>
                <p className="mt-4 text-[14px] font-semibold text-accent">
                  від {priceFormatter.format(s.priceFrom)} грн
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
