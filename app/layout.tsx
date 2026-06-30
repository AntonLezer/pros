import type { Metadata, Viewport } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import Footer from "./_components/footer";
import DentistJsonLd from "./_components/structured-data/dentist-json-ld";
import JsonLd from "./_components/structured-data/json-ld";
import { buildFaqSchema, buildWebsiteSchema } from "@/lib/schema/dentist-schema";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const SITE_NAME = "Центр Плоскирів";
const CITY = "Хмельницький";
const TITLE = `Стоматологія у Хмельницькому — ${SITE_NAME}: лікування, імплантація, брекети`;
const DESCRIPTION =
  "Стоматологічна клініка «Центр Плоскирів» у Хмельницькому: терапевтичне лікування, імплантація, брекети, відбілювання, дитяча стоматологія. Запис на консультацію за телефоном.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "стоматологія Хмельницький",
    "стоматолог Хмельницький",
    "лікування зубів Хмельницький",
    "імплантація зубів Хмельницький",
    "брекети Хмельницький",
    "відбілювання зубів Хмельницький",
    "дитяча стоматологія Хмельницький",
    "Центр Плоскирів",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — стоматологія у ${CITY}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    // Add Search Console / Yandex / Bing verification tokens here once issued.
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#E07B39",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${unbounded.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream font-sans text-text">
        <DentistJsonLd />
        <JsonLd data={buildFaqSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Перейти до основного вмісту
        </a>
        <Header />
        <main id="top" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
