import React from "react";

type Card = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  badge?: string;
};

type VKNewsCardsProps = {
  items?: Card[];
  groupUrl?: string;
};

const defaultItems: Card[] = [
  {
    id: "1",
    title: "Ищем педагогов",
    description:
      "В команду нужны специалисты по раннему развитию, логике, каллиграфии и др.",
    imageUrl: "/www.jpg",
    link: "https://vk.com/club225368787",
    badge: "Вакансии",
  },
  {
    id: "2",
    title: "Мини‑гайды и полезности",
    description:
      "Подборки материалов для родителей и педагогов по детскому развитию.",
    imageUrl: "/bg-hero.jpg",
    link: "https://vk.com/club225368787",
    badge: "Материалы",
  },
  {
    id: "3",
    title: "Ближайшие мероприятия",
    description:
      "Анонсы мастер‑классов, лекций и открытых встреч нашего Центра.",
    imageUrl: "/bg-hero2.jpg",
    link: "https://vk.com/club225368787",
    badge: "События",
  },
  {
    id: "4",
    title: "Истории и кейсы",
    description:
      "Коротко о нашей работе и заметных результатах — вдохновляющие истории.",
    imageUrl: "/card.png",
    link: "https://vk.com/club225368787",
    badge: "Истории",
  },
];

export default function VKNewsCards({
  items = defaultItems,
  groupUrl,
}: VKNewsCardsProps) {
  return (
    <section className="container mx-auto px-4 mt-8 md:mt-10">
      <div className="flex items-end justify-between mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Последние новости</h2>
        {groupUrl && (
          <a
            href={groupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline text-sm"
          >
            Все новости во ВКонтакте
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
          >
            <div className="relative w-full pt-[60%]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  const fallback = "/www.jpg";
                  if (e.currentTarget.src !== fallback)
                    e.currentTarget.src = fallback;
                }}
              />
              {item.badge && (
                <span className="absolute top-3 left-3 bg-teal text-white text-xs px-2 py-1 rounded-full shadow">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="p-4 md:p-5 flex flex-col flex-grow">
              <h3 className="font-semibold text-base md:text-lg mb-2 leading-snug">
                {item.title}
              </h3>
              <div className="text-gray-600 text-sm md:text-[15px] leading-relaxed flex-grow">
                <div dangerouslySetInnerHTML={{ __html: item.description }} />
              </div>
              {item.link && (
                <div className="mt-4">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal font-medium hover:underline"
                  >
                    Читать во ВК
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M13.5 4.5a.75.75 0 000 1.5h4.19l-8.72 8.72a.75.75 0 101.06 1.06l8.72-8.72V11a.75.75 0 001.5 0V4.5h-6.75z" />
                      <path d="M6.75 5.25A1.5 1.5 0 005.25 6.75v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V13.5a.75.75 0 00-1.5 0v3.75a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75a.75.75 0 01.75-.75h3.75a.75.75 0 000-1.5H6.75z" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
