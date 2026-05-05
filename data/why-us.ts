export type WhyUsStat = {
  id: string;
  value: string;
  title: string;
  description: string;
};

export const whyUsStats: WhyUsStat[] = [
  {
    id: "experience",
    value: "12+",
    title: "Років на ринку",
    description:
      "Понад дванадцять років допомагаємо жителям Хмельницького зберегти здоров'я зубів.",
  },
  {
    id: "doctors",
    value: "15",
    title: "Лікарів-фахівців",
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
