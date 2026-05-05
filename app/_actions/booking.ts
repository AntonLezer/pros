"use server";

import { headers } from "next/headers";

export type BookingResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: { name?: string; phone?: string }; values?: { name: string; phone: string } };

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const submissions = new Map<string, number[]>();

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function validate(name: string, phone: string): { name?: string; phone?: string } {
  const errors: { name?: string; phone?: string } = {};
  if (name.trim().length < 2) errors.name = "Введіть ім'я (мін. 2 символи)";
  const digits = digitsOnly(phone);
  if (digits.length !== 10 && digits.length !== 12) {
    errors.phone = "Введіть телефон (наприклад, 068 123 4567)";
  }
  return errors;
}

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV !== "production") return false;
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

export async function submitBooking(
  _prev: BookingResult | null,
  formData: FormData
): Promise<BookingResult> {
  const name = String(formData.get("name") ?? "");
  const phone = String(formData.get("phone") ?? "");

  const fieldErrors = validate(name, phone);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      error: "Перевірте поля форми",
      fieldErrors,
      values: { name, phone },
    };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return {
      ok: false,
      error: "Забагато спроб. Спробуйте за кілька хвилин.",
      values: { name, phone },
    };
  }

  // TODO: wire delivery (email or Telegram) when credentials are provided.
  console.log("[booking]", {
    ts: new Date().toISOString(),
    name: name.trim(),
    phone: digitsOnly(phone),
  });

  return { ok: true };
}
