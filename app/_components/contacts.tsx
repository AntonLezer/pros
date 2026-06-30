import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contacts } from "@/data/contacts";
import ViberIcon from "./icons/viber";

const ADDRESS_FULL = `${contacts.address.line2}, Хмельницький`;
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_EMBED_SRC = GOOGLE_MAPS_API_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(ADDRESS_FULL)}`
  : `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FULL)}&output=embed`;

const EMAIL = "mnvc.ploskiriv@gmail.com";

function TelegramIcon({
  className,
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
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

export default function Contacts() {
  return (
    <section id="contacts" aria-labelledby="contacts-h2" className="bg-cream py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
          Як нас знайти
        </p>
        <h2
          id="contacts-h2"
          className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
        >
          Контакти
        </h2>
        <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-muted">
          Стоматологія Хмельницький — вул. Бажана, 19, р-н Заготзерно. Зручне розташування для
          мешканців району: стоматолог поруч, без довгих поїздок по місту.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <ContactRow icon={MapPin} label="Адреса">
              <address className="not-italic">
                {contacts.address.line2}
                <br />
                {contacts.address.line1.replace(",", "")}{" "}
                {contacts.address.district}
              </address>
            </ContactRow>

            <ContactRow icon={Phone} label="Телефон">
              <a href={contacts.phoneHref} className="transition-colors hover:text-accent">
                {contacts.phone}
              </a>
            </ContactRow>

            <ContactRow icon={ViberIcon} label="Viber">
              <a href={contacts.viberHref} className="transition-colors hover:text-accent">
                {contacts.phone}
              </a>
            </ContactRow>

            <ContactRow icon={TelegramIcon} label="Telegram">
              <a
                href={contacts.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-accent"
              >
                {contacts.phone}
              </a>
            </ContactRow>

            <ContactRow icon={Clock} label="Графік роботи">
              {contacts.hours.weekdays}
              <br />
              {contacts.hours.saturday}
            </ContactRow>

            <ContactRow icon={Mail} label="Email">
              <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-accent">
                {EMAIL}
              </a>
            </ContactRow>
          </div>

          <div className="overflow-hidden rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
            <iframe
              src={MAP_EMBED_SRC}
              title={`Карта Google: ${ADDRESS_FULL}`}
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-surface text-accent shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-[13px] font-semibold uppercase tracking-[0.5px] text-muted">
          {label}
        </h3>
        <div className="mt-1 text-[15px] font-medium leading-snug text-dark">{children}</div>
      </div>
    </div>
  );
}
