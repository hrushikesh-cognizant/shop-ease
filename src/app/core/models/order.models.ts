import { CartItem } from "./cart.model";


export interface Order{
    id?:string;
    userEmail:string;
    item:CartItem[]
    total:number;
    address:string;
    name:string;
    city:string;
    pincode:number;
    status:'placed';
    createdAt:string;
}