import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../company-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyContact } from '../../models/companyContact';
import { CompanyPromotor } from '../../models/companyPromotor';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  personEdit: any = {};
  contact!: CompanyContact;
  promotor!: CompanyPromotor;
  companyForm!: FormGroup;
  // email_regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');

  constructor(
    public dialogRef: MatDialogRef<CompanyFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private service: CompanyService
  ) { }

  ngOnInit(): void {
    this.createForm();

    if (this.data.person instanceof CompanyContact) {
      this.contact = this.data.person;
      this.patchValues(this.contact);
      this.personEdit = this.contact;
    } else if (this.data.person instanceof CompanyPromotor) {
      this.promotor = this.data.person;
      this.patchValues(this.promotor);
      this.personEdit = this.promotor;
    }
  }

  onNoClick() {
    this.dialogRef.close(0);
  }

  onSubmit() {
    if (this.companyForm.touched && this.companyForm.dirty) {
      this.setNewValues(this.personEdit);
      this.editRequest(this.personEdit);
    }
  }

  setNewValues(editPerson: any) {
    editPerson.title = this.companyForm.value.title;
    editPerson.lastName = this.companyForm.value.lastName;
    editPerson.firstName = this.companyForm.value.firstName;
    editPerson.phoneNumber = this.companyForm.value.phoneNumber;
    editPerson.email = this.companyForm.value.email;
  }

  editRequest(editPerson: any) {
    if (editPerson instanceof CompanyContact) {
      this.service.editContact(editPerson).subscribe(() => {
        this.dialogRef.close(0);
        this.toastr.success(`Contactgegevens van: ${editPerson.firstName} ${editPerson.lastName} zijn succesvol gewijzigd.`);
      });
    } else if (editPerson instanceof CompanyPromotor) {
      this.service.editPromotor(editPerson).subscribe(() => {
        this.dialogRef.close(0);
        this.toastr.success(`Promotorgegevens van: ${editPerson.firstName} ${editPerson.lastName} zijn succesvol gewijzigd.`);
      });
    }
  }
  createForm() {
    this.companyForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(70),
        Validators.email
        // Validators.pattern(this.email_regex)
      ])
    });
  }

  patchValues(person: any) {
    this.companyForm.patchValue({
      title: person.title,
      lastName: person.lastName,
      firstName: person.firstName,
      phoneNumber: person.phoneNumber,
      email: person.email,
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.companyForm.controls[controlName].hasError(errorName);
  };
}
