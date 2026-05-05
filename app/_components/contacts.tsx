import Image from "next/image";
import { Clock, Globe, MapPin, Phone, Share2 } from "lucide-react";
import { contacts } from "@/data/contacts";

const EXTERIOR_IMAGE = "https://images.unsplash.com/photo-1551776235-dde6d4829808?w=1200&q=80";

export default function Contacts() {
  return (
    <section id="contacts" aria-labelledby="contacts-h2" className="bg-surface-alt py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="contacts-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Контакти
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-xl bg-surface p-5 ring-1 ring-rule">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                <MapPin className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">Наша адреса</p>
                <address className="mt-1 text-sm not-italic text-ink-muted">
                  {contacts.address.line1}
                  <br />
                  {contacts.address.line2}
                  <br />
                  {contacts.address.district}
                </address>
              </div>
            </div>
            <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src="/images/map-placeholder.svg"
                alt="Карта розташування стоматології Центр Плоскирів — вул. Бажана 19, Хмельницький"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-4 md:gap-6">
            <div className="rounded-xl bg-surface p-5 ring-1 ring-rule">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Телефон</p>
                  <a href={contacts.phoneHref} className="mt-1 block text-sm text-ink-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
                    {contacts.phone}
                  </a>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                  <Clock className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-ink-muted">{contacts.hours.weekdays}</p>
                  <p className="text-sm text-ink-muted">{contacts.hours.saturday}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-surface p-5 ring-1 ring-rule">
              <p className="text-sm font-medium text-ink">Соціальні мережі</p>
              <div className="mt-3 flex gap-3">
                <a
                  href={contacts.socials.instagram}
                  className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-brand transition-colors hover:bg-brand-tint-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Instagram"
                  rel="noopener"
                >
                  <Share2 className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </a>
                <a
                  href={contacts.socials.facebook}
                  className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-brand transition-colors hover:bg-brand-tint-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Facebook"
                  rel="noopener"
                >
                  <Globe className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-xl bg-surface p-5 ring-1 ring-rule">
              <p className="text-sm font-medium text-ink">Як нас знайти</p>
              <p className="mt-1 text-sm text-ink-muted">Зручне розташування та паркування для наших пацієнтів</p>
              <div className="relative mt-3 aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src={EXTERIOR_IMAGE}
                  alt="Будівля стоматології Центр Плоскирів у Хмельницькому"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <a
          href={contacts.mapDirectionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand px-6 text-base font-medium text-surface transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Прокласти маршрут
        </a>
      </div>
    </section>
  );
}
