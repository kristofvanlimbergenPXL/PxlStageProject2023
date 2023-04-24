import {Agreement} from "./agreement";

export class EmployeeDetail{

  id?:number;
  firstName:string;
  lastName:string;
  email:string;
  rrn:string;
  phoneNumber:string;
  agreements:Agreement [];


  constructor(id: number, firstName: string, lastName: string, email: string, rrn: string, phoneNumber: string, agreements: Agreement[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.rrn = rrn;
    this.phoneNumber = phoneNumber;
    this.agreements = agreements;
  }
}
