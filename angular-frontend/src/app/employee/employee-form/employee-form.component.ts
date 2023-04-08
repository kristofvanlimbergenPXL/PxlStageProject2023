import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EmployeeService} from "../employee.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../models/employee";
import {Student} from "../../models/student";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm!: FormGroup;
  title: string = 'Nieuwe employee toevoegen';
  employee!: Employee;
  @Input() employeeFromParent!: Employee | null;

  constructor(private router: Router,
              private employeeService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.employeeFromParent);
    this.createForm();

    if (this.employeeFromParent != null) {
      this.employee = this.employeeFromParent;
      this.setForm(this.employee);
      //console.log("from parent");
      //console.log(this.employeeFromParent);

    } else {
      this.employee = new Employee("", "", "", "");
     // console.log("new employee");
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
      /*birthDate: new FormControl('', [
        Validators.required,
      ]),*/
      rrn: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
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
      })
    } else {
      this.employeeService.addEmployee(this.employee).subscribe((res) => {
        this.previous();
      });
    }

  }

  private setValues(employee: Employee) {

    employee.firstName = this.employeeForm.value.firstName;
    employee.lastName = this.employeeForm.value.lastName;
    employee.email = this.employeeForm.value.email;
    //employee.birthDate=this.employeeForm.value.birthDate;
    employee.rrn = this.employeeForm.value.rrn;
  }

  setForm(editEmployee: Employee) {
    this.employeeForm.patchValue({
      firstName: editEmployee.firstName,
      lastName: editEmployee.lastName,
      email: editEmployee.email,
      rrn: editEmployee.rrn
    });
  }
}
