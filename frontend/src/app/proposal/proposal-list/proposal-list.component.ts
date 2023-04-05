import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs';
import { IProposalLListItem, ProposalStatus } from 'src/app/models/proposal';
import { ProposalService } from 'src/app/proposal/proposal.service';

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.scss'],
})
export class ProposalListComponent implements OnInit {
  dataSource = new MatTableDataSource<IProposalLListItem>();
  filterInput: FormControl = new FormControl();
  statuses: string[] = Object.values(ProposalStatus);
  filterValues: any = {
    searchText: '',
    status: '',
    mails: false,
  };
  displayedColumns: string[] = [
    'companyName',
    'title',
    'submissionDate',
    'hasMail',
    'status',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private proposalService: ProposalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.proposalService.getProposals().subscribe({
      next: (res) => {
        let mappedResult = res.map((e) => ({
          ...e,
          status: (<any>ProposalStatus)[e.status],
        }));
        this.dataSource = new MatTableDataSource<IProposalLListItem>(
          mappedResult
        );
        this.dataSource.paginator = this.paginator;
        this.filterInput.valueChanges
          .pipe(debounceTime(200))
          .subscribe((val) => {
            this.filterValues.searchText = val.trim().toLowerCase();
            this.dataSource.filter = JSON.stringify(this.filterValues);
          });
        this.dataSource.filterPredicate = (data: any, filter: string) => {
          let filterTerms = JSON.parse(filter);
          return (
            (data.companyName
              .trim()
              .toLowerCase()
              .indexOf(filterTerms.searchText) !== -1 ||
              data.title
                .trim()
                .toLowerCase()
                .indexOf(filterTerms.searchText) !== -1) &&
            data.status.trim().toLowerCase().indexOf(filterTerms.status) !==
              -1 &&
            (filterTerms.mails === false ||
              data.hasNewMails == filterTerms.mails)
          );
        };
      },
    });
  }

  onRowClick(row: IProposalLListItem) {
    this.router.navigate([`/proposals/detail/${row.id}`]);
  }

  filterStatus(event: MatSelectChange) {
    this.filterValues.status = event.value?.trim().toLowerCase() ?? '';
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  filterMails(event: MatSlideToggleChange) {
    this.filterValues.mails = event.checked;
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
}
