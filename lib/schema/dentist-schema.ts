import { contacts } from "@/data/contacts";
import { doctors } from "@/data/doctors";
import { faqItems } from "@/data/faq";
import { services } from "@/data/services";

const SITE_URL = "https://www.mnvcploskiriv.com.ua";
const SITE_NAME = "Центр Плоскирів";
const CITY = "Хмельницький";
const DESCRIPTION =
  "Стоматологічна клініка «Центр Плоскирів» у Хмельницькому: терапевтичне лікування, імплантація, брекети, відбілювання, дитяча стоматологія. Запис на консультацію за телефоном.";

type SchemaReview = { rating: number; authorName: string; text: string };

export function buildDentistSchema(reviews: SchemaReview[] = []) {
  const ratingValue = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}#dentist`,
    name: SITE_NAME,
    alternateName: ["Стоматологія Плоскирів", "Медичний науково-виробничий центр Плоскирів"],
    description: `${DESCRIPTION} Адреса: ${CITY}, ${contacts.address.line2}, ${contacts.address.district.replace(/[()]/g, "").trim()}.`,
    url: SITE_URL,
    telephone: contacts.phone.replace(/\s/g, ""),
    email: "mnvc.ploskiriv@gmail.com",
    image: [`${SITE_URL}/opengraph-image`],
    logo: `${SITE_URL}/logo/logo.png`,
    priceRange: "₴₴",
    paymentAccepted: ["Cash", "Credit Card"],
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
    areaServed: {
      "@type": "City",
      name: CITY,
    },
    hasMap: contacts.mapDirectionsHref,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "18:00",
        description: contacts.hours.saturday,
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
      name: d.name,
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
        itemOffered: {
          "@type": "MedicalProcedure",
          name: s.name,
          description: s.description,
        },
      };
      if (!s.extraOffer) return [primary];
      return [
        primary,
        {
          "@type": "Offer",
          priceCurrency: "UAH",
          price: s.extraOffer.priceFrom,
          itemOffered: {
            "@type": "MedicalProcedure",
            name: `${s.name} — ${s.extraOffer.label}`,
            description: `${s.extraOffer.label}, ${s.name.toLowerCase()}.`,
          },
        },
      ];
    }),
    medicalSpecialty: "Dentistry",
  };
}

export function buildFaqSchema() {
  return {
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
}

export function buildWebsiteSchema() {
  return {
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
}
