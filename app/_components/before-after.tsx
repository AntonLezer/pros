"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const STEP = 5;
const HANDLE_RADIUS = 18;

export default function BeforeAfter() {
  const [x, setX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setX(Math.max(0, Math.min(100, next)));
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
      setX((v) => Math.max(0, v - STEP));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setX((v) => Math.min(100, v + STEP));
    } else if (e.key === "Home") {
      e.preventDefault();
      setX(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setX(100);
    }
  };

  // Tap-anywhere-on-the-image to set divider position
  const onContainerPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).dataset.handle === "true") return;
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    return () => setDragging(false);
  }, []);

  return (
    <section aria-labelledby="ba-h2" className="bg-surface-alt py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="ba-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Результати, які говорять самі за себе
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <div
          ref={containerRef}
          onPointerDown={onContainerPointerDown}
          className="relative mx-auto mt-8 aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-xl bg-brand-tint select-none"
        >
          {/* before image (base layer, full width) */}
          <Image
            src="/images/before-after.svg"
            alt="Стан зубів до та після лікування у стоматології Центр Плоскирів"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover pointer-events-none"
            priority={false}
          />
          {/* after image (overlay, clipped from x% to 100%) */}
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
            <Image
              src="/images/before-after.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover pointer-events-none"
              priority={false}
              aria-hidden="true"
            />
          </div>

          {/* divider */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-surface"
            style={{ left: `${x}%`, transform: "translateX(-50%)" }}
            aria-hidden="true"
          />

          {/* handle */}
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
            className="absolute top-1/2 grid h-9 w-9 place-items-center rounded-full bg-surface text-ink-muted ring-2 ring-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            style={{
              left: `${x}%`,
              transform: `translate(-${HANDLE_RADIUS}px, -${HANDLE_RADIUS}px)`,
              touchAction: "none",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M9 7l-4 5 4 5M15 7l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* labels */}
          <span className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white">До</span>
          <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white">Після</span>
        </div>
      </div>
    </section>
  );
}
