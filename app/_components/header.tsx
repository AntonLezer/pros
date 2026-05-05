"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

const NAV_ITEMS = [
  { href: "#services", label: "Послуги" },
  { href: "#before-after", label: "До/Після" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#contacts", label: "Контакти" },
];

const DRAWER_ITEMS = [...NAV_ITEMS, { href: "#faq", label: "FAQ" }];

function Logo({ size = 18 }: { size?: number }) {
  return (
    <Link
      href="/"
      className="font-display font-bold tracking-tight text-dark"
      style={{ fontSize: `${size}px`, letterSpacing: "-0.5px" }}
    >
      Плоски<span className="text-accent">рів</span>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b border-accent/10 backdrop-blur-xl transition-shadow duration-300",
        scrolled && "shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 md:px-8">
        <Logo />

        <nav aria-label="Основна навігація" className="hidden items-center gap-8 md:flex">
          <ul className="flex gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-text transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#booking"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Записатись
          </Link>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Відкрити меню"
            className="grid h-9 w-9 place-items-center rounded-full text-dark md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Menu className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
          </SheetTrigger>
          <SheetContent>
            <div className="mb-8">
              <Logo size={16} />
            </div>
            <ul className="flex flex-col">
              {DRAWER_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-cream-2">
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block py-3.5 text-base font-medium text-text transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <SheetClose asChild>
              <Link
                href="#booking"
                className="mt-6 block w-full rounded-full bg-accent py-3.5 text-center text-[15px] font-semibold text-white transition-colors hover:bg-accent-dark"
              >
                Записатись на прийом
              </Link>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
