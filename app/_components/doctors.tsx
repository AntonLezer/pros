import Image from "next/image";
import { doctors } from "@/data/doctors";

function pluralizeYears(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} рік`;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} роки`;
  return `${n} років`;
}

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-h2" className="bg-cream py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
          Наша команда
        </p>
        <h2
          id="doctors-h2"
          className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
        >
          Лікарі, яким довіряють
        </h2>
        <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-muted">
          Кожен спеціаліст — сертифікований фахівець із постійним підвищенням кваліфікації.
        </p>

        <ul className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 md:grid-cols-3">
          {doctors.map((d) => (
            <li key={d.id} className="w-[78%] shrink-0 snap-start overflow-hidden rounded-[20px] bg-surface transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] sm:w-auto sm:shrink">
              <div className="relative aspect-[3/4] bg-cream-2">
                {d.image ? (
                  <Image
                    src={d.image}
                    alt={`${d.name} — ${d.specialty}, стоматологія Центр Плоскирів у Хмельницькому`}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center font-display text-3xl font-bold text-accent">
                    {d.initials}
                  </span>
                )}
              </div>
              <div className="p-5 pt-5 md:px-6 md:pb-6">
                {/* <h3 className="font-display text-[15px] font-semibold leading-snug text-dark">
                  {d.name}
                </h3> */}
                <p className="mt-1 text-[13px] font-medium text-accent">{d.specialty}</p>
                {d.experienceYears !== undefined && (
                  <p className="mt-2 text-[13px] text-muted">Досвід: {pluralizeYears(d.experienceYears)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
