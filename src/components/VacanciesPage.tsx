import React from "react";

const VACANCIES = [
  {
    id: "speed-reading",
    title: "Педагог по скорочтению",
    tags: ["частичная занятость", "дети 6–12"],
  },
  {
    id: "calligraphy",
    title: "Педагог по каллиграфии",
    tags: ["частичная занятость"],
  },
  {
    id: "mental-math",
    title: "Педагог по ментальной арифметике",
    tags: ["опыт приветствуется"],
  },
  {
    id: "english",
    title: "Преподаватель английского языка (игровая форма)",
    tags: ["дошкольники", "младшие классы"],
  },
  {
    id: "tuvan",
    title: "Преподаватель тувинского языка (игровая форма)",
    tags: ["дошкольники"],
  },
  {
    id: "after-school",
    title: "Педагог продлёнки (1–4 классы)",
    tags: ["будни"],
  },
  {
    id: "logic",
    title: "Педагог по логике для детей",
    tags: ["развивающие занятия"],
  },
];

export default function VacanciesPage() {
  return (
    <div className="min-h-screen bg-secondary py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">
          Вакансии
        </h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {VACANCIES.map((v) => (
            <article
              key={v.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5"
            >
              <h2 className="text-lg font-semibold mb-2">{v.title}</h2>
              {v.tags?.length ? (
                <div className="flex flex-wrap gap-2 mb-3">
                  {v.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-teal/10 text-teal px-2 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <p className="text-gray-600 text-sm leading-relaxed">
                Рассмотрим кандидатов с профильным образованием и любовью к
                работе с детьми.
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href="tel:+79235405050"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-primary hover:bg-primaryDark text-white text-sm font-medium transition-colors"
                >
                  Позвонить
                </a>
                {/* <a
                  href="mailto:hr@spectrum.tuva"
                  className="inline-flex items-center justify-center px-3 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white text-sm font-medium transition-colors"
                >
                  Отправить резюме
                </a> */}
              </div>
            </article>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
          <h3 className="text-lg font-semibold mb-2">Как подать заявку</h3>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
            <li>
              Коротко расскажите о себе, опыте и направлениях, в которых вы
              сильны.
            </li>
            <li>
              Прикрепите резюме/портфолио и укажите удобные способы связи.
            </li>
            <li>Позвоните или напишите в WhatsApp: +7 (923) 540‑50‑50.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
