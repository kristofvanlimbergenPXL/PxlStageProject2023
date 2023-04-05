import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEmailForProposal } from 'src/app/models/proposal';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.scss'],
})
export class ConversationDetailComponent implements OnInit {
  emails!: IEmailForProposal[];
  replyText: FormControl = new FormControl();
  showReply: boolean = false;
  conversationId!: number;
  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.conversationId = this.route.snapshot.params['id'];

    this.proposalService
      .getMailsForConversation(this.conversationId)
      .subscribe({
        next: (res) => {
          this.emails = res;
        },
        error: (err) => {
          this.toastr.error(err.error.ErrorMessage);
        },
      });
  }

  onReplyClick() {
    if (this.showReply === true) {
      const reply = this.replyText.getRawValue();
      if (reply === '' || reply === undefined || reply === null) {
        this.toastr.error('Gelieve eerst een reply text in te geven');
        return;
      }
      this.proposalService
        .sendReplyMail(this.emails[this.emails.length - 1].gmailId, reply)
        .subscribe({
          next: (res) => {
            this.toastr.success('Reply met succes verzonden!');
            this.location.back();
          },
          error: (err) => this.toastr.error(err.error.ErrorMessage),
        });
    } else {
      this.showReply = true;
    }
  }

  onMarkAsUnreadClick() {
    this.proposalService.markAsUnread(this.emails[0].id).subscribe({
      next: (res) => {
        this.location.back();
      },
      error: (err) => {
        this.toastr.error(err.error.ErrorMessage);
      },
    });
  }

  return(): void {
    this.location.back();
  }
}
