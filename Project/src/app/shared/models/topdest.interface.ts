export interface TopDest{
    id:string;
    Activity:string;
    City: string;
    Image:string;
    Name: string;
    OpenningHours: string;
    Price: string;
    Phone: string;
    Governate: string;
    review?:number;
    isFavorite?:boolean;
}

export interface destination{
    id:string;
    name:string;
    cities:string;
    image:string;
}