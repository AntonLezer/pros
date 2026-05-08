import Link from "next/link";
import { contacts } from "@/data/contacts";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { href: "#services", label: "Послуги" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#contacts", label: "Контакти" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark py-12 px-5 md:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-[16px] font-bold text-white"
          style={{ letterSpacing: "-0.5px" }}
        >
          Плоски<span className="text-accent">рів</span>
        </Link>

        <p className="text-[13px] text-white/35">
          © {new Date().getFullYear()} Стоматологія Плоскирів · Хмельницький
        </p>

        <div className="flex items-center gap-6">
          <nav aria-label="Підвал" className="flex gap-6">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] text-white/45 transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
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
    </footer>
  );
}
