import Link from "next/link";

const FOOTER_NAV = [
  [
    { href: "#services", label: "Послуги" },
    { href: "#about", label: "Про нас" },
    { href: "#doctors", label: "Лікарі" },
  ],
  [
    { href: "#reviews", label: "Відгуки" },
    { href: "#contacts", label: "Контакти" },
  ],
];

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-surface">
      <div className="mx-auto w-full max-w-md px-4 py-10 text-center md:max-w-6xl md:px-8">
        <div className="flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-brand text-surface text-sm font-bold">ЦП</span>
          <span className="leading-tight text-left">
            <span className="block text-sm font-semibold tracking-wide">ЦЕНТР ПЛОСКИРІВ</span>
            <span className="block text-xs text-ink-muted">стоматологія</span>
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
          Лікуємо зуби з турботою про вас і вашу усмішку
        </p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink">
          {FOOTER_NAV.flat().map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 text-xs text-ink-muted">
          <span className="opacity-60" title="Сторінку буде додано">
            Політика конфіденційності
          </span>
          <span className="mx-2">·</span>
          <span>© 2026 Центр Плоскирів. Усі права захищені.</span>
        </div>
      </div>
    </footer>
  );
}
