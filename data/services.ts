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
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const services: Service[] = [
  {
    id: "therapy",
    name: "Лікування зубів",
    description: "Терапевтичне лікування карієсу та його ускладнень",
    Icon: ToothIcon,
  },
  {
    id: "hygiene",
    name: "Професійна гігієна",
    description: "Комплексне чищення та профілактика захворювань ясен",
    Icon: ShieldCheckIcon,
  },
  {
    id: "braces",
    name: "Брекети",
    description: "Вирівнювання прикусу та естетика вашої усмішки",
    Icon: BracesIcon,
  },
  {
    id: "implants",
    name: "Імплантація",
    description: "Відновлення зубів імплантами під ключ",
    Icon: ImplantIcon,
  },
  {
    id: "whitening",
    name: "Відбілювання",
    description: "Безпечне освітлення емалі та видалення пігментації",
    Icon: DropletIcon,
  },
  {
    id: "pediatric",
    name: "Дитяча стоматологія",
    description: "Турбота та безболісне лікування для найменших",
    Icon: BabyToothIcon,
  },
];
