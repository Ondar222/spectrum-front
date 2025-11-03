import React from "react";

type ShortDirection = {
  id: string;
  title: string;
  lead: string;
  bullets?: string[];
  chips?: { label: string; icon?: React.ReactNode }[];
};

const items: ShortDirection[] = [
  {
    id: "defectology",
    title: "Дефектологическая диагностика",
    lead: "Специалист помогает детям с особенностями развития: выявляет трудности обучения, мышления и расширяет представления об окружающем мире.",
    bullets: [
      "отставание в развитии",
      "задержка психического развития",
      "умственная отсталость",
    ],
    chips: [
      { label: "60 минут" },
      { label: "от 3-х лет" },
      { label: "2 200 руб." },
    ],
  },
  {
    id: "psychology",
    title: "Психологическая консультация",
    lead: "Диагностика индивидуально-психологических особенностей, поиск ресурсов и адаптивных возможностей личности.",
    bullets: [
      "личностный кризис",
      "трудности в детско-родительских отношениях",
      "эмоциональные и поведенческие проблемы",
      "психосоматические расстройства",
    ],
    chips: [
      { label: "первичная 2 200 руб." },
      { label: "от 2-х лет" },
      { label: "семейная 5 000 руб." },
    ],
  },
];

export default function DirectionsShort() {
  return (
    <section className="py-4 sm:py-6 bg-secondary/60">
      <div className="container mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-dark text-center mb-3">
          Коротко о направлениях
        </h2>
        <div className="space-y-4">
          {items.map((d) => (
            <article
              key={d.id}
              className="rounded-xl shadow-sm overflow-hidden bg-gradient-to-b from-white to-pink-50 border border-gray-200"
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                  {d.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3">
                  {d.lead}
                </p>
                {d.bullets && d.bullets.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Рекомендуется
                    </span>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm sm:text-base text-gray-700">
                      {d.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {d.chips && d.chips.length > 0 && (
                <div className="grid grid-cols-3 gap-2 p-3 bg-white/70">
                  {d.chips.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-gradient-to-b from-indigo-50 to-purple-50 border border-gray-200 p-3 text-center text-xs sm:text-sm font-semibold text-primary"
                    >
                      {c.label}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
