export interface ServiceItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ServiceDirection {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    heroImage?: string;
    services: ServiceItem[];
}

export interface Doctor {
    id: number;
    name: string;
    photo: string;
    experience: number;
    specializationTitles: string[];
    specializations: number[]; // references ServiceDirection.id
}


