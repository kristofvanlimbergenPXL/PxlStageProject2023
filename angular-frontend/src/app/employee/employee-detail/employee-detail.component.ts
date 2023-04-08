import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {coerceNumberProperty} from "@angular/cdk/coercion";
import {MatTableDataSource} from "@angular/material/table";
import {IConversationForProposal, Proposal, ProposalStatus} from "../../models/proposal";
import {Employee} from "../../models/employee";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId!: number;
  employee!: Employee;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private toastr: ToastrService,
              private router:Router
              ) {
  }

  ngOnInit(): void {

    this.employeeId =Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee();

  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.employee = employee;
        console.log(this.employee);
      },
      error: (err) => this.toastr.error(err.error.ErrorMessage),
    });
  }


  previous() {
    this.router.navigate(['/employees']);
  }
}
