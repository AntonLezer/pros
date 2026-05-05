import { Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import ReviewsDots from "./reviews-dots";
import MotionLi from "./motion-li";

const TRACK_ID = "reviews-track";

export default function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-h2" className="bg-surface-alt py-12 md:py-20">
      <div className="mx-auto w-full max-w-md md:max-w-6xl md:px-8">
        <h2 id="reviews-h2" className="px-4 text-center text-2xl font-semibold text-ink md:text-3xl md:px-0">
          Відгуки пацієнтів
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        {/* Mobile carousel */}
        <ul
          id={TRACK_ID}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((r) => (
            <li key={r.id} data-card className="snap-center shrink-0 w-[85%]">
              <article className="h-full rounded-xl bg-surface p-5 ring-1 ring-rule">
                <div className="flex items-center gap-1 text-brand" aria-label={`Оцінка ${r.rating} з 5`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden="true" />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-brand-dark">
                    {r.initials}
                  </span>
                  <span className="text-sm font-medium text-ink">{r.name}</span>
                </div>
                <p className="mt-3 text-sm text-ink-muted">{r.text}</p>
              </article>
            </li>
          ))}
        </ul>
        <ReviewsDots count={reviews.length} trackId={TRACK_ID} />

        {/* Desktop grid */}
        <ul className="mt-8 hidden grid-cols-3 gap-6 md:grid">
          {reviews.slice(0, 3).map((r, i) => (
            <MotionLi key={r.id} index={i}>
              <article className="h-full rounded-xl bg-surface p-5 ring-1 ring-rule">
                <div className="flex items-center gap-1 text-brand" aria-label={`Оцінка ${r.rating} з 5`}>
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" strokeWidth={1.5} aria-hidden="true" />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-brand-dark">
                    {r.initials}
                  </span>
                  <span className="text-sm font-medium text-ink">{r.name}</span>
                </div>
                <p className="mt-3 text-sm text-ink-muted">{r.text}</p>
              </article>
            </MotionLi>
          ))}
        </ul>
      </div>
    </section>
  );
}
