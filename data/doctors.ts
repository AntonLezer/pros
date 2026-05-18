export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears?: number;
  initials: string;
  image?: string;
};

export const doctors: Doctor[] = [
    {
    id: "administrator",
    name: "Любов",
    specialty: "Адміністратор, координатор всіх процесів клініки",
    //experienceYears: 5,
    initials: "ІП",
    image: "/images/doctors/IMG_9420.jpg",
  },
  {
    id: "chief-technician",
    name: "Анатолій",
    specialty: "Головний зубний технік клініки",
    experienceYears: 38,
    initials: "ІП",
    image: "/images/doctors/IMG_9049.jpg",
  },  
  {
    id: "ploskyriv",
    name: "Вадим",
    specialty: "Головний лікар, імплантолог",
    experienceYears: 12,
    initials: "ІП",
    image: "/images/doctors/IMG_8994.jpg",
  },
  {
    id: "kovalchuk",
    name: "Євгенія",
    specialty: "Стоматолог загальної практики , ортодонт",
    experienceYears: 8,
    initials: "ОК",
    image: "/images/doctors/IMG_8982.jpg",
  },
  {
    id: "melnyk",
    name: "Катерина",
    specialty: "Стоматолог терапевт , ендодонтист",
    experienceYears: 12,
    initials: "ЮМ",
    image: "/images/doctors/IMG_9027.jpg",
  },
  {
    id: "technician",
    name: "Пушкіна Ірина",
    specialty: "Зубний технік",
    experienceYears: 20,
    initials: "ІП",
    image: "/images/doctors/IMG_9050.jpg",
  },
];
