import Link from "next/link";
import { Phone } from "lucide-react";
import { heroFeatures } from "@/data/features";
import { contacts } from "@/data/contacts";
import MotionFade from "./motion-fade";
import BannerSlider from "./banner-slider";

export default function Hero() {
  return (
    <section aria-labelledby="hero-h1" className="bg-cream-2">
      <BannerSlider>
        <MotionFade className="mx-auto w-full max-w-md px-4 pb-8 md:max-w-[1200px] md:px-8 md:pb-0">
          <div className="md:max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-cream-2/95 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider text-accent">
              <span aria-hidden="true">★</span>
              Хмельницький · Стоматологія
            </span>
            <h1
              id="hero-h1"
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-[52px] md:leading-[1.05]"
            >
              Ваша <em className="not-italic text-accent-light">здорова</em> посмішка<br />— наша турбота
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-[17px]">
              Сучасна стоматологія з індивідуальним підходом. Лікуємо без болю, працюємо з любов&apos;ю до кожного пацієнта.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#booking"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Записатись на прийом
              </Link>
              <a
                href={contacts.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur transition-colors hover:border-accent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Подзвонити
              </a>
            </div>
          </div>
        </MotionFade>
      </BannerSlider>
    </section>
  );
}
