
export class Address{


    id:number;
    street:string;
    houseNumber:string;
    zipCode:string;
    city:string;
    country:string;


  constructor(id: number, street: string, houseNumber: string, zipCode: string, city: string, country: string) {
    this.id = id;
    this.street = street;
    this.houseNumber = houseNumber;
    this.zipCode = zipCode;
    this.city = city;
    this.country = country;
  }
}
