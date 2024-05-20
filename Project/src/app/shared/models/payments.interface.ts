import { Packages } from "./packages.interface";

export interface Payments{
    id?:string;
    amount?:string;
    charge?:object;
    token?:object;
    package?:Packages;
    bookingDate?: Date;
    paymentStatus?:PaymentStatus;
}
export enum PaymentStatus{
    ACTIVE = 'ACTIVE',
    CANCELED ='CANCELED'
}