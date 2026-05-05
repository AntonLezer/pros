import { whyUsStats } from "@/data/why-us";

export default function WhyUs() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-h2"
      className="bg-dark py-16 text-white md:py-[100px]"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent-light">
          Чому обирають нас
        </p>
        <h2
          id="why-us-h2"
          className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-white"
        >
          Ми дбаємо про кожного пацієнта
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 md:grid-cols-4">
          {whyUsStats.map((s) => (
            <li key={s.id} className="text-center">
              <p className="font-display text-[48px] font-bold leading-none text-accent">
                {s.value}
              </p>
              <h3 className="mt-3 text-[16px] font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/50">{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
