import { services } from "@/data/services";
import MotionLi from "./motion-li";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-h2" className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="services-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Наші послуги
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <MotionLi
              key={s.id}
              index={i}
              className="rounded-xl border border-rule bg-surface p-5"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-tint text-brand">
                <s.Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{s.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.description}</p>
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  );
}
