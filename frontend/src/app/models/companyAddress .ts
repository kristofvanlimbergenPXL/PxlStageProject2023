
export class CompanyAddress{


  city:string;
  streetAndNumber:string;
  zipCode:string;


  constructor(city: string, streetAndNumber: string, zipCode: string) {
    this.city = city;
    this.streetAndNumber = streetAndNumber;
    this.zipCode = zipCode;
  }
}
