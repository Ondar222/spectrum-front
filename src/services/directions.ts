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
    { slug: 'therapy', title: 'Терапия', doctorKeywords: ['терап'], serviceKeywords: ['терап'] },
    { slug: 'diagnostics', title: 'Диагностика', doctorKeywords: ['диагн', 'узи'], serviceKeywords: ['узи', 'диагн', 'эхо', 'экг', 'ээг'] },
    { slug: 'gynecology', title: 'Гинекология', doctorKeywords: ['гинек'], serviceKeywords: ['гинек'] },
    { slug: 'urology', title: 'Урология', doctorKeywords: ['урол'], serviceKeywords: ['урол'] },
    { slug: 'physiotherapy', title: 'Физиотерапия', doctorKeywords: ['физиот', 'реабил'], serviceKeywords: ['физиот', 'реабил'] },
    { slug: 'surgery', title: 'Хирургия', doctorKeywords: ['хирург'], serviceKeywords: ['хирург'] },
    { slug: 'cardiology', title: 'Кардиология', doctorKeywords: ['карди'], serviceKeywords: ['карди', 'экг'] },
    { slug: 'pediatrics', title: 'Педиатрия', doctorKeywords: ['педиатр'], serviceKeywords: ['педиатр'] },
    { slug: 'neurology', title: 'Неврология', doctorKeywords: ['неврол'], serviceKeywords: ['неврол'] },
    { slug: 'ophthalmology', title: 'Офтальмология', doctorKeywords: ['офтальм', 'окул'], serviceKeywords: ['офтальм'] },
    { slug: 'dentistry', title: 'Стоматология', doctorKeywords: ['стомат', 'зуб'], serviceKeywords: ['стомат'] },
    { slug: 'endoscopy', title: 'Эндоскопия', doctorKeywords: ['эндоскоп', 'гастроэнтеролог'], serviceKeywords: ['эндоскоп', 'гастроскоп', 'колоноскоп'] },
];

export function getDirectionBySlug(slug: string) {
    return DIRECTIONS.find(d => d.slug === slug);
}

export function keywordMatch(text: string, keywords: string[]) {
    const lower = (text || '').toLowerCase();
    return keywords.some(k => lower.includes(k));
}


