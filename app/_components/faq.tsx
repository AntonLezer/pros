import Link from "next/link";
import { contacts } from "@/data/contacts";
import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-h2" className="bg-surface py-16 md:py-[100px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
              Часті питання
            </p>
            <h2
              id="faq-h2"
              className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
            >
              FAQ
            </h2>
            <p className="mb-9 mt-4 max-w-[560px] text-[16px] leading-relaxed text-muted">
              Відповіді на найпоширеніші питання наших пацієнтів.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="rounded-[20px] bg-accent p-9 text-white md:p-10">
            <h3 className="font-display text-[22px] font-bold leading-tight">
              Є ще питання? Зателефонуйте нам!
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-white/85">
              Наші консультанти відповідають щодня з 9:00 до 18:00 і з радістю допоможуть вам.
            </p>
            <a
              href={contacts.phoneHref}
              className="mt-6 block font-display text-[20px] font-bold text-white"
            >
              {contacts.phone}
            </a>
            <Link
              href="#booking"
              className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-semibold text-accent transition-colors hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
            >
              Записатись онлайн
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
