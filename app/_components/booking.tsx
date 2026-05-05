import BookingForm from "./booking-form";

const STEPS = [
  "Заповніть форму та оберіть послугу",
  "Ми підтвердимо запис і час",
  "Приходьте та отримайте допомогу",
];

export default function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-h2"
      className="bg-dark py-16 md:py-[100px]"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent-light">
              Запис на прийом
            </p>
            <h2
              id="booking-h2"
              className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-white"
            >
              Запишіться онлайн
            </h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/55">
              Залиште заявку — і ми передзвонимо вам протягом 15 хвилин, щоб підтвердити зручний час.
            </p>

            <ol className="mt-8 flex flex-col gap-4">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-3 text-[14px] text-white/70">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-bold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  );
}
