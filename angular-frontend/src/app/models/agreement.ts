export class Agreement {

  id?:number;
  workFunction:string;
  grossSalary:number;
  employmentHours:number;
  agreementHours:number;

  constructor( workFunction: string, grossSalary: number, employmentHours: number, agreementHours: number,id?: number) {
    this.id = id;
    this.workFunction = workFunction;
    this.grossSalary = grossSalary;
    this.employmentHours = employmentHours;
    this.agreementHours = agreementHours;
  }
}
