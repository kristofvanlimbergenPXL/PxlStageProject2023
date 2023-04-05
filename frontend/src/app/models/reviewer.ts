import { Proposal } from './proposal';

export class Reviewer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  proposals?: any[]; // change from any to proposals after merge

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    proposals: Proposal[],
    id?: number
  ) {
    (this.id = id),
      (this.firstName = firstName),
      (this.lastName = lastName),
      (this.email = email),
      (this.proposals = proposals);
  }
}
