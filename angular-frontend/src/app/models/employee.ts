
//zelfde field namen als DTO backend!!
export class Employee{
  id?:number;
  firstName:string;
  lastName:string;
  email:string;
  rrn:string;
  phoneNumber:string;

  constructor(firstName: string, lastName: string, email: string,rrn: string,phoneNumber:string, id?: number,) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.rrn = rrn;
    this.phoneNumber=phoneNumber;
  }
}
