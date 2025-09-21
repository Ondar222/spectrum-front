// Система категоризации услуг по типам
export interface ServiceCategory {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    keywords: string[];
}

export interface ServiceSubcategory {
    id: string;
    name: string;
    slug: string;
    parentCategory: string;
    keywords: string[];
    description: string;
}

// Основные категории услуг
export const SERVICE_CATEGORIES: ServiceCategory[] = [
    {
        id: 'laboratory',
        name: 'Лабораторная диагностика',
        slug: 'laboratory',
        icon: '🧪',
        description: 'Анализы крови, мочи, биохимические исследования',
        keywords: ['анализ', 'кровь', 'моча', 'биохимия', 'гематолог', 'лаборатор', 'исследование']
    },
    {
        id: 'ultrasound',
        name: 'Ультразвуковая диагностика',
        slug: 'ultrasound',
        icon: '📡',
        description: 'УЗИ различных органов и систем',
        keywords: ['узи', 'ультразв', 'сонограф', 'эхограф']
    },
    {
        id: 'consultations',
        name: 'Консультации специалистов',
        slug: 'consultations',
        icon: '👨‍⚕️',
        description: 'Приемы врачей различных специальностей',
        keywords: ['консультация', 'прием', 'осмотр', 'диагностика']
    },
    {
        id: 'functional',
        name: 'Функциональная диагностика',
        slug: 'functional',
        icon: '📊',
        description: 'ЭКГ, спирометрия, эхокардиография',
        keywords: ['экг', 'спирометр', 'эхокардио', 'функцион', 'мониторинг']
    },
    {
        id: 'endoscopy',
        name: 'Эндоскопия',
        slug: 'endoscopy',
        icon: '🔍',
        description: 'Гастроскопия, колоноскопия, бронхоскопия',
        keywords: ['эндоскоп', 'гастроскоп', 'колоноскоп', 'бронхоскоп']
    },
    {
        id: 'surgery',
        name: 'Хирургические услуги',
        slug: 'surgery',
        icon: '⚕️',
        description: 'Оперативные вмешательства и процедуры',
        keywords: ['операция', 'хирург', 'вмешательство', 'процедура', 'лазер']
    },
    {
        id: 'cosmetology',
        name: 'Косметология',
        slug: 'cosmetology',
        icon: '💄',
        description: 'Эстетические процедуры и уход',
        keywords: ['космет', 'эстетик', 'лазер', 'инъекц', 'ботокс']
    },
    {
        id: 'physiotherapy',
        name: 'Физиотерапия',
        slug: 'physiotherapy',
        icon: '⚡',
        description: 'Физиотерапевтические процедуры',
        keywords: ['физиот', 'реабил', 'массаж', 'электро', 'магнит']
    }
];

