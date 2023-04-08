
//zelfde field namen als DTO backend!!
export class Employee{

  id?:number;
  firstName:string;
  lastName:string;
  email:string;
  //birthDate:Date;
  rrn:string;


  constructor(firstName: string, lastName: string, email: string,rrn: string, id?: number,) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    //this.birthDate = birthDate;
    this.email = email;
    this.rrn = rrn;
  }
}
