"use client";

import { useActionState, useState, useEffect, useRef, startTransition } from "react";
import { submitBooking, type BookingResult } from "../_actions/booking";
import { services } from "@/data/services";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: { sitekey: string; callback?: () => void; "expired-callback"?: () => void },
      ) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

const RECAPTCHA_SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";

const inputBase =
  "w-full rounded-[10px] border-[1.5px] border-cream-2 bg-cream px-4 py-3.5 text-[14px] text-dark placeholder:text-muted/60 transition-colors focus:border-accent focus:bg-white focus:outline-none";

const PHONE_PREFIX = "+380 ";

// Live-formats to "+380 XX XXX XXXX" with a fixed +380 prefix. Strips a leading 380/0 trunk prefix.
function formatPhoneInput(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("380")) d = d.slice(3);
  else if (d.startsWith("0")) d = d.slice(1);
  d = d.slice(0, 9);
  let out = PHONE_PREFIX + d.slice(0, 2);
  if (d.length > 2) out += ` ${d.slice(2, 5)}`;
  if (d.length > 5) out += ` ${d.slice(5, 9)}`;
  return out;
}

export default function BookingForm() {
  const [state, formAction, pending] = useActionState<BookingResult | null, FormData>(
    submitBooking,
    null,
  );
  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [captchaError, setCaptchaError] = useState<string | undefined>();
  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  // Load the reCAPTCHA v2 script and render the "I'm not a robot" checkbox widget.
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    const render = () => {
      if (widgetIdRef.current !== null || !captchaRef.current || !window.grecaptcha?.render) return;
      widgetIdRef.current = window.grecaptcha.render(captchaRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: () => setCaptchaError(undefined),
      });
      console.log("[recaptcha] v2 checkbox rendered");
    };

    if (window.grecaptcha?.render) {
      render();
      return;
    }
    if (!document.querySelector(`script[src="${RECAPTCHA_SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = RECAPTCHA_SCRIPT_SRC;
      s.async = true;
      s.onerror = () => console.error("[recaptcha] script FAILED to load — blocked by an extension/DNS or network error");
      document.head.appendChild(s);
    }
    const iv = setInterval(() => {
      if (window.grecaptcha?.render) {
        clearInterval(iv);
        render();
      }
    }, 200);
    const to = setTimeout(() => clearInterval(iv), 8000);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, []);

  // Read the checkbox response, inject it, then run the server action.
  // The dispatch runs inside startTransition so useActionState's `pending` updates.
  function actionWithRecaptcha(formData: FormData) {
    const widgetId = widgetIdRef.current;
    if (widgetId !== null && window.grecaptcha) {
      const token = window.grecaptcha.getResponse(widgetId);
      if (!token) {
        setCaptchaError("Підтвердіть, що ви не робот");
        return;
      }
      formData.set("recaptchaToken", token);
    }
    setCaptchaError(undefined);
    startTransition(() => formAction(formData));
  }

  // After a server-side rejection, reset the checkbox so its single-use token can be re-issued.
  useEffect(() => {
    if (state && !state.ok && widgetIdRef.current !== null) {
      window.grecaptcha?.reset(widgetIdRef.current);
    }
  }, [state]);

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
      action={actionWithRecaptcha}
      noValidate
      className="rounded-[20px] bg-surface p-8 md:p-10"
    >
      <h3 className="mb-6 font-display text-[18px] font-bold text-dark">Форма запису</h3>

      {/* Honeypot: hidden from humans, bots tend to fill it. Submissions with it set are dropped. */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

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
            placeholder="+380 00 000 0000"
            value={phone}
            onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
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

      {RECAPTCHA_SITE_KEY && (
        <div className="mt-4">
          <div ref={captchaRef} />
          {captchaError && (
            <p className="mt-2 text-[13px] text-red-600" role="alert">
              {captchaError}
            </p>
          )}
        </div>
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
