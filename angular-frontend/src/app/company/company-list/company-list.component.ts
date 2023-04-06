import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Company } from '../../models/company';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../company-service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { CompanyContact } from '../../models/companyContact';
import { CompanyPromotor } from '../../models/companyPromotor';
import { Proposal } from '../../models/proposal';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CompanyListComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['naam', 'adres', 'contact', 'promotor'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Company | null;
  editedCompany!: Company;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  datasource = new MatTableDataSource<Company>();

  constructor(
    private service: CompanyService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.service.getCompanies().subscribe((data) => {
      this.datasource.data = data as Company[];
    });
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  onEditContact(person: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      person: new CompanyContact(
        person.id,
        person.title,
        person.lastName,
        person.firstName,
        person.phoneNumber,
        person.email,
        person.companyId
      ),
      company: this.editedCompany,
    };
    this.openDialog(dialogConfig);
  }

  onEditPromotor(person: CompanyPromotor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      person: new CompanyPromotor(
        person.id,
        person.title,
        person.lastName,
        person.firstName,
        person.phoneNumber,
        person.email,
        person.companyId
      ),
      company: this.editedCompany,
    };
    this.openDialog(dialogConfig);
  }

  openDialog(dialogConfig: any) {
    let dialogRef = this.dialog.open(CompanyFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  refresh() {
    this.service.getCompany(this.editedCompany!.id).subscribe((x) => {
      this.editedCompany = x as Company;
    });
  }

  onCLick(element: Company) {
    this.expandedElement = this.expandedElement === element ? null : element;
    this.editedCompany = element;
  }

  onNavigate(item: Proposal) {
    this.router.navigate([`/proposals/detail/${item.id}`]);
  }
}
