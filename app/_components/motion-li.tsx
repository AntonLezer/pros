"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export default function MotionLi({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  // Visible by default (SSR/no-JS). Armed only after mount so the hidden start
  // state never affects FCP/LCP or hurts crawlers.
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = [className, armed && "motion-inview", armed && shown && "is-visible"]
    .filter(Boolean)
    .join(" ");

  return (
    <li ref={ref} className={cls} style={index ? { transitionDelay: `${index * 0.05}s` } : undefined}>
      {children}
    </li>
  );
}
