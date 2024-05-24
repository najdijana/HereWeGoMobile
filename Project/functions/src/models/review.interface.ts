import { User } from "./user.interface";

export interface Review{
    id:string;
    rate:number;
    review:string;
    description:string[];
    user:User;
    ratedAt:Date;
}
export type Reviews = Review[];
