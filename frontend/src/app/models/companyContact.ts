export class CompanyContact {
  id: number;
  title: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  email: string;
  companyId: number;

  constructor(
    id: number,
    title: string,
    lastName: string,
    firstName: string,
    phoneNumber: string,
    email: string,
    companyId: number
  ) {
    this.id = id;
    this.title = title;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.companyId = companyId;
  }
}
