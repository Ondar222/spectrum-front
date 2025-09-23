// Map UI direction slugs to human names and matching predicates for API data
export interface DirectionConfig {
    slug: string;
    title: string;
    // doctor type/name includes any of these keywords
    doctorKeywords: string[];
    // service group/name includes any of these keywords
    serviceKeywords: string[];
}

export const DIRECTIONS: DirectionConfig[] = [
    { slug: 'ultrasound', title: 'Ультразвуковая диагностика', doctorKeywords: ['узи', 'ультразв'], serviceKeywords: ['узи', 'ультразв'] },
    { slug: 'functional-diagnostics', title: 'Функциональная диагностика', doctorKeywords: ['функцион', 'эхо', 'экг', 'спиро'], serviceKeywords: ['функцион', 'эхо', 'экг', 'спиро'] },
    { slug: 'gynecology', title: 'Гинекология', doctorKeywords: ['гинек'], serviceKeywords: ['гинек'] },
    { slug: 'cosmetology', title: 'Косметология', doctorKeywords: ['космет'], serviceKeywords: ['космет'] },
    { slug: 'vascular-surgery-phlebology', title: 'Сосудистая хирургия и флебология', doctorKeywords: ['флеб', 'сосуд', 'ангио'], serviceKeywords: ['флеб', 'сосуд', 'ангио'] },
    { slug: 'cardiology', title: 'Кардиология', doctorKeywords: ['карди'], serviceKeywords: ['карди', 'экг'] },
    { slug: 'pulmonology', title: 'Пульмонология', doctorKeywords: ['пульмон', 'дыхат'], serviceKeywords: ['пульмон', 'спиро', 'бронхо'] },
    { slug: 'gastroenterology', title: 'Гастроэнтерология', doctorKeywords: ['гастро', 'пищевар'], serviceKeywords: ['гастро', 'эндоскоп', 'гастроскоп', 'колоноскоп'] },
    { slug: 'hematology', title: 'Гематология', doctorKeywords: ['гемат'], serviceKeywords: ['гемат'] },
    { slug: 'neurology', title: 'Неврология', doctorKeywords: ['неврол'], serviceKeywords: ['неврол'] },
    { slug: 'traumatology-orthopedics', title: 'Травматология и ортопедия', doctorKeywords: ['травмат', 'ортоп'], serviceKeywords: ['травмат', 'ортоп'] },
    { slug: 'surgery', title: 'Хирургия', doctorKeywords: ['хирург'], serviceKeywords: ['хирург'] },
    { slug: 'plastic-surgery', title: 'Пластическая хирургия', doctorKeywords: ['пластич', 'эстетич', 'пластический хирург'], serviceKeywords: ['пластич', 'ринопласт', 'блефаропласт', 'липосак', 'маммопласт'] },
    { slug: 'urology', title: 'Урология', doctorKeywords: ['урол'], serviceKeywords: ['урол'] },
    { slug: 'endocrinology', title: 'Эндокринология', doctorKeywords: ['эндокрин'], serviceKeywords: ['эндокрин', 'тирео'] },
    { slug: 'pediatrics', title: 'Педиатрия', doctorKeywords: ['педиатр'], serviceKeywords: ['педиатр'] },
    { slug: 'ophthalmology', title: 'Офтальмология', doctorKeywords: ['офтальм', 'окул'], serviceKeywords: ['офтальм'] },
    { slug: 'dentistry', title: 'Стоматология', doctorKeywords: ['стомат', 'зуб'], serviceKeywords: ['стомат'] },
    { slug: 'otolaryngology', title: 'Отоларингология', doctorKeywords: ['лор', 'отолар'], serviceKeywords: ['лор', 'отолар'] },
    { slug: 'oncology', title: 'Онкология', doctorKeywords: ['онкол'], serviceKeywords: ['онкол'] },
    { slug: 'rheumatology', title: 'Ревматология', doctorKeywords: ['ревмат'], serviceKeywords: ['ревмат'] },
    { slug: 'nephrology', title: 'Нефрология', doctorKeywords: ['нефрол', 'почек'], serviceKeywords: ['нефрол'] },
    { slug: 'proctology', title: 'Проктология', doctorKeywords: ['прокт', 'колопрокт'], serviceKeywords: ['прокт'] },
    { slug: 'diagnostics', title: 'Диагностика', doctorKeywords: ['диагн', 'узи'], serviceKeywords: ['узи', 'диагн', 'эхо', 'экг', 'ээг'] },
    { slug: 'physiotherapy', title: 'Физиотерапия', doctorKeywords: ['физиот', 'реабил'], serviceKeywords: ['физиот', 'реабил'] },
    { slug: 'endoscopy', title: 'Эндоскопия', doctorKeywords: ['эндоскоп', 'гастроэнтеролог'], serviceKeywords: ['эндоскоп', 'гастроскоп', 'колоноскоп'] },
    { slug: 'therapy', title: 'Терапия', doctorKeywords: ['терап'], serviceKeywords: ['терап'] },
];

export function getDirectionBySlug(slug: string) {
    return DIRECTIONS.find(d => d.slug === slug);
}

export function keywordMatch(text: string, keywords: string[]) {
    const lower = (text || '').toLowerCase();
    return keywords.some(k => lower.includes(k));
}


