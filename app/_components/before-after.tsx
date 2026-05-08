"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const STEP = 5;

export default function BeforeAfter() {
  const [x, setX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setX(Math.max(2, Math.min(98, next)));
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
      setX((v) => Math.max(2, v - STEP));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setX((v) => Math.min(98, v + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      setX(2);
    } else if (e.key === "End") {
      e.preventDefault();
      setX(98);
    }
  };

  const onContainerPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).dataset.handle === "true") return;
    updateFromClientX(e.clientX);
  };

  useEffect(() => () => setDragging(false), []);

  return (
    <section
      id="before-after"
      aria-labelledby="ba-h2"
      className="bg-cream py-16 md:py-[100px]"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Результати лікування
            </p>
            <h2
              id="ba-h2"
              className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
            >
              До та після — говорять самі за себе
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
              Наші лікарі досягають виняткових результатів навіть у складних випадках. Перетягніть повзунок, щоб побачити різницю.
            </p>
            <Link
              href="#booking"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.35)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Хочу так само
            </Link>
          </div>

          <div
            ref={containerRef}
            onPointerDown={onContainerPointerDown}
            className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-[20px] shadow-[0_24px_64px_rgba(0,0,0,0.12)]"
            style={{ cursor: "col-resize" }}
          >
            <Image
              src="/images/tooth/before.jpeg"
              alt="Стан зубів до лікування — стоматологія Центр Плоскирів"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="pointer-events-none object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${x}%)` }}
            >
              <Image
                src="/images/tooth/after.jpeg"
                alt="Стан зубів після лікування — стоматологія Центр Плоскирів"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="pointer-events-none object-cover"
              />
            </div>

            <div
              className="pointer-events-none absolute inset-y-0 z-10 w-[3px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]"
              style={{ left: `${x}%`, transform: "translateX(-50%)" }}
              aria-hidden="true"
            />

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
              className="absolute top-1/2 z-20 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-accent shadow-[0_4px_16px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{ left: `${x}%`, touchAction: "none" }}
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true" fill="none">
                <path
                  d="M7 4L3 10l4 6M13 4l4 6-4 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <span className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              До
            </span>
            <span className="absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              Після
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
