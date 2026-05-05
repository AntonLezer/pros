import { services } from "@/data/services";

const priceFormatter = new Intl.NumberFormat("uk-UA");

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-h2" className="bg-surface py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <header className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Що ми лікуємо
            </p>
            <h2
              id="services-h2"
              className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
            >
              Наші послуги
            </h2>
          </div>
          <p className="max-w-[560px] text-[16px] leading-relaxed text-muted">
            Повний спектр стоматологічних послуг для всієї родини — від дітей до людей похилого віку.
          </p>
        </header>

        <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-3">
          {services.map((s) => (
            <li
              key={s.id}
              className="min-w-[85%] shrink-0 snap-start rounded-[20px] border border-transparent bg-cream p-7 transition-all hover:-translate-y-1 hover:border-accent/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:min-w-0 sm:shrink md:p-8"
            >
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-white">
                <s.Icon className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="mb-2 font-display text-[15px] font-semibold leading-snug text-dark">
                {s.name}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted">{s.description}</p>
              <p className="mt-4 text-[14px] font-semibold text-accent">
                від {priceFormatter.format(s.priceFrom)} грн
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
