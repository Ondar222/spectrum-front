import React from "react";
import { Link } from "react-router-dom";
import ServiceInfoModal from "./ServiceInfoModal";

// Define service types
interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  link: string;
  desc?: string;
  bullets?: string[];
  bulletsTitle?: string;
  chips?: string[];
}

// Define our services with icons and colors (now 19, paginated as carousel)
const services: Service[] = [
  // {
  //   id: 1,
  //   title: "Консультации",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
  //       />
  //     </svg>
  //   ),
  //   color: "bg-primary",
  //   hoverColor: "hover:bg-primaryDark",
  //   link: "/prices?group=400",
  // },
  // {
  //   id: 2,
  //   title: "Диагностика",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
  //       />
  //     </svg>
  //   ),
  //   color: "bg-primary",
  //   hoverColor: "hover:bg-primaryDark",
  //   link: "/prices?group=900",
  // },
  {
    id: 3,
    title: "ЛекториУм",
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
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices?group=700",
    desc: "Образовательные лекции и встречи для родителей и специалистов по развитию и поддержке детей.",
    bullets: [
      "актуальные темы воспитания и обучения",
      "разбор сложных случаев",
      "общение с экспертами",
    ],
    chips: ["1–2 часа", "для родителей", "расписание"],
  },
  {
    id: 5,
    title: "Абономенты",
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
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices?group=800",
    desc: "Выгодные комплексы занятий и консультаций. Можно собрать под вашу цель и экономить.",
    bullets: ["индивидуальный план", "фиксированная цена", "удобный график"],
    chips: ["индив.", "семейные", "детские"],
  },
  // {
  //   id: 5,
  //   title: "СЕМИНАРЫ/КУРСЫ",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         strokeWidth={2}
  //         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  //       />
  //     </svg>
  //   ),
  //   color: "bg-primary",
  //   hoverColor: "hover:bg-primaryDark",
  //   link: "/prices?group=600",
  // },
  // {
  //   id: 5,
  //   title: "Занятия",
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-6 w-6"
  //       fill="none"
  //       viewBox="0 0 24 24"
  //       stroke="currentColor"
  //       strokeWidth={2}
  //     >
  //       <path
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         d="M3 17l6-6 2 2 6-6M13 7h8M3 21h8"
  //       />
  //     </svg>
  //   ),
  //   color: "bg-primary",
  //   hoverColor: "hover:bg-primaryDark",
  //   link: "/prices?group=800",
  // },
  {
    id: 6,
    title: "КЛИНИЧЕСКИЙ ПСИХОЛОГ",
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
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices?group=500",
    desc: "Диагностика и коррекция эмоциональных и когнитивных трудностей, поддержка семей.",
    bullets: [
      "сложности поведения и обучения",
      "стресс, тревожность",
      "поддержка родителей",
    ],
    chips: ["60 минут", "от 3-х лет"],
  },
  {
    id: 7,
    title: "ПСИХОЛОГИЯ",
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
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices?group=400",
    desc: "Данная диагностика направлена на выявление индивидуально-психологических свойств личности, определение уязвимых сторон личности, поиск психологических ресурсов и резервов, адаптивных и компенсаторных возможностей личности.",
    bulletsTitle:
      "Рекомендуется пройти психологическую диагностику, если Вы столкнулись с:",
    bullets: [
      "личностным кризисом",
      "проблемами в детско-родительских взаимоотношениях",
      "эмоциональными трудностями",
      "поведенческими проблемами (неврозы, страхи, тревожность, проблемы общения)",
      "психосоматическим расстройством",
    ],
    chips: [
      "детский 2 200 руб.",
      "взрослый 2 700 руб.",
      "семейная (пара) 3 200 руб.",
      "детско-родит. 2 700 руб.",
    ],
  },
  {
    id: 8,
    title: "СУРДОПЕДАГОГИКА",
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
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices?group=300",
    desc: "В центре интеллектуального развития SpectrUM ведет прием сурдопедагог Оюн Ася Мергеньевна — педагог, специалист по обучению и воспитанию детей с нарушениями слуха.",
    bulletsTitle: "Работаем и консультируем:",
    bullets: [
      "слабослышащие дети",
      "глухие дети",
      "дети с кохлеарными имплантатами",
      "на занятия можно с 2,5 лет",
      "На консультацию возьмите: документацию о проведённом лечении; аудиограмму; медицинскую карту ребенка; заключение диагноза врачом; при кандидатах на кохлеарную имплантацию — слуховые аппараты с индивидуальным вкладышем",
    ],
    chips: ["от 2,5 лет", "индивидуально"],
  },
  {
    id: 9,
    title: "ЛОГОПЕДИЯ",
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
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices?group=200",
    desc: "Постановка и автоматизация звуков, развитие речи и коммуникативных навыков.",
    bullets: ["запуск речи", "коррекция звукопроизношения", "ОНР/ФФН"],
    chips: ["от 3-х лет", "индивидуально"],
  },
  {
    id: 20,
    title: "КЛУБ НАСТОЛЬНЫХ ИГР",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 3l2.12 4.29L19 8l-3.5 3.4.82 4.77L12 14.77 7.68 16.17l.82-4.77L5 8l4.88-.71L12 3z" />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices",
    desc: "Игровые встречи для детей: развиваем коммуникативные и стратегические навыки через настольные игры.",
    bullets: [
      "командные и дуэльные форматы",
      "навыки общения и планирования",
      "дружелюбный ведущий",
    ],
    chips: ["для детей", "расписание"],
  },
  {
    id: 21,
    title: "Книжный клуб (взрослые)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 4.5A2.5 2.5 0 016.5 7H20v13H6.5A2.5 2.5 0 014 17.5V4.5z" />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices",
    desc: "Обсуждаем книги, делимся впечатлениями, прокачиваем критическое мышление и мягкие навыки общения.",
    bullets: [
      "современная и классическая литература",
      "дискуссии в безопасной атмосфере",
      "чай и печенье",
    ],
    chips: ["для взрослых", "ежемесячно"],
  },
  {
    id: 22,
    title: "Кино клуб (взрослые)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 5v4M17 5v4M7 15v4M17 15v4" />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices",
    desc: "Просмотр и обсуждение фильмов: учимся видеть смыслы, говорить о чувствах и мнениях уважительно.",
    bullets: [
      "классика и современные фильмы",
      "модерируемая дискуссия",
      "уютная атмосфера",
    ],
    chips: ["для взрослых", "раз в месяц"],
  },
];

