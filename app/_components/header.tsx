"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { contacts } from "@/data/contacts";

const NAV_LINKS = [
  { href: "#services", label: "Послуги" },
  { href: "#about", label: "Про нас" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openScrollY = useRef(0);

  useEffect(() => {
    if (!menuOpen) return;
    openScrollY.current = window.scrollY;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openScrollY.current) > 200) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-surface/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 px-4 py-3 md:max-w-6xl md:px-8">
        <Link href="#top" className="flex items-center gap-2" aria-label="Центр Плоскирів — на головну">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-surface text-sm font-bold">ЦП</span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-wide">ЦЕНТР ПЛОСКИРІВ</span>
            <span className="block text-xs text-ink-muted">стоматологія</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contacts.phoneHref}
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded"
            aria-label={`Зателефонувати ${contacts.phone}`}
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {contacts.phone}
          </a>
          <Link
            href="#booking-form"
            className="hidden md:inline-flex items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            Записатися
          </Link>
          <a
            href={contacts.phoneHref}
            className="md:hidden grid h-11 w-11 place-items-center rounded-md text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={`Зателефонувати ${contacts.phone}`}
          >
            <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden grid h-11 w-11 place-items-center rounded-md text-ink hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
          >
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-nav" className="md:hidden border-t border-rule bg-surface">
          <nav className="mx-auto flex w-full max-w-md flex-col px-4 py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={handleLinkClick}
                className="block py-3 text-base text-ink border-b border-rule last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
