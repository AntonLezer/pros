"use server";

import { headers } from "next/headers";
import { services } from "@/data/services";

export type BookingResult =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: { name?: string; phone?: string };
      values?: {
        name: string;
        phone: string;
        service?: string;
        date?: string;
        comment?: string;
      };
    };

const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const submissions = new Map<string, number[]>();

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

// Normalizes any accepted input to "+380 68 123 4567". Falls back to the raw value if unexpected.
function formatPhone(phone: string): string {
  const digits = digitsOnly(phone);
  let national = digits;
  if (digits.length === 12 && digits.startsWith("380")) national = digits.slice(3);
  else if (digits.length === 10 && digits.startsWith("0")) national = digits.slice(1);
  if (national.length !== 9) return phone.trim();
  return `+380 ${national.slice(0, 2)} ${national.slice(2, 5)} ${national.slice(5)}`;
}

function validate(name: string, phone: string): { name?: string; phone?: string } {
  const errors: { name?: string; phone?: string } = {};
  if (name.trim().length < 2) errors.name = "Введіть ім'я (мін. 2 символи)";
  const digits = digitsOnly(phone);
  if (digits.length !== 10 && digits.length !== 12) {
    errors.phone = "Введіть телефон (наприклад, 068 000 0000)";
  }
  return errors;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Sends the booking to Telegram. Returns true if at least one recipient received it.
async function sendTelegramNotification(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = [601978001, 1124450777, 8703175598]

  if (!token || chatIds.length === 0) {
    console.warn("[booking] Telegram not configured (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_IDS)");
    return false;
  }

  const results = await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        });
        if (!res.ok) {
          console.error(`[booking] Telegram error for chat ${chatId}:`, await res.text());
          return false;
        }
        return true;
      } catch (err) {
        console.error(`[booking] Telegram request failed for chat ${chatId}:`, err);
        return false;
      }
    }),
  );

  return results.some(Boolean);
}

// Verifies a reCAPTCHA v3 token with Google. Skips (returns true) when no secret is configured.
async function verifyRecaptcha(token: string, ip: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("[booking] reCAPTCHA not configured (RECAPTCHA_SECRET_KEY) — skipping verification");
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    return data.success === true && (data.score ?? 0) >= 0.5;
  } catch (err) {
    console.error("[booking] reCAPTCHA verification failed:", err);
    return false;
  }
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
  formData: FormData,
): Promise<BookingResult> {
  const name = String(formData.get("name") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const service = String(formData.get("service") ?? "");
  const date = String(formData.get("date") ?? "");
  const comment = String(formData.get("comment") ?? "");
  const recaptchaToken = String(formData.get("recaptchaToken") ?? "");

  const values = { name, phone, service, date, comment };

  const fieldErrors = validate(name, phone);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Перевірте поля форми", fieldErrors, values };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  if (isRateLimited(ip)) {
    return { ok: false, error: "Забагато спроб. Спробуйте за кілька хвилин.", values };
  }

  const humanVerified = await verifyRecaptcha(recaptchaToken, ip);
  if (!humanVerified) {
    return { ok: false, error: "Не вдалося підтвердити, що ви не робот. Спробуйте ще раз.", values };
  }

  console.log("[booking]", {
    ts: new Date().toISOString(),
    name: name.trim(),
    phone: digitsOnly(phone),
    service: service || undefined,
    date: date || undefined,
    comment: comment.trim() || undefined,
  });

  const serviceName = services.find((s) => s.id === service)?.name ?? service;

  const message = [
    "🦷 <b>Нова заявка на прийом</b>",
    "",
    `👤 <b>Ім'я:</b> ${escapeHtml(name.trim())}`,
    `📞 <b>Телефон:</b> ${escapeHtml(formatPhone(phone))}`,
    serviceName ? `🩺 <b>Послуга:</b> ${escapeHtml(serviceName)}` : "",
    date ? `📅 <b>Бажана дата:</b> ${escapeHtml(date)}` : "",
    comment.trim() ? `💬 <b>Коментар:</b> ${escapeHtml(comment.trim())}` : "",
    "",
    `⏰ ${new Date().toLocaleString("uk-UA", { timeZone: "Europe/Kiev" })}`,
  ]
    .filter(Boolean)
    .join("\n");

  const sent = await sendTelegramNotification(message);
  if (!sent && process.env.NODE_ENV === "production") {
    return {
      ok: false,
      error: "Не вдалося надіслати заявку. Зателефонуйте нам, будь ласка.",
      values,
    };
  }

  return { ok: true };
}
