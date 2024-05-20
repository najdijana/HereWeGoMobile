export interface Packages{
    id?:string;
    place?:string;
    description?:string;
    days?: number;
    review?:number;
    persons?: number;
    packageName?: string;
    image?: string;
    budget?: number;
    nbreviews?:number;
    gallery?:string[];
    plan?:Plan[];
    inclusions?:Inclusions[];
    exclusions?:Inclusions[];
    createdBy?:'GUIDER'|'ADMIN';
    startDate:Date;
}

export interface Plan{
    day?:number;
    title?:string;
    todo?:string[];
}

export interface Inclusions{
    title?:string;
    details?:string;
}