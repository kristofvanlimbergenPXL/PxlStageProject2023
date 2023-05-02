import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {ToastrService} from "ngx-toastr";
import {EmployeeDetail} from "../../models/employeeDetail";
import {Agreement} from "../../models/agreement";
import {AgreementService} from "../../agreement/agreement.service";
import {EmployeeAddress} from "../../models/EmployeeAddress";
import {map} from "rxjs";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})


export class EmployeeDetailComponent implements OnInit {

  employeeId!: number;
  employeeAddress!: EmployeeAddress;
  agreement!: Agreement | null;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private agreementService:AgreementService,
              private toastr: ToastrService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {

    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee();

  }

  loadEmployee(): void {
    this.employeeService.getEmployeeById(this.employeeId).pipe(map(x=>{
      return {...x}
    })).subscribe({
      next: (employee) => {
        this.employeeAddress = employee;
        //console.log("hallo");
        //console.log(this.employeeAddress.employee.agreements[0]);
        this.agreement=this.employeeAddress.employee.agreements[0];
      },
      error: (err) => this.toastr.error(err.error.ErrorMessage),
    });
  }

  previous() {
    this.router.navigate(['/employees']);
  }

  onSelect(agreementSelect: Agreement) {
    this.agreement = agreementSelect;
  }

  //TODO
  onAddAgreement() {

  }
}
