import { IaddressModel } from "./address.model";
import { IpaymentModel } from "./payment.model";

export interface IUserData{
    id:number;
    fname: string;
    lname: string;
    email:string;
    password:string;
    phone: number;
    address: IaddressModel;
    payment: IpaymentModel[];
}