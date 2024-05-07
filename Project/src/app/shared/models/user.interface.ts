export interface User{
    uid?:string;
    firstName?:string;
    lastName?:string;
    displayName?: string;
    profilePicture?:string;
    email?: string;
    phone?:string;
    address?:Address;
    role?: RoleTypeOptions;
    isValidCertificate?:boolean;
    guiderCertificateURL?:string;
    guiderCertificateName?:string;

}

export interface Address{
    country?:string;
    city?:string;
}

export enum RoleTypeOptions {
    ADMIN = 'ADMIN',
    TOURIST = 'TOURIST',
    GUIDER ='GUIDER'
}