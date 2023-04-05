import { ReviewerFormComponent } from './../reviewer-form/reviewer-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Reviewer } from '../../models/reviewer';
import { ReviewerService } from '../reviewer.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-reviewer-list',
  templateUrl: './reviewer-list.component.html',
  styleUrls: ['./reviewer-list.component.scss'],
})
export class ReviewerListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Reviewer>();
  selectedReviewer!: Reviewer;
  displayedColumns: string[] = ['name', 'email', 'proposals'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reviewerService: ReviewerService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.reviewerService.getReviewers().subscribe((data) => {
      this.dataSource.data = data as Reviewer[];
    });
  }

  selectReviewer(reviewer: Reviewer) {
    this.selectedReviewer = reviewer;
    this.router.navigate(['/reviewers/detail', this.selectedReviewer.id]);
  }

  addReviewer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog
      .open(ReviewerFormComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: (res) => {
          if (res.result === true) {
            const reviewer: Reviewer = {
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
            };
            this.reviewerService.addReviewer(reviewer).subscribe(() => {
              console.log('hierin');
              this.fetchData();
            });
          }
        },
      });
  }
}
