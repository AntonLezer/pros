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
