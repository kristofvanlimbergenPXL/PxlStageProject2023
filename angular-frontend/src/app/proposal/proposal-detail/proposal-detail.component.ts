import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  IConversationForProposal,
  Proposal,
  ProposalStatus,
  ReviewerForProposal,
  Semester,
  StudentForProposal,
  UpdateProposalRequest,
} from 'src/app/models/proposal';
import { Reviewer } from 'src/app/models/reviewer';
import { Student } from 'src/app/models/student';
import { ProposalService } from 'src/app/proposal/proposal.service';
import { ReviewerService } from 'src/app/reviewers/reviewer.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/dialog.component';
import { StudentService } from 'src/app/students/student.service';
import { AddToCollectionDialogComponent } from '../add-to-collection-dialog/add-to-collection-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { SendToPromotorDialogComponent } from '../send-to-promotor-dialog/send-to-promotor-dialog.component';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.scss'],
})
export class ProposalDetailComponent implements OnInit {
  proposal!: Proposal;
  proposalForm!: FormGroup;
  isLoading: boolean = false;
  reviewers?: Reviewer[];
  students?: Student[];
  proposalId: number = 0;
  semesters: string[] = Object.values(Semester);
  dataSource = new MatTableDataSource<IConversationForProposal>();
  displayedColumns: string[] = ['date', 'subject', 'from', 'to', 'hasMail'];

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private reviewerService: ReviewerService,
    private studentService: StudentService,
    private location: Location,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.proposalId = this.route.snapshot.params['id'];

