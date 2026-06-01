export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears?: number | string;
  initials: string;
  image?: string;
};

export const doctors: Doctor[] = [
    {
    id: "administrator",
    name: "Любов Андріївна",
    specialty: "Адміністратор, координатор всіх процесів клініки",
    //experienceYears: 5,
    initials: "ІП",
    image: "/images/doctors/IMG_9420.jpg",
  },
  {
    id: "chief-technician",
    name: "Анатолій Михайлович",
    specialty: "Головний зубний технік клініки",
    experienceYears: 38,
    initials: "ІП",
    image: "/images/doctors/IMG_9049.jpg",
  },  
  {
    id: "ploskyriv",
    name: "Вадим Олександрович",
    specialty: "хірург-імплантолог",
    experienceYears: "10+",
    initials: "ІП",
    image: "/images/doctors/IMG_8994.jpg",
  },
  {
    id: "kovalchuk",
    name: "Євгенія Володимирівна",
    specialty: "стоматолог загальної практики, ортодонт",
    experienceYears: "8+",
    initials: "ОК",
    image: "/images/doctors/IMG_8982.jpg",
  },
  {
    id: "melnyk",
    name: "Катерина Петрівна",
    specialty: "стоматолог-терапевт, ендодонтист",
    experienceYears: "12+",
    initials: "ЮМ",
    image: "/images/doctors/IMG_9027.jpg",
  },
  {
    id: "technician",
    name: "Ірина Петрівна",
    specialty: "Зубний технік",
    experienceYears: 20,
    initials: "ІП",
    image: "/images/doctors/IMG_9050.jpg",
  },
];
