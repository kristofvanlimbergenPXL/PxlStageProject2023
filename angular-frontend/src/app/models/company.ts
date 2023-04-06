import {CompanyContact} from "./companyContact";
import {CompanyPromotor} from "./companyPromotor";
import {Proposal} from "./proposal";


export class Company{
  id:number;
  name:string;
  companyAddress:any ;
  stageLocationAddress:string;
  numberOfEmployees:number;
  numberOfItEmployees:number;
  numberofPromotors:number;
  preferredGraduation:string;
  companyContacts:CompanyContact[];
  companyPromotors:CompanyPromotor[];
  proposals:Proposal[];



  constructor(id: number, name: string, companyAddress: any, stageLocationAddress: string, numberOfEmployees: number, numberOfItEmployees: number, numberofPromotors: number, preferredGraduation: string, companyContacts: CompanyContact[], companyPromotors: CompanyPromotor[], proposals: Proposal[]) {
    this.id = id;
    this.name = name;
    this.companyAddress = companyAddress;
    this.stageLocationAddress = stageLocationAddress;
    this.numberOfEmployees = numberOfEmployees;
    this.numberOfItEmployees = numberOfItEmployees;
    this.numberofPromotors = numberofPromotors;
    this.preferredGraduation = preferredGraduation;
    this.companyContacts = companyContacts;
    this.companyPromotors = companyPromotors;
    this.proposals = proposals;
  }


}
