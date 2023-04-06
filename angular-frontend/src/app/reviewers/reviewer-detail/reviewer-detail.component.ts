import { Observable } from 'rxjs';
import { ReviewerService } from '../reviewer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reviewer } from 'src/app/models/reviewer';
import { Proposal } from 'src/app/models/proposal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewerFormComponent } from '../reviewer-form/reviewer-form.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reviewer-detail',
  templateUrl: './reviewer-detail.component.html',
  styleUrls: ['./reviewer-detail.component.scss'],
})
export class ReviewerDetailComponent implements OnInit {
  reviewer: any = {};
  proposals$!: Observable<Proposal[]>;
  removed: boolean = false;
  id!: number;
  displayedColumnsForProposal: string[] = [
    'title',
    'description',
    'students',
    'theme',
    'status',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reviewerService: ReviewerService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('reviewer'));
    this.reviewerService.getReviewer(this.id).subscribe((r) => {
      this.reviewer = r as Reviewer;
    });
  }

  updateReviewer() {
    const updatedialogConfig = new MatDialogConfig();
    updatedialogConfig.autoFocus = true;
    updatedialogConfig.data = this.reviewer;

    let updateRef = this.dialog.open(ReviewerFormComponent, updatedialogConfig);

    updateRef.afterClosed().subscribe((data: any) => {
      if (data.result === true) {
        this.reviewer.firstName = data.firstname;
        this.reviewer.lastName = data.lastname;
        this.reviewer.email = data.email;
        this.reviewerService.updateReviewer(this.reviewer).subscribe({
          next: (rev) => {
            this.reviewer = rev as Reviewer;
            this.router.navigate(['/reviewers']);
          },
          error: (err) =>
            this.toastr.error(
              err.error.ErrorMessage ?? 'Onverwachte front-end fout opgetreden'
            ),
        });
      }
    });
  }

  refreshAfterUpdate() {
    this.reviewerService.getReviewer(this.id).subscribe((rev) => {
      this.reviewer = rev as Reviewer;
    });
  }

  deleteReviewer() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Gelieve te bevestigen',
          question: `<strong>${this.reviewer.firstName} ${this.reviewer.lastName}</strong> verwijderen uit de lijst van reviewers?`,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.reviewerService.deleteReviewer(this.id).subscribe({
            next: () => {
              this.router.navigate(['/reviewers']);
            },
            error: () => {
              this.toastr.error(`Oeps, er is iets foutgelopen`);
            },
          });
        }
      });
  }

  previous(): void {
    this.router.navigate(['/reviewers']);
  }

  proposalDetail(proposal: Proposal) {
    this.router.navigate([`/proposals/detail/${proposal.id}`]);
  }
}
