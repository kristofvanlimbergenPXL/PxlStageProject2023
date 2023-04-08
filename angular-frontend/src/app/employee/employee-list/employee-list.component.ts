import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Employee} from "../../models/employee";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {Company} from "../../models/company";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  dataSource = new MatTableDataSource<Employee>();
  selectedEmployee!: Employee;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router: Router,
              private employeeService: EmployeeService,
              public dialog: MatDialog,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getEmployees();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.dataSource.data = data as Employee[];
      console.log(data);
    });
  }

  addEmployee() {

    this.router.navigate(['/employees/create']);
  }

  selectEmployee(employee: Employee) {

    this.selectedEmployee = employee;
    this.router.navigate([`/employees/detail/${employee.id}`])
  }

  onDeleteEmployee(employee: Employee) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Gelieve te bevestigen',
          question: `<strong>${employee.firstName} ${employee.lastName}</strong> verwijderen uit de lijst van employees?`,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.employeeService.deleteEmployee(employee.id).subscribe({
            next: () => {
              //refresh
              this.getEmployees();
            },
            error: (err) => {
              this.toastr.error(`Oeps, er is iets foutgelopen: ${err.error.ErrorMessage})`);
            },
          });
        }
      });

  }
}
