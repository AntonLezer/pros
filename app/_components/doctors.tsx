import { doctors } from "@/data/doctors";
import DoctorsDots from "./doctors-dots";
import MotionLi from "./motion-li";

const TRACK_ID = "doctors-track";

function pluralizeYears(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return `${n} рік`;
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return `${n} роки`;
  return `${n} років`;
}

function DoctorCard({ d }: { d: (typeof doctors)[number] }) {
  return (
    <article className="h-full overflow-hidden rounded-xl bg-surface ring-1 ring-rule">
      <div className="aspect-[4/5] grid place-items-center bg-brand-tint">
        <span className="text-3xl font-semibold text-brand-dark">{d.initials}</span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-ink">{d.name}</h3>
        <p className="mt-1 text-sm text-ink-muted">{d.specialty}</p>
        <p className="mt-2 text-xs text-ink-muted">Досвід {pluralizeYears(d.experienceYears)}</p>
      </div>
    </article>
  );
}

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-h2" className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-md md:max-w-6xl md:px-8">
        <h2 id="doctors-h2" className="px-4 text-center text-2xl font-semibold text-ink md:text-3xl md:px-0">
          Наші лікарі
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        {/* Mobile carousel */}
        <ul
          id={TRACK_ID}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {doctors.map((d) => (
            <li key={d.id} data-card className="snap-center shrink-0 w-[80%]">
              <DoctorCard d={d} />
            </li>
          ))}
        </ul>
        <DoctorsDots count={doctors.length} trackId={TRACK_ID} />

        {/* Desktop grid */}
        <ul className="mt-8 hidden grid-cols-4 gap-6 md:grid">
          {doctors.map((d, i) => (
            <MotionLi key={d.id} index={i}>
              <DoctorCard d={d} />
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  );
}