export default function ServiceGrid() {
  const [page, setPage] = React.useState(0);
  // responsive page size - показываем больше элементов на странице
  const getPageSize = () => {
    if (typeof window === "undefined") return 12;
    const w = window.innerWidth;
    if (w < 640) return 8; // 2x4
    if (w < 1024) return 12; // 3x4
    return 18; // 6x3
  };
  const [pageSize, setPageSize] = React.useState(getPageSize());
  React.useEffect(() => {
    const onResize = () => setPageSize(getPageSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Добавляем "Медосмотры", убираем дубли по названию и поднимаем выбранные направления вверх
  const medExams: Service = {
    id: 1000,
    title: "ДЕФЕКТОЛОГИЯ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 7h6M9 11h6M5 7h.01M5 11h.01M5 15h.01M9 15h6"
        />
        <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
      </svg>
    ),
    color: "bg-primary",
    hoverColor: "hover:bg-primaryDark",
    link: "/prices",
    desc: "Помощь детям с особенностями развития: формирование учебных навыков, развитие мышления и адаптация.",
    bullets: [
      "отставание в развитии",
      "задержка психического развития",
      "интеллектуальные трудности",
    ],
    chips: ["60 минут", "от 3-х лет"],
  };

  const priorityTitles = [
    "ДЕФЕКТОЛОГИЯ",
    "клинический психолог",
    "СУРДОПЕДАГОГИКА",
    "ПСИХОЛОГИЯ",
  ];

  const orderedServices = React.useMemo(() => {
    const base = [...services];
    // Добавляем "ДЕФЕКТОЛОГИЯ" если его нет
    if (!base.some((s) => s.title === "ДЕФЕКТОЛОГИЯ")) {
      base.unshift(medExams);
    }
    // Дедуп по названию (уберет повтор "ЛОГОПЕДИЯ")
    const seen = new Set<string>();
    const deduped = base.filter((s) => {
      if (seen.has(s.title)) return false;
      seen.add(s.title);
      return true;
    });
    // Приоритетные направления наверху, остальное в исходном порядке
    const priority = priorityTitles
      .map((t) => deduped.find((s) => s.title === t))
      .filter(Boolean) as Service[];
    const rest = deduped.filter((s) => !priorityTitles.includes(s.title));
    return [...priority, ...rest];
  }, []);

  const totalPages = Math.ceil(orderedServices.length / pageSize);
  const start = page * pageSize;
  const visible = orderedServices.slice(start, start + pageSize);

  const [openService, setOpenService] = React.useState<Service | null>(null);

  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-3 text-dark">
          Наши направления
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6 sm:mb-8 text-xs sm:text-sm">
          Центр SpectrUM предлагает образовательные и психологические услуги для
          детей, подростков и взрослых. Выберите интересующее вас направление.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-2 sm:gap-3">
          {visible.map((service, index) => (
            <div key={service.link} className="relative">
              <Link
                to={service.link}
                onClick={(e) => {
                  e.preventDefault();
                  setOpenService(service);
                }}
                className={`${service.color} ${service.hoverColor} text-white p-2 sm:p-3 flex flex-col items-center text-center rounded-md sm:rounded-lg shadow-sm overflow-hidden group relative transition-all duration-200 ease-in-out hover:shadow-md`}
                style={{ "--delay": `${index * 0.02}s` } as React.CSSProperties}
              >
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                <div className="mb-1 sm:mb-2 relative z-10 transition-transform duration-200 group-hover:scale-105">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xs sm:text-sm font-medium relative z-10 leading-tight">
                  {service.title}
                </h3>
                <div className="mt-0.5 sm:mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </Link>

              {/* Modal is rendered once below the grid */}
            </div>
          ))}
        </div>

        <ServiceInfoModal
          open={!!openService}
          onClose={() => setOpenService(null)}
          service={openService as any}
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4 sm:mt-6">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm border border-primary text-primary rounded disabled:opacity-40 hover:bg-primary hover:text-white transition-colors"
              disabled={page === 0}
            >
              ←
            </button>
            <div className="text-xs text-gray-600 px-1 sm:px-2">
              {page + 1} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs sm:text-sm border border-primary text-primary rounded disabled:opacity-40 hover:bg-primary hover:text-white transition-colors"
              disabled={page >= totalPages - 1}
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
