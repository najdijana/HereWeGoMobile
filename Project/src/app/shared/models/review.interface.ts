import { Plan } from "./packages.interface";
import { User } from "./user.interface";

export interface Review{
    id?:string;
    rate?:number;
    review?:string;
    plan?:Plan[];
    user?:User;
    startDate:Date;
}