import Link from "next/link";

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
      </div>
    </footer>
  );
}