    this.loadData();
  }

  loadData(): void {
    this.proposalService.getProposalById(this.proposalId).subscribe({
      next: (proposal) => {
        this.proposal = proposal;
        this.dataSource = new MatTableDataSource<IConversationForProposal>(
          this.proposal.conversations
        );
        this.patchValues();
        if (this.proposal.status === ProposalStatus.Nieuw) {
          this.proposalForm.disable();
        } else {
          this.proposalForm.enable();
        }
      },
      error: (err) => this.toastr.error(err.error.ErrorMessage),
    });
  }

  createForm(): void {
    this.proposalForm = new FormGroup({
      id: new FormControl(''),
      studentsWanted: new FormControl(''),
      description: new FormControl(''),
      isPublishable: new FormControl(''),
      environments: new FormControl(''),
      researchTheme: new FormControl(''),
      conditions: new FormControl(''),
      remarks: new FormControl(''),
      preRequirements: new FormControl(''),
      semester: new FormControl(''),
      numberOfStudents: new FormControl(''),
    });
  }

  patchValues(): void {
    this.proposalForm.patchValue({
      id: this.proposal.id,
      description: this.proposal.description,
      studentsWanted: this.proposal.studentsWanted,
      isPublishable: this.proposal.isPublishable,
      environments: this.proposal.environments,
      researchTheme: this.proposal.researchTheme,
      conditions: this.proposal.conditions,
      remarks: this.proposal.remarks,
      preRequirements: this.proposal.preRequirements,
      semester: this.proposal.semester,
      numberOfStudents: this.proposal.studentsWanted,
    });
  }

  onSubmit(): void {
    const updateProposalRequest: UpdateProposalRequest = {
      id: this.proposalForm.value.id,
      description: this.proposalForm.value.description,
      environments: this.proposalForm.value.environments,
      researchTheme: this.proposalForm.value.researchTheme,
      remarks: this.proposalForm.value.remarks,
      conditions: this.proposalForm.value.conditions,
      preRequirements: this.proposalForm.value.preRequirements,
      studentsWanted: this.proposalForm.value.numberOfStudents,
      semester: this.proposalForm.value.semester,
    };

    this.proposalService.updateProposal(updateProposalRequest).subscribe({
      next: (res) => {
        this.toastr.success('Voorstel succesvol upgedate');
        this.loadData();
      },
      error: (err) => this.toastr.error(err.error.ErrorMessage),
    });
  }

  previous(): void {
    this.location.back();
  }

  onAddReviewerClick(): void {
    this.reviewerService.getReviewers().subscribe({
      next: (data) => {
        // Get reviewers not assigned to this proposal
        let allReviewers = data;
        const allReviewerIds = this.proposal.reviewers.map((r) => r.id);
        this.reviewers = allReviewers.filter(
          (r) => r.id && !allReviewerIds.includes(r.id)
        );

        this.openAddPersonDialog('Reviewer');
      },
      error: (err) => {
        this.toastr.warning(err.error.ErrorMessage);
      },
    });
  }

  onAddStudentClick(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        //Get only students without a proposal attached
        const allStudents = data;
        this.students = allStudents.filter((s) => !s.proposalId);

        this.openAddPersonDialog('Student');
      },
      error: (err) => {
        this.toastr.error(err.error.ErrorMessage);
      },
    });
  }

  openAddPersonDialog(personType: string) {
    let dialogData = {
      typeOfPerson: personType,
      persons: personType === 'Reviewer' ? this.reviewers : this.students,
    };
    this.dialog
      .open(AddToCollectionDialogComponent, {
        data: dialogData,
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result.confirm === true) {
          this.tryAddPersonToList(personType, result.person);
        }
      });
  }

  tryAddPersonToList(personType: string, person: any): void {
    if (personType === 'Reviewer') {
      this.proposalService
        .addReviewerToProposal(this.proposal.id, person.id)
        .subscribe({
          next: () => {
            this.loadData();
            this.reviewers = this.reviewers?.filter((r) => {
              return r.id != person.id;
            });
          },
          error: (err) => this.toastr.error(err.error.ErrorMessage),
        });
    } else if (personType === 'Student') {
      this.proposalService
        .addStudentToProposal(this.proposal.id, person.id)
        .subscribe({
          next: () => {
            this.loadData();
            this.students = this.students?.filter((s) => {
              return s.id != person.id;
            });
          },
          error: (err) => this.toastr.error(err.error.ErrorMessage),
        });
    }
  }

  onDeleteReviewerClick(reviewer: ReviewerForProposal): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Reviewer verwijderen',
          question: `<strong>${reviewer.name}</strong> verwijderen van dit voorstel?`,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.proposalService
            .deleteReviewerFromProposal(this.proposal.id, reviewer.id)
            .subscribe({
              next: (res) => {
                this.loadData();
              },
              error: (err) => {
                this.toastr.error(err.error.ErrorMessage);
              },
            });
        }
      });
  }

  onDeleteStudentClick(student: StudentForProposal): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Student verwijderen',
          question: `<strong>${student.name}</strong> verwijderen van dit voorstel?`,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.proposalService
            .deleteStudentFromProposal(this.proposal.id, student.id)
            .subscribe({
              next: (res) => {
                this.loadData();
              },
              error: (err) => {
                this.toastr.error(err.error.ErrorMessage);
              },
            });
        }
      });
  }

  onConfirmClick() {
    this.isLoading = true;
    this.proposalService
      .updateStatus(this.proposal.id, ProposalStatus.Bevestigd)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success('Bevestigings mail verstuurd');
          this.loadData();
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }

  onSendToReviewersClick() {
    this.isLoading = true;
    this.proposalService
      .updateStatus(this.proposal.id, ProposalStatus.InReview)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success('Mails naar reviewer(s) verstuurd');
          this.loadData();
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }

  onSendToPromotorClick() {
    this.dialog
      .open(SendToPromotorDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result.action === 'Cancel') {
          return;
        } else if (result.action === 'Send') {
          this.isLoading = true;
          this.proposalService
            .sendToPromotor(
              result.title,
              result.content,
              this.proposal.id,
              result.sendAttachment
            )
            .pipe(finalize(() => (this.isLoading = false)))
            .subscribe({
              next: (res) => {
                this.toastr.success('Mail naar promotor verstuurd');
                this.loadData();
              },
              error: (err) => this.toastr.error(err.error.ErrorMessage),
            });
        }
      });
  }

  onSendToStudentsClick() {
    this.isLoading = true;
    this.proposalService
      .sendProposalDocuments(this.proposal.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.toastr.success('Stagedocumenten verstuurd');
          this.loadData();
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }

  onApprovalClick() {
    this.isLoading = true;
    this.proposalService
      .updateStatus(this.proposal.id, ProposalStatus.Goedgekeurd)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.loadData();
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }

  onRejectClick() {
    this.isLoading = true;
    this.proposalService
      .updateStatus(this.proposal.id, ProposalStatus.Afgekeurd)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.loadData();
        },
        error: (err) => this.toastr.error(`${err.error.ErrorMessage}`),
      });
  }

  onPublishClick() {
    this.isLoading = true;
    this.proposalService
      .publishProposal(this.proposal.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.loadData();
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }

  onUnListClick() {
    this.isLoading = true;
    this.proposalService
      .unListProposal(this.proposalId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          // this.toastr.success('voorstel verwijderd uit de blackboard lijst');
          this.loadData();
        },
        error: (err) => this.toastr.error(err.error.ErrorMessage),
      });
  }

  downloadPdf(id: number) {
    this.isLoading = true;

    this.proposalService.downloadPdf(id).subscribe({
      next: (pdf) => {
        this.isLoading = false;

        const file = new Blob([pdf], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error(`OPGELET! ${error.error.ErrorMessage}`);
      },
    });
  }

  onConversationClick(conversation: IConversationForProposal) {
    this.router.navigate([`/proposals/conversation/${conversation.id}`]);
  }
}
