import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Proposal,
  IProposalLListItem,
  UpdateProposalRequest,
  ProposalStatus,
  IEmailForProposal,
} from '../models/proposal';

@Injectable({
  providedIn: 'root',
})
export class ProposalService {
  baseProposalUrl: string = environment.baseUrls.proposals;
  baseEmailsUrl: string = environment.baseUrls.emails;

  constructor(private httpClient: HttpClient) {}

  getProposals(): Observable<IProposalLListItem[]> {
    return this.httpClient.get<IProposalLListItem[]>(this.baseProposalUrl);
  }

  getProposalById(id: number): Observable<Proposal> {
    return this.httpClient.get<Proposal>(`${this.baseProposalUrl}/${id}`);
  }

  downloadPdf(id: number) {
    return this.httpClient.get(`${this.baseProposalUrl}/${id}/pdf-export`, {
      responseType: 'blob',
    });
  }

  updateProposal(request: UpdateProposalRequest): Observable<unknown> {
    return this.httpClient.put(this.baseProposalUrl, request);
  }

  addReviewerToProposal(id: number, reviewerId: number): Observable<unknown> {
    return this.httpClient.put(`${this.baseProposalUrl}/${id}/add-reviewer`, {
      reviewerId: reviewerId,
    });
  }

  addStudentToProposal(id: number, studentId: number): Observable<unknown> {
    return this.httpClient.put(`${this.baseProposalUrl}/${id}/add-student`, {
      studentId: studentId,
    });
  }

  deleteReviewerFromProposal(
    id: number,
    reviewerId: number
  ): Observable<unknown> {
    return this.httpClient.delete(
      `${this.baseProposalUrl}/${id}/remove-reviewer/${reviewerId}`
    );
  }

  deleteStudentFromProposal(
    id: number,
    studentId: number
  ): Observable<unknown> {
    return this.httpClient.delete(
      `${this.baseProposalUrl}/${id}/remove-student/${studentId}`
    );
  }

  updateStatus(id: number, status: ProposalStatus): Observable<unknown> {
    return this.httpClient.put(`${this.baseProposalUrl}/${id}/update-status`, {
      status: status,
    });
  }

  getMailsForConversation(
    conversationId: number
  ): Observable<IEmailForProposal[]> {
    return this.httpClient.get<IEmailForProposal[]>(
      `${this.baseEmailsUrl}/conversation/${conversationId}`
    );
  }

  sendReplyMail(emailId: string, replyText: string): Observable<unknown> {
    const replyEmailRequest = { emailId: emailId, replyText: replyText };
    return this.httpClient.post(
      `${this.baseEmailsUrl}/reply`,
      replyEmailRequest
    );
  }

  sendToPromotor(
    title: string,
    content: string,
    proposalId: number,
    sendAttachment: boolean
  ): Observable<unknown> {
    const promotorEmailRequest = {
      title: title,
      content: content,
      proposalId: proposalId,
      sendAttachment: sendAttachment,
    };
    return this.httpClient.post(
      `${this.baseEmailsUrl}/send-promotor`,
      promotorEmailRequest
    );
  }

  sendProposalDocuments(proposalId: number): Observable<unknown> {
    return this.httpClient.get(`${this.baseEmailsUrl}/documents/${proposalId}`);
  }

  markAsUnread(emailId: number): Observable<unknown> {
    return this.httpClient.get(`${this.baseEmailsUrl}/mark-unread/${emailId}`);
  }

  publishProposal(proposalId: number): Observable<unknown> {
    return this.httpClient.get(`${this.baseProposalUrl}/${proposalId}/publish`);
  }

  unListProposal(proposalId: number): Observable<unknown> {
    return this.httpClient.get(
      `${this.baseProposalUrl}/${proposalId}/unpublish`
    );
  }
}
