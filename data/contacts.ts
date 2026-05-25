export type Contacts = {
  address: { line1: string; line2: string; district: string };
  phone: string;
  phoneHref: string;
  viberHref: string;
  telegramHref: string;
  hours: { weekdays: string; saturday: string };
  socials: { instagram: string };
  mapDirectionsHref: string;
  googlePlaceId: string;
};

export const contacts: Contacts = {
  address: {
    line1: "м. Хмельницький,",
    line2: "вул. Бажана, 19",
    district: "(р-н Заготзерно)",
  },
  phone: "+38 068 38 00 052",
  phoneHref: "tel:+380683800052",
  viberHref: "viber://chat?number=+380683800052",
  telegramHref: "https://t.me/+380683800052",
  hours: {
    weekdays: "Пн–Пт: 9:00 – 18:00",
    saturday: "Сб: за домовленістю",
  },
  socials: {
    instagram: "https://www.instagram.com/stomat_ploskiriv/",
  },
  mapDirectionsHref:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent("вул. Бажана 19, Хмельницький"),
  googlePlaceId: "ChIJMZvh8zgGMkcRoakypy9IenM",
};
