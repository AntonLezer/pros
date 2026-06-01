import Link from "next/link";
import Image from "next/image";
import { contacts } from "@/data/contacts";
import ViberIcon from "./icons/viber";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { href: "/#services", label: "Послуги" },
  { href: "/tsiny", label: "Ціни" },
  { href: "/pro-kliniku", label: "Про клініку" },
  { href: "/#doctors", label: "Лікарі" },
  { href: "/#contacts", label: "Контакти" },
  { href: "/docs/Публічний-договір-(оферта)-стом.pdf", label: "Публічна оферта", external: true },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark py-12 px-5 md:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Медичний науково-виробничий центр Плоскирів — головна"
          className="inline-flex items-center gap-2.5 font-display tracking-tight"
        >
          <Image
            src="/logo/logo.png"
            alt=""
            width={32}
            height={32}
            className="shrink-0 object-contain"
            style={{ width: 32, height: 32 }}
          />
          <span className="flex flex-col leading-[1.1]">
            <span className="text-[10px] font-medium text-white/45">
              медичний науково-виробничий
            </span>
            <span className="text-[16px] font-bold tracking-[-0.5px] text-accent">
              центр «ПЛОСКИРІВ»
            </span>
          </span>
        </Link>

        <p className="text-[13px] text-white/35">
          © {new Date().getFullYear()} Стоматологія Плоскирів · Хмельницький
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <nav aria-label="Підвал" className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/45 transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[13px] text-white/45 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={contacts.viberHref}
              aria-label="Viber стоматології Плоскирів"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition-[transform,background-color,color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <ViberIcon className="h-4 w-4" />
            </a>
            <a
              href={contacts.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram стоматології Плоскирів"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition-[transform,background-color,color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <TelegramIcon className="h-4 w-4" />
            </a>
            <a
              href={contacts.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram стоматології Плоскирів"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/70 transition-[transform,background-color,color,border-color] duration-200 ease-out hover:border-accent hover:bg-accent hover:text-white active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