// Подкатегории для каждого направления
export const SERVICE_SUBCATEGORIES: ServiceSubcategory[] = [
    // Гинекология
    {
        id: 'gynecology-ultrasound',
        name: 'Гинекологические УЗИ',
        slug: 'gynecology-ultrasound',
        parentCategory: 'ultrasound',
        keywords: ['гинек', 'узи', 'матка', 'яичник', 'фолликул', 'беременность'],
        description: 'УЗИ органов малого таза, фолликулометрия, скрининг беременности'
    },
    {
        id: 'gynecology-consultations',
        name: 'Гинекологические консультации',
        slug: 'gynecology-consultations',
        parentCategory: 'consultations',
        keywords: ['гинек', 'консультация', 'прием', 'осмотр'],
        description: 'Приемы гинеколога, профилактические осмотры'
    },
    {
        id: 'gynecology-analyses',
        name: 'Гинекологические анализы',
        slug: 'gynecology-analyses',
        parentCategory: 'laboratory',
        keywords: ['гинек', 'анализ', 'мазок', 'гормон', 'инфекц', 'цитолог'],
        description: 'Анализы на инфекции, гормоны, цитология'
    },
    {
        id: 'gynecology-surgery',
        name: 'Гинекологическая хирургия',
        slug: 'gynecology-surgery',
        parentCategory: 'surgery',
        keywords: ['гинек', 'лазер', 'операция', 'удаление', 'коагуляция'],
        description: 'Лазерная гинекология, малоинвазивные операции'
    },

    // Урология
    {
        id: 'urology-ultrasound',
        name: 'Урологические УЗИ',
        slug: 'urology-ultrasound',
        parentCategory: 'ultrasound',
        keywords: ['урол', 'узи', 'почка', 'мочевой', 'простата'],
        description: 'УЗИ почек, мочевого пузыря, простаты'
    },
    {
        id: 'urology-consultations',
        name: 'Урологические консультации',
        slug: 'urology-consultations',
        parentCategory: 'consultations',
        keywords: ['урол', 'консультация', 'прием', 'осмотр'],
        description: 'Приемы уролога, профилактические осмотры'
    },
    {
        id: 'urology-analyses',
        name: 'Урологические анализы',
        slug: 'urology-analyses',
        parentCategory: 'laboratory',
        keywords: ['урол', 'анализ', 'моча', 'посев', 'спермограмм'],
        description: 'Анализы мочи, посевы, спермограмма'
    },

    // Кардиология
    {
        id: 'cardiology-consultations',
        name: 'Кардиологические консультации',
        slug: 'cardiology-consultations',
        parentCategory: 'consultations',
        keywords: ['карди', 'консультация', 'прием', 'осмотр'],
        description: 'Приемы кардиолога, консультации по заболеваниям сердца'
    },
    {
        id: 'cardiology-functional',
        name: 'Кардиологическая диагностика',
        slug: 'cardiology-functional',
        parentCategory: 'functional',
        keywords: ['карди', 'экг', 'эхокардио', 'холтер', 'велоэргометр'],
        description: 'ЭКГ, эхокардиография, холтеровское мониторирование'
    },
    {
        id: 'cardiology-analyses',
        name: 'Кардиологические анализы',
        slug: 'cardiology-analyses',
        parentCategory: 'laboratory',
        keywords: ['карди', 'анализ', 'тропонин', 'креатинкиназа', 'липид'],
        description: 'Анализы на маркеры сердечных заболеваний'
    },

    // Гастроэнтерология
    {
        id: 'gastro-consultations',
        name: 'Гастроэнтерологические консультации',
        slug: 'gastro-consultations',
        parentCategory: 'consultations',
        keywords: ['гастро', 'консультация', 'прием', 'осмотр'],
        description: 'Приемы гастроэнтеролога, консультации по ЖКТ'
    },
    {
        id: 'gastro-endoscopy',
        name: 'Гастроэнтерологическая эндоскопия',
        slug: 'gastro-endoscopy',
        parentCategory: 'endoscopy',
        keywords: ['гастро', 'эндоскоп', 'гастроскоп', 'колоноскоп'],
        description: 'Гастроскопия, колоноскопия, ректороманоскопия'
    },
    {
        id: 'gastro-ultrasound',
        name: 'Гастроэнтерологические УЗИ',
        slug: 'gastro-ultrasound',
        parentCategory: 'ultrasound',
        keywords: ['гастро', 'узи', 'печень', 'желчный', 'поджелудочная'],
        description: 'УЗИ органов брюшной полости'
    },
    {
        id: 'gastro-analyses',
        name: 'Гастроэнтерологические анализы',
        slug: 'gastro-analyses',
        parentCategory: 'laboratory',
        keywords: ['гастро', 'анализ', 'печеночн', 'амилаза', 'липаза'],
        description: 'Анализы на ферменты, маркеры заболеваний ЖКТ'
    }
];

// Функция для получения категории по ключевым словам
export function getServiceCategory(serviceName: string, serviceGroup?: string): ServiceCategory | null {
    const text = `${serviceName} ${serviceGroup || ''}`.toLowerCase();

    for (const category of SERVICE_CATEGORIES) {
        if (category.keywords.some(keyword => text.includes(keyword))) {
            return category;
        }
    }

    return null;
}

// Функция для получения подкатегории по ключевым словам
export function getServiceSubcategory(serviceName: string, serviceGroup?: string, direction?: string): ServiceSubcategory | null {
    const text = `${serviceName} ${serviceGroup || ''} ${direction || ''}`.toLowerCase();

    for (const subcategory of SERVICE_SUBCATEGORIES) {
        if (subcategory.keywords.some(keyword => text.includes(keyword))) {
            return subcategory;
        }
    }

    return null;
}

// Функция для группировки услуг по категориям
export function groupServicesByCategory(services: any[], direction?: string) {
    const grouped: { [key: string]: any[] } = {};

    services.forEach(service => {
        const category = getServiceCategory(service.name, service.group);
        const subcategory = getServiceSubcategory(service.name, service.group, direction);

        if (category) {
            const key = subcategory ? `${category.id}-${subcategory.id}` : category.id;
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push({
                ...service,
                category,
                subcategory
            });
        }
    });

    return grouped;
}
