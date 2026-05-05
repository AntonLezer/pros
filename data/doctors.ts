export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  initials: string;
};

export const doctors: Doctor[] = [
  {
    id: "ploskyriv",
    name: "Іван Плоскирів",
    specialty: "Головний лікар, імплантолог",
    experienceYears: 12,
    initials: "ІП",
  },
  {
    id: "kovalchuk",
    name: "Ольга Ковальчук",
    specialty: "Терапевт, ендодонтист",
    experienceYears: 8,
    initials: "ОК",
  },
  {
    id: "melnyk",
    name: "Юлія Мельник",
    specialty: "Ортодонт",
    experienceYears: 7,
    initials: "ЮМ",
  },
  {
    id: "tkachuk",
    name: "Максим Ткачук",
    specialty: "Хірург, імплантолог",
    experienceYears: 10,
    initials: "МТ",
  },
];
