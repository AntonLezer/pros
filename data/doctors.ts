export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  initials: string;
  image?: string;
};

export const doctors: Doctor[] = [
  {
    id: "ploskyriv",
    name: "Іван Плоскирів",
    specialty: "Головний лікар, імплантолог",
    experienceYears: 12,
    initials: "ІП",
    image: "/images/doctors/IMG_8994.jpg",
  },
  {
    id: "kovalchuk",
    name: "Ольга Ковальчук",
    specialty: "Терапевт, ендодонтист",
    experienceYears: 8,
    initials: "ОК",
    image: "/images/doctors/IMG_8982.jpg",
  },
  {
    id: "melnyk",
    name: "Юлія Мельник",
    specialty: "Ортодонт",
    experienceYears: 7,
    initials: "ЮМ",
    image: "/images/doctors/IMG_9027.jpg",
  }
];
