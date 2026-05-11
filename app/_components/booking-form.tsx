"use client";

import { useActionState } from "react";
import { submitBooking, type BookingResult } from "../_actions/booking";
import { services } from "@/data/services";

const inputBase =
  "w-full rounded-[10px] border-[1.5px] border-cream-2 bg-cream px-4 py-3.5 text-[14px] text-dark placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-white focus:outline-none";

export default function BookingForm() {
  const [state, formAction, pending] = useActionState<BookingResult | null, FormData>(
    submitBooking,
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-[20px] bg-surface p-10 text-center">
        <p className="font-display text-xl font-bold text-dark">Дякуємо!</p>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Ваша заявка отримана — ми зв&apos;яжемося з вами протягом 15 хвилин.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-[14px] font-semibold text-white transition-[transform,background-color] duration-200 ease-out hover:bg-accent-dark active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  const nameError = state && !state.ok ? state.fieldErrors?.name : undefined;
  const phoneError = state && !state.ok ? state.fieldErrors?.phone : undefined;
  const generalError = state && !state.ok ? state.error : undefined;
  const v = state && !state.ok ? state.values : undefined;

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-[20px] bg-surface p-8 md:p-10"
    >
      <h3 className="mb-6 font-display text-[18px] font-bold text-dark">Форма запису</h3>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-[13px] font-medium text-text">
            Ваше ім&apos;я *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Ольга Іваненко"
            defaultValue={v?.name ?? ""}
            aria-invalid={Boolean(nameError) || undefined}
            aria-describedby={nameError ? "name-error" : undefined}
            className={inputBase}
          />
          {nameError && (
            <p id="name-error" className="text-[12px] text-red-600">
              {nameError}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-[13px] font-medium text-text">
            Телефон *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="+380 68 123 4567"
            defaultValue={v?.phone ?? ""}
            aria-invalid={Boolean(phoneError) || undefined}
            aria-describedby={phoneError ? "phone-error" : undefined}
            className={inputBase}
          />
          {phoneError && (
            <p id="phone-error" className="text-[12px] text-red-600">
              {phoneError}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <label htmlFor="service" className="text-[13px] font-medium text-text">
          Послуга
        </label>
        <select id="service" name="service" defaultValue={v?.service ?? ""} className={inputBase}>
          <option value="">Оберіть послугу</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <label htmlFor="date" className="text-[13px] font-medium text-text">
          Дата
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={v?.date ?? ""}
          className={inputBase}
        />
      </div>

      <div className="mt-3 flex flex-col gap-1.5">
        <label htmlFor="comment" className="text-[13px] font-medium text-text">
          Коментар
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={3}
          placeholder="Ваше питання або скарга..."
          defaultValue={v?.comment ?? ""}
          className={`${inputBase} resize-y`}
        />
      </div>

      {generalError && !nameError && !phoneError && (
        <p className="mt-3 text-[13px] text-red-600" role="alert">
          {generalError}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-[15px] font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:bg-accent-dark hover:shadow-[0_8px_24px_rgba(224,123,57,0.3)] active:scale-[0.97] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {pending ? "Надсилаємо..." : "Записатись на прийом"}
      </button>
    </form>
  );
}
