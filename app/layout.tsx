import type { Metadata, Viewport } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import { contacts } from "@/data/contacts";
import { services } from "@/data/services";
import googleReviewsData from "@/data/google-reviews.json";

type SchemaReview = { rating: number; authorName: string; text: string };
const reviews = googleReviewsData.reviews as SchemaReview[];
import { doctors } from "@/data/doctors";
import { faqItems } from "@/data/faq";
import Header from "./_components/header";
import Footer from "./_components/footer";

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
  // NOTE: robots are set to NOINDEX while this site lives on a test domain.
  // When migrating to production, flip to `index: true, follow: true` and add
  // `googleBot: { "max-image-preview": "large" }` for image-rich SERP previews.
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

const ratingValue = reviews.length
  ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
  : null;

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalClinic"],
  "@id": `${SITE_URL}#dentist`,
  name: SITE_NAME,
  alternateName: "Стоматологія Плоскирів",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: contacts.phone,
  email: "info@ploskyriv.ua",
  image: [`${SITE_URL}/opengraph-image`],
  logo: `${SITE_URL}/logo/logo.png`,
  priceRange: "₴₴",
  paymentAccepted: ["Cash", "Credit Card", "Installment"],
  currenciesAccepted: "UAH",
  sameAs: [contacts.socials.instagram],
  address: {
    "@type": "PostalAddress",
    streetAddress: "вул. Бажана, 19",
    addressLocality: CITY,
    addressRegion: "Хмельницька область",
    addressCountry: "UA",
    postalCode: "29000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.411865,
    longitude: 27.013272,
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
  ...(ratingValue
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue,
          reviewCount: reviews.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
          },
          author: { "@type": "Person", name: r.authorName },
          reviewBody: r.text,
        })),
      }
    : {}),
  employee: doctors.map((d) => ({
    "@type": "Physician",
    "@id": `${SITE_URL}#${d.id}`,
    // name: d.name,
    jobTitle: d.specialty,
    image: d.image ? `${SITE_URL}${d.image}` : undefined,
    medicalSpecialty: "Dentistry",
    knowsLanguage: ["uk", "ru"],
  })),
  makesOffer: services.flatMap((s) => {
    const primary = {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: s.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "UAH",
        price: s.priceFrom,
        valueAddedTaxIncluded: true,
      },
      itemOffered: {
        "@type": "MedicalProcedure",
        name: s.name,
        description: s.description,
      },
    };
    if (!s.extraOffer) return [primary];
    const extra = {
      "@type": "Offer",
      priceCurrency: "UAH",
      price: s.extraOffer.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "UAH",
        price: s.extraOffer.priceFrom,
        valueAddedTaxIncluded: true,
      },
      itemOffered: {
        "@type": "MedicalProcedure",
        name: `${s.name} — ${s.extraOffer.label}`,
        description: `${s.extraOffer.label} зубів, ${s.name.toLowerCase()}.`,
      },
    };
    return [primary, extra];
  }),
  medicalSpecialty: "Dentistry",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}#faq`,
  mainEntity: faqItems.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer,
    },
  })),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "uk-UA",
  publisher: { "@id": `${SITE_URL}#dentist` },
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/#booking`,
      actionPlatform: [
        "https://schema.org/DesktopWebPlatform",
        "https://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Reservation",
      name: "Прийом стоматолога",
    },
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
