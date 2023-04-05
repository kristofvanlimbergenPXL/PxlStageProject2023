import { Reviewer } from './../../models/reviewer';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reviewer-form',
  templateUrl: './reviewer-form.component.html',
  styleUrls: ['./reviewer-form.component.scss'],
})
export class ReviewerFormComponent implements OnInit {
  edited: boolean = false;
  reviewerForm!: FormGroup;
  reviewer!: Reviewer;
  title: string = 'Voeg reviewer toe';
  buttonText: string = 'Toevoegen';
  // email_regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');

  // Form requirements - messages
  lastname_req: string = 'Familienaam is een verplicht veld!';
  lastname_to_long: string = 'Familienaam mag slechts 50 karakters bevatten!';
  firstname_req: string = 'Voornaam is een verplicht veld!';
  firstname_to_long: string = 'Voornaam mag slechts 50 karakters bevatten!';
  email_req: string = 'Email is een verplicht veld!';
  email_invalid: string = 'Ongeldig email formaat!';
  email_to_long: string = 'Email mag slechts 70 karakters bevatten!';

  constructor(
    public dialogRef: MatDialogRef<ReviewerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.reviewer = this.data;
    this.createForm();

    if (!this.reviewer != undefined) {
      this.patchValues();
      this.title = 'Reviewer updaten';
      this.buttonText = 'Updaten';
    } else {
      this.reviewer = new Reviewer('', '', '', []);
    }
  }

  close(data: any) {
    this.dialogRef.close(data);
  }

  onSubmit() {
    if (this.reviewerForm.touched && this.reviewerForm.dirty) {
      if (this.reviewer) {
        this.editDataReviewer();
      } else {
        this.addReviewer();
      }
    }
  }

  createForm() {
    this.reviewerForm = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(70),
        Validators.email,
        // Validators.pattern(this.email_regex),
      ]),
    });
  }

  patchValues() {
    this.reviewerForm.patchValue({
      firstname: this.reviewer.firstName,
      lastname: this.reviewer.lastName,
      email: this.reviewer.email,
    });
  }

  editDataReviewer() {
    const data = {
      result: true,
      firstname: this.reviewerForm.value.firstname,
      lastname: this.reviewerForm.value.lastname,
      email: this.reviewerForm.value.email,
    };
    this.close(data);
  }

  addReviewer() {
    const data = {
      result: true,
      firstName: this.reviewerForm.value.firstname,
      lastName: this.reviewerForm.value.lastname,
      email: this.reviewerForm.value.email,
    };
    this.close(data);
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.reviewerForm.controls[controlName].hasError(errorName);
  };
}
