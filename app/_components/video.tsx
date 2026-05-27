"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";

const VIDEO_EMBED_URL =
  "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

export default function Video() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="video"
      aria-labelledby="video-h2"
      className="bg-surface py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[1.5px] text-accent">
            Про нашу клініку
          </p>
          <h2
            id="video-h2"
            className="mt-3 font-display text-[clamp(22px,2.8vw,40px)] font-bold leading-tight tracking-tight text-dark"
          >
            Побачте нас зсередини
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-relaxed text-muted">
            Ми знімаємо страх перед стоматологом. Подивіться, як виглядає лікування у нас — затишна атмосфера, сучасне обладнання та уважні лікарі.
          </p>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Відкрити відеоогляд клініки"
                className="group relative mt-12 block aspect-video w-full overflow-hidden rounded-[28px] bg-dark shadow-[0_32px_80px_rgba(0,0,0,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(135deg,#3D2E24_0%,#251A14_50%,#1C1C1E_100%)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 grid place-items-center"
                >
                  <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    fill="none"
                    className="opacity-15"
                  >
                    <circle cx="60" cy="60" r="56" stroke="white" strokeWidth="2" />
                    <rect
                      x="20"
                      y="30"
                      width="80"
                      height="60"
                      rx="6"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle cx="40" cy="50" r="8" stroke="white" strokeWidth="1.5" />
                    <path
                      d="M20 75 L38 55 L55 68 L72 48 L100 75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.5)_100%)]"
                />

                <span className="absolute left-5 top-5 z-10 inline-flex items-center rounded-full bg-accent px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.5px] text-white">
                  ▶ Відеоогляд клініки
                </span>

                <span className="absolute bottom-5 right-5 z-10 rounded-full bg-black/60 px-3 py-1 text-[13px] font-semibold text-white backdrop-blur">
                  2:34
                </span>

                <span className="absolute left-1/2 top-1/2 z-10 grid h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-200 ease-out group-hover:scale-110 group-hover:shadow-[0_12px_48px_rgba(224,123,57,0.4)] md:h-20 md:w-20">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="ml-1 h-[22px] w-[22px] fill-accent md:h-7 md:w-7"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[9000] bg-black/[0.88] backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed left-1/2 top-1/2 z-[9001] w-[calc(100%-3rem)] max-w-[920px] -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
              >
                <Dialog.Title className="sr-only">
                  Відеоогляд стоматології Плоскирів
                </Dialog.Title>
                <Dialog.Close
                  aria-label="Закрити відео"
                  className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Dialog.Close>
                <div className="aspect-video w-full overflow-hidden rounded-[20px] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                  {open && (
                    <iframe
                      src={VIDEO_EMBED_URL}
                      title="Відеоогляд стоматології Плоскирів"
                      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  )}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            Стоматологія Плоскирів — місце, де про вас дбають. Хмельницький, вул. Бажана ,19  ,р-н Заготзерно
          </p>
        </div>
      </div>
    </section>
  );
}
