export class StudentCsv {
  id?: number | null;
  lastNameIndex: number;
  firstNameIndex: number;
  streetIndex: number;
  houseNumberIndex: number;
  postalCodeIndex: number;
  townshipIndex: number;
  privateEmailIndex: number;
  emailIndex: number;
  phoneNumberIndex: number;

  constructor(
    lastNameIndex: number,
    firstNameIndex: number,
    streetIndex: number,
    houseNumberIndex: number,
    postalCodeIndex: number,
    townshipIndex: number,
    privateEmailIndex: number,
    emailIndex: number,
    phoneNumberIndex: number,
    id?: number
  ) {
    this.id = id;
    this.lastNameIndex = lastNameIndex;
    this.firstNameIndex = firstNameIndex;
    this.streetIndex = streetIndex;
    this.houseNumberIndex = houseNumberIndex;
    this.postalCodeIndex = postalCodeIndex;
    this.townshipIndex = townshipIndex;
    this.privateEmailIndex = privateEmailIndex;
    this.emailIndex = emailIndex;
    this.phoneNumberIndex = phoneNumberIndex;
  }
}
