import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../models/employee";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  title: string = '';
  employee!: Employee;
  isVisible!: boolean;
  @Input() employeeFromParent!: Employee | null;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    console.log(this.employeeFromParent);
    this.createForm();

    if (this.employeeFromParent != null) {
      this.employee = this.employeeFromParent;
      this.setForm(this.employee);
      this.isVisible = false;

    } else {
      this.employee = new Employee("", "", "", "", "");
      this.title = 'Nieuwe employee toevoegen'
      this.isVisible = true;
    }
  }


  previous() {
    this.router.navigate(['/employees']);
  }

  private createForm() {

    this.employeeForm = new FormGroup({

      firstName: new FormControl('', [
        Validators.required,
      ]),

      lastName: new FormControl('', [
        Validators.required,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      rrn: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
      ]),


    });

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.setValues(this.employee);
    console.log("hallo");
    console.log(this.employee);

    if (this.employeeFromParent != null) {
      this.employeeService.editEmployee(this.employee).subscribe((res) => {
        //console.log(this.employee);
        this.setForm(this.employee);
        this.toastr.success("Gegevens succesvol opgeslagen.")
      })
    } else {
      this.employeeService.addEmployee(this.employee).subscribe((res) => {
        this.toastr.success("Gegevens succesvol opgeslagen.")
        this.previous();
      });
    }

  }

  private setValues(employee: Employee) {

    employee.firstName = this.employeeForm.value.firstName;
    employee.lastName = this.employeeForm.value.lastName;
    employee.email = this.employeeForm.value.email;
    employee.rrn = this.employeeForm.value.rrn;
    employee.phoneNumber = this.employeeForm.value.phoneNumber;
  }

  setForm(editEmployee: Employee) {
    this.employeeForm.patchValue({
      firstName: editEmployee.firstName,
      lastName: editEmployee.lastName,
      email: editEmployee.email,
      rrn: editEmployee.rrn,
      phoneNumber: editEmployee.phoneNumber
    });
  }
}
