import type { ComponentType, SVGProps } from "react";
import ToothIcon from "@/app/_components/icons/tooth";
import ShieldCheckIcon from "@/app/_components/icons/shield-check";
import BracesIcon from "@/app/_components/icons/braces";
import ImplantIcon from "@/app/_components/icons/implant";
import DropletIcon from "@/app/_components/icons/droplet";
import BabyToothIcon from "@/app/_components/icons/baby-tooth";

export type Service = {
  id: string;
  name: string;
  description: string;
  priceFrom: number;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const services: Service[] = [
  {
    id: "therapy",
    name: "Терапевтична стоматологія",
    description:
      "Лікування карієсу, пульпіту та інших захворювань зубів з використанням сучасних матеріалів.",
    priceFrom: 600,
    Icon: ToothIcon,
  },
  {
    id: "aesthetic",
    name: "Естетична стоматологія",
    description:
      "Відбілювання, вініри та реставрація для бездоганної посмішки, яка вас надихатиме.",
    priceFrom: 1500,
    Icon: DropletIcon,
  },
  {
    id: "braces",
    name: "Ортодонтія",
    description:
      "Виправлення прикусу та вирівнювання зубів — брекети та прозорі елайнери для дітей і дорослих.",
    priceFrom: 8000,
    Icon: BracesIcon,
  },
  {
    id: "implants",
    name: "Хірургія та імплантація",
    description:
      "Безболісне видалення зубів та імплантація з гарантією на встановлені конструкції.",
    priceFrom: 15000,
    Icon: ImplantIcon,
  },
  {
    id: "pediatric",
    name: "Дитяча стоматологія",
    description:
      "Бережний підхід до маленьких пацієнтів. Лікуємо без страху та болю в ігровій атмосфері.",
    priceFrom: 400,
    Icon: BabyToothIcon,
  },
  {
    id: "prosthetics",
    name: "Протезування",
    description:
      "Знімні та незнімні протези, коронки та мости — відновимо зубний ряд природньо і комфортно.",
    priceFrom: 5000,
    Icon: ShieldCheckIcon,
  },
];
