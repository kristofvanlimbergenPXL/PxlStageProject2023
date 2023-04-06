import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/dialog.component';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  title: string = '';
  buttonText: string = '';
  student!: Student;
  studentForm!: FormGroup;
  id!: number;
  isVisible!: boolean;

  constructor(
    private service: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id != 0) {
      this.isVisible = true;
      this.title = 'Student aanpassen';
      this.buttonText = 'Updaten';
      this.service.getStudent(this.id).subscribe((data) => {
        this.student = data;
        this.setForm(data);
      });
    } else {
      this.isVisible = false;
      this.title = 'Nieuwe student toevoegen';
      this.buttonText = 'Toevoegen';
      this.student = new Student('', '', '', '', '', '', '', '', '');
    }
  }

  onSubmit() {
    this.setValues(this.student);

    if (this.id != 0) {
      this.service.editStudent(this.student).subscribe((res) => {
        this.goBack();
      })
    } else {
      this.service.addStudent(this.student).subscribe((res) => {
        this.goBack();
      });
    }
  }

  createForm() {
    this.studentForm = new FormGroup({
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      houseNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(10)
      ]),
      township: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      privateEmail: new FormControl('', [
        Validators.email,
        Validators.maxLength(70)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(70)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      modelTraject: new FormControl(true)
    });
  }

  setForm(editStudent: Student) {
    this.studentForm.patchValue({
      lastName: editStudent.lastName,
      firstName: editStudent.firstName,
      street: editStudent.street,
      houseNumber: editStudent.houseNumber,
      postalCode: editStudent.postalCode,
      township: editStudent.township,
      privateEmail: editStudent.privateEmail,
      email: editStudent.email,
      phoneNumber: editStudent.phoneNumber,
      modelTraject: editStudent.modelTraject,
    });
  }

  setValues(finalStudent: Student) {
    //Make sure last name starts with capital
    //Necessary for correctly ordering students alphabetically
    //LastName starting with small letter would be ordered at the end otherwise
    let lastName = this.studentForm.value.lastName;
    let lastNameStartingWithCapital =
      lastName[0].toUpperCase() + lastName.substr(1);

    finalStudent.lastName = lastNameStartingWithCapital;
    finalStudent.firstName = this.studentForm.value.firstName;
    finalStudent.street = this.studentForm.value.street;
    finalStudent.houseNumber = this.studentForm.value.houseNumber;
    finalStudent.postalCode = this.studentForm.value.postalCode;
    finalStudent.township = this.studentForm.value.township;
    finalStudent.privateEmail =
      this.studentForm.value.privateEmail.toLowerCase();
    finalStudent.email = this.studentForm.value.email.toLowerCase();
    finalStudent.phoneNumber = this.studentForm.value.phoneNumber;
    finalStudent.modelTraject = this.studentForm.value.modelTraject;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  };

  deleteStudent(student: Student) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Student verwijderen',
          question: `Bent u zeker dat u <strong>${student.lastName} ${student.firstName}</strong> wilt verwijderen?`,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.service.removeStudent(student).subscribe({
            next: (res) => {
              this.goBack();
            },
          });
        }
      });
  }

  goBack() {
    this.router.navigate(['/students']);
  }
}
