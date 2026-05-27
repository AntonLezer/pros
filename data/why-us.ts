export type WhyUsStat = {
  id: string;
  value: string;
  title: string;
  description: string;
};

export const whyUsStats: WhyUsStat[] = [
  {
    id: "experience",
    value: "9+",
    title: "Років на ринку",
    description:
      "Вже понад 9 років ми допомагаємо людям позбутися болю,відновити впевненість і знову посміхатися без страху.",
  },
  {
    id: "doctors",
    value: "5",
    title: "Фахівці",
    description:
      "Кожен лікар — сертифікований спеціаліст з багаторічним клінічним досвідом.",
  },
  {
    id: "painless",
    value: "0%",
    title: "Болю при лікуванні",
    description:
      "Сучасні анестетики та щадні методики роблять лікування комфортним і безболісним.",
  },
  {
    id: "rating",
    value: "4.9★",
    title: "Рейтинг якості",
    description:
      "Понад 1200 відгуків від задоволених пацієнтів підтверджують нашу якість.",
  },
];
