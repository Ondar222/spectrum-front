import type React from "react";

interface Advantage {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const advantages: Advantage[] = [
  {
    id: 1,
    title: "Опытные специалисты высокой квалификации",
    description:
      "Наши специалисты — это профессионалы высочайшего уровня, чей опыт и знания позволяют решать самые сложные задачи современной медицины.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Современное оборудование и технологии",
    description:
      "Используем передовое медицинское оборудование от ведущих мировых производителей для максимально точной диагностики и эффективного лечения.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "bg-primary",
  },
  {
    id: 3,
    title: "Комфортные условия для клиентов",
    description:
      "Мы создали уютную обстановку и доброжелательную атмосферу, чтобы каждый клиент чувствовал себя спокойно и комфортно на всех этапах лечения.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    color: "bg-primary",
  },
];

export default function Advantages() {
  return (
    <section
      className="py-6 sm:py-8 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-dark">
          Наши преимущества
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {advantages.map((advantage) => (
            <div
              key={advantage.id}
              className="rounded-md sm:rounded-lg overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl hover:bg-white transition-all duration-200 transform hover:-translate-y-1"
            >
              <div
                className={`${advantage.color} p-3 sm:p-4 text-white flex justify-center`}
              >
                {advantage.icon}
              </div>
              <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-dark">
                  {advantage.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
