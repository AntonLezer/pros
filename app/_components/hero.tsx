import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { heroFeatures } from "@/data/features";
import { contacts } from "@/data/contacts";
import MotionFade from "./motion-fade";

const HERO_IMAGE = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80";

export default function Hero() {
  return (
    <section aria-labelledby="hero-h1" className="bg-surface-alt">
      <div className="mx-auto w-full max-w-md px-4 pt-6 pb-10 md:max-w-6xl md:px-8 md:py-16 md:grid md:grid-cols-2 md:gap-10 md:items-center">
        <MotionFade>
          <span className="inline-block rounded-full bg-brand-tint px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-dark">
            Сучасна стоматологія у Хмельницькому
          </span>
          <h1 id="hero-h1" className="mt-4 text-3xl font-semibold leading-tight text-ink md:text-5xl md:leading-tight">
            Лікуємо зуби<br />з турботою про вас
          </h1>
          <p className="mt-4 text-ink-muted md:text-lg">
            Комплексний підхід, новітні технології та комфорт на кожному етапі лікування.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#booking-form"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-medium text-surface transition-colors hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Записатися на прийом
            </Link>
            <a
              href={contacts.phoneHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-rule bg-surface px-6 text-base font-medium text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Подзвонити
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-3 gap-3 md:mt-10 md:gap-6">
            {heroFeatures.map((f) => (
              <li key={f.id} className="flex flex-col items-start gap-2 text-xs text-ink-muted md:text-sm">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-tint text-brand">
                  <f.Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </MotionFade>

        <MotionFade className="mt-8 md:mt-0" delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-tint">
            <Image
              src={HERO_IMAGE}
              alt="Команда лікарів стоматології Центр Плоскирів у Хмельницькому"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
