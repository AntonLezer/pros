"use client";

import { useActionState } from "react";
import { submitBooking, type BookingResult } from "../_actions/booking";

export default function BookingForm() {
  const [state, formAction, pending] = useActionState<BookingResult | null, FormData>(submitBooking, null);

  if (state?.ok) {
    return (
      <div className="rounded-xl bg-surface p-6 text-center text-ink ring-1 ring-rule">
        <p className="text-lg font-semibold">Дякуємо!</p>
        <p className="mt-2 text-sm text-ink-muted">Ми зв&apos;яжемося з вами найближчим часом.</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-rule bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          Надіслати ще одну заявку
        </button>
      </div>
    );
  }

  const nameError = state && !state.ok ? state.fieldErrors?.name : undefined;
  const phoneError = state && !state.ok ? state.fieldErrors?.phone : undefined;
  const generalError = state && !state.ok ? state.error : undefined;
  const initialName = state && !state.ok ? state.values?.name ?? "" : "";
  const initialPhone = state && !state.ok ? state.values?.phone ?? "" : "";

  return (
    <form action={formAction} className="grid gap-3" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Ваше ім&apos;я
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          defaultValue={initialName}
          aria-invalid={Boolean(nameError) || undefined}
          aria-describedby={nameError ? "name-error" : undefined}
          className="mt-1 block h-12 w-full rounded-md border border-rule bg-surface px-3 text-base text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          placeholder="Олена"
        />
        {nameError && (
          <p id="name-error" className="mt-1 text-sm text-red-700">
            {nameError}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          defaultValue={initialPhone}
          aria-invalid={Boolean(phoneError) || undefined}
          aria-describedby={phoneError ? "phone-error" : undefined}
          className="mt-1 block h-12 w-full rounded-md border border-rule bg-surface px-3 text-base text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          placeholder="+380 68 123 4567"
        />
        {phoneError && (
          <p id="phone-error" className="mt-1 text-sm text-red-700">
            {phoneError}
          </p>
        )}
      </div>
      {generalError && !nameError && !phoneError && (
        <p className="text-sm text-red-700" role="alert">
          {generalError}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-6 text-base font-medium text-surface transition-colors hover:bg-brand-dark disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        {pending ? "Надсилаємо..." : "Записатися"}
      </button>
    </form>
  );
}
