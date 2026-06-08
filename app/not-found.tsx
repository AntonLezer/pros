import type { Metadata } from "next";
import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";

export const metadata: Metadata = {
  title: { absolute: "Сторінку не знайдено — Центр Плоскирів" },
  description:
    "На жаль, ця сторінка не існує або була переміщена. Поверніться на головну стоматології «Центр Плоскирів» у Хмельницькому.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p
        aria-hidden
        className="font-display text-[clamp(5rem,18vw,11rem)] font-bold leading-none text-accent"
      >
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-dark sm:text-3xl">
        Сторінку не знайдено
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
        Можливо, сторінку було переміщено або видалено. Поверніться на головну
        або зв&apos;яжіться з нами — ми допоможемо записатися на прийом.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <Home className="h-[18px] w-[18px]" aria-hidden />
          На головну
        </Link>
        <a
          href={contacts.phoneHref}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-cream-2 bg-cream px-7 text-[15px] font-semibold text-dark transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Phone className="h-[18px] w-[18px]" aria-hidden />
          {contacts.phone}
        </a>
      </div>
    </section>
  );
}
