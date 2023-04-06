
//zelfde field namen als DTO backend!!
export class Employee{

  id:number;
  firstName:string;
  lastName:string;
  email:string;
  birthDate?:string;
  rrn?:string;


  constructor(id: number, firstName: string, lastName: string, email: string,birthDate?: string, rrn?: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.email = email;
    this.rrn = rrn;
  }
}
