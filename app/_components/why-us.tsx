import { Check } from "lucide-react";
import { whyUsItems } from "@/data/features";

export default function WhyUs() {
  return (
    <section id="about" aria-labelledby="why-h2" className="py-12 md:py-20">
      <div className="mx-auto w-full max-w-md px-4 md:max-w-6xl md:px-8">
        <h2 id="why-h2" className="text-center text-2xl font-semibold text-ink md:text-3xl">
          Чому обирають нас
        </h2>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand" aria-hidden="true" />

        <ul className="mx-auto mt-8 max-w-3xl grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {whyUsItems.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl bg-surface p-4 ring-1 ring-rule">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-surface">
                <Check className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="text-sm text-ink md:text-base">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
