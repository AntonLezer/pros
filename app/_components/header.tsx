"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Clock, MapPin, Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { contacts } from "@/data/contacts";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

const DRAWER_ITEMS = [
  { href: "/poslugy", label: "Послуги" },
  { href: "/tsiny", label: "Ціни" },
  { href: "/#before-after", label: "До/Після" },
  { href: "/komanda", label: "Лікарі" },
  { href: "/#reviews", label: "Відгуки" },
  { href: "/pro-kliniku", label: "Про клініку" },
  { href: "/#contacts", label: "Контакти" },
  { href: "/#faq", label: "FAQ" },
];

function Logo({ size = 16, imageSize = 38 }: { size?: number; imageSize?: number }) {
  const smallSize = Math.max(10, Math.round(size * 0.62));
  return (
    <Link
      href="/"
      aria-label="Медичний науково-виробничий центр Плоскирів — головна"
      className="inline-flex items-center gap-2.5 font-display tracking-tight text-dark"
    >
      <Image
        src="/logo/logo.png"
        alt=""
        width={imageSize}
        height={imageSize}
        priority
        className="shrink-0 object-contain"
        style={{ width: imageSize, height: imageSize }}
      />
      <span className="flex flex-col leading-[1.1]">
        <span
          className="font-medium text-muted"
          style={{ fontSize: `${smallSize}px` }}
        >
          медичний науково-виробничий
        </span>
        <span
          className="font-bold tracking-[-0.5px] text-accent"
          style={{ fontSize: `${size}px` }}
        >
          центр «ПЛОСКИРІВ»
        </span>
      </span>
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
        "sticky inset-x-0 top-0 z-[100] border-b border-accent/10 backdrop-blur-xl transition-shadow duration-300",
        scrolled && "shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
      )}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Logo />

        <div className="hidden items-center gap-7 text-sm text-text lg:flex">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-accent" strokeWidth={2.25} aria-hidden="true" />
            <span>{contacts.hours.weekdays}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" strokeWidth={2.25} aria-hidden="true" />
            <span>{contacts.address.line2}</span>
          </span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={contacts.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-dark transition-colors duration-200 ease-out hover:text-accent"
          >
            <Phone className="h-4 w-4 text-accent" strokeWidth={2.25} aria-hidden="true" />
            {contacts.phone}
          </a>
          <Link
            href="#booking"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Записатись
          </Link>
        </div>

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
                className="mt-6 block w-full rounded-full bg-accent py-3.5 text-center text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:bg-accent-dark active:scale-[0.97]"
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
