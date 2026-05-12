import Link from "next/link";
import Image from "next/image";
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

function ViberIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817c-.063 3.117-.138 8.978 5.512 10.589h.005l-.005 2.474s-.036.999.612 1.211c.799.262 1.262-.512 2.013-1.328.41-.453.98-1.116 1.41-1.626 3.794.319 6.71-.413 7.046-.527.769-.252 5.108-.81 5.812-6.587.726-5.955-.345-9.703-2.275-11.4l-.012-.005c-.584-.539-2.928-2.246-8.156-2.265 0 0-.388-.025-1.235-.005zm.118 1.7c.728-.005 1.176.012 1.176.012 4.418.013 6.524 1.348 7.022 1.795 1.633 1.41 2.475 4.794 1.855 9.766-.59 4.832-4.1 5.143-4.752 5.354-.276.09-2.86.738-6.103.523 0 0-2.416 2.92-3.166 3.679-.117.122-.255.169-.349.149-.13-.026-.165-.18-.164-.4.005-.317.024-3.886.024-3.886-4.787-1.33-4.504-6.318-4.453-8.92.052-2.602.555-4.733 2.013-6.173 1.95-1.751 5.477-2.064 7.116-2.082 0 0 .265-.005.781-.012zm.785 2.467c-.022 0-.057.005-.057.052 0 .06.039.075.075.075 1.146.027 2.105.394 2.865 1.115.76.72 1.144 1.692 1.157 2.918.005.06.061.075.075.075.039 0 .057-.039.057-.075-.016-1.291-.422-2.328-1.218-3.083-.796-.756-1.821-1.143-3.039-1.143-.013 0-.025 0-.037 0zm-3.587.787c-.255-.025-.494.082-.643.273l-.59.747c-.149.19-.187.418-.064.629.49.85 1.255 1.84 2.318 2.846 1.044 1.04 2.029 1.84 2.872 2.331.211.123.439.084.629-.065l.747-.59c.19-.149.298-.388.272-.643-.05-.5-.293-.945-.74-1.32-.36-.297-.687-.512-.985-.643-.298-.13-.531-.156-.692-.105-.196.061-.342.219-.467.413-.025.039-.075.052-.117.025-.595-.354-1.179-.929-1.555-1.306-.377-.376-.952-.96-1.305-1.555-.027-.042-.013-.092.025-.117.194-.125.352-.272.413-.468.05-.16.025-.394-.105-.692-.131-.298-.345-.625-.643-.985-.376-.447-.82-.69-1.32-.74zm3.677.605c-.018 0-.052.005-.052.052 0 .039.025.075.075.075 1.038.014 1.872.343 2.535 1.001.662.659.997 1.49 1.012 2.534 0 .039.025.075.075.075.039 0 .057-.039.057-.075-.014-1.105-.378-2.014-1.084-2.717-.706-.703-1.62-1.063-2.724-1.077-.014 0-.024 0-.034 0z" />
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
          aria-label="Центр Плоскирів — головна"
          className="inline-flex items-center gap-2.5 font-display text-[16px] font-bold text-white"
          style={{ letterSpacing: "-0.5px" }}
        >
          <Image
            src="/logo/logo.png"
            alt=""
            width={32}
            height={32}
            className="shrink-0 object-contain"
            style={{ width: 32, height: 32 }}
          />
          <span>
            Плоски<span className="text-accent">рів</span>
          </span>
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
