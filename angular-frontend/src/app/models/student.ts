import { Proposal } from './proposal';

export class Student {
  id?: number | null;
  lastName: string;
  firstName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  township: string;
  privateEmail: string;
  email: string;
  phoneNumber: string;
  modelTraject?: boolean;
  department: string;
  proposalId?: number | null;
  proposal?: Proposal;

  constructor(
    lastName: string,
    firstName: string,
    street: string,
    houseNumber: string,
    postalCode: string,
    township: string,
    privateEmail: string,
    email: string,
    phoneNumber: string,
    id?: number,
    proposalId?: number,
    proposal?: Proposal
  ) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.street = street;
    this.houseNumber = houseNumber;
    this.postalCode = postalCode;
    this.township = township;
    this.privateEmail = privateEmail;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.modelTraject = true;
    this.department = 'PXL Digital';
    this.proposalId = proposalId;
    this.proposal = proposal;
  }
}
