import type { ComponentType, SVGProps } from "react";
import ShieldCheckIcon from "@/app/_components/icons/shield-check";
import { Award, Microscope } from "lucide-react";

export type Feature = {
  id: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const heroFeatures: Feature[] = [
  { id: "modern", label: "Сучасне обладнання", Icon: Microscope },
  { id: "experience", label: "Досвід 10+ років", Icon: Award },
  { id: "warranty", label: "Гарантія на лікування", Icon: ShieldCheckIcon },
];

export const whyUsItems: { id: string; label: string }[] = [
  { id: "personal", label: "Індивідуальний підхід" },
  { id: "honest-prices", label: "Чесні ціни та гарантія" },
  { id: "sterile", label: "Стерильність та безпека" },
  { id: "team", label: "Команда професіоналів" },
  { id: "comfort", label: "Комфорт та турбота" },
];
