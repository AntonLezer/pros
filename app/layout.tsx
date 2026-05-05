import type { Metadata, Viewport } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import { contacts } from "@/data/contacts";
import { services } from "@/data/services";

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

const SITE_URL = "https://ploskyriv.com.ua";
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
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#E07B39",
  width: "device-width",
  initialScale: 1,
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}#dentist`,
  name: SITE_NAME,
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: contacts.phone,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "₴₴",
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Бажана, 19",
    addressLocality: CITY,
    addressRegion: "Хмельницька область",
    addressCountry: "UA",
  },
  areaServed: { "@type": "City", name: CITY },
  hasMap: contacts.mapDirectionsHref,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "MedicalProcedure",
      name: s.name,
      description: s.description,
    },
  })),
  medicalSpecialty: "Dentistry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${unbounded.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream font-sans text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
