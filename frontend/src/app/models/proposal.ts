export interface IProposalLListItem {
  id: number;
  title: string;
  companyName: string;
  submissionDate: Date;
  status: ProposalStatus;
  hasNewMails: boolean;
}

export class Proposal {
  id: number;
  title: string;
  description: string;
  environments: string;
  remarks: string;
  researchTheme: string;
  conditions: string;
  preRequirements: string;
  contactedBy: string;

  studentsWanted: number;
  status: ProposalStatus;
  submissionDate: Date;
  semester: Semester;

  isPublishable: boolean;

  company: CompanyForProposal;
  companyContact: CompanyEmployeeForProposal;
  companyPromotor: CompanyEmployeeForProposal;

  students: StudentForProposal[];
  reviewers: ReviewerForProposal[];
  conversations: IConversationForProposal[];

  constructor(
    id: number,
    studentsWanted: number,
    status: ProposalStatus,
    submissionDate: Date,
    title: string,
    description: string,
    preRequirements: string,
    contactedBy: string,
    isPublishable: boolean,
    environments: string,
    researchTheme: string,
    semester: Semester,
    conditions: string,
    remarks: string,
    company: CompanyForProposal,
    companyContact: CompanyEmployeeForProposal,
    companyPromotor: CompanyEmployeeForProposal,
    students: StudentForProposal[],
    reviewers: ReviewerForProposal[],
    conversations: IConversationForProposal[]
  ) {
    this.id = id;
    this.studentsWanted = studentsWanted;
    this.status = status;
    this.submissionDate = submissionDate;
    this.title = title;
    this.description = description;
    this.preRequirements = preRequirements;
    this.contactedBy = contactedBy;
    this.isPublishable = isPublishable;
    this.semester = semester;
    this.environments = environments;
    this.researchTheme = researchTheme;
    this.conditions = conditions;
    this.remarks = remarks;
    this.company = company;
    this.companyContact = companyContact;
    this.companyPromotor = companyPromotor;
    this.reviewers = reviewers;
    this.students = students;
    this.conversations = conversations;
  }
}

export class CompanyForProposal {
  name: string;
  address: string;
  //promotors: CompanyEmployeeForProposal[];
  // contacts: CompanyEmployeeForProposal[];

  constructor(
    name: string,
    address: string
    // promotors: CompanyEmployeeForProposal[],
    //contacts: CompanyEmployeeForProposal[]
  ) {
    this.name = name;
    this.address = address;
    //this.promotors = promotors;
    //this.contacts = contacts;
  }
}

export class CompanyEmployeeForProposal {
  name: string;
  title: string;
  phoneNumber: string;
  email: string;

  constructor(name: string, title: string, phoneNumber: string, email: string) {
    this.name = name;
    this.title = title;
    this.phoneNumber = phoneNumber;
    this.email = email;
  }
}

export class ReviewerForProposal {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class StudentForProposal {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export interface IEmailForProposal {
  id: number;
  gmailId: string;
  subject: string;
  content: string;
  from: string;
  to: string;
  timeStamp: Date;
}

export interface IConversationForProposal {
  id: number;
  gmailThreadId: string;
  from: string;
  to: string;
  hasNewMails: boolean;
  timestamp: Date;
  subject: string;
}

export class UpdateProposalRequest {
  id: number;
  description: string;
  environments: string;
  remarks: string;
  researchTheme: string;
  conditions: string;
  preRequirements: string;

  studentsWanted: number;
  semester: Semester;

  constructor(
    id: number,
    studentsWanted: number,
    description: string,
    preRequirements: string,
    environments: string,
    researchTheme: string,
    semester: Semester,
    conditions: string,
    remarks: string
  ) {
    this.id = id;
    this.studentsWanted = studentsWanted;
    this.description = description;
    this.preRequirements = preRequirements;
    this.semester = semester;
    this.environments = environments;
    this.researchTheme = researchTheme;
    this.conditions = conditions;
    this.remarks = remarks;
  }
}

export enum ProposalStatus {
  Nieuw = 'Nieuw',
  Bevestigd = 'Bevestigd',
  InReview = 'InReview',
  ReviewOntvangen = 'ReviewOntvangen',
  InFeedBack = 'InFeedBack',
  FeedBackOntvangen = 'FeedBackOntvangen',
  Goedgekeurd = 'Goedgekeurd',
  Afgekeurd = 'Afgekeurd',
  Published = 'Published',
}

export enum Semester {
  Eerste = 'Eerste',
  Tweede = 'Tweede',
  Beiden = 'Beiden',
}
