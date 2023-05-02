import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Agreement} from "../../models/agreement";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AgreementService} from "../agreement.service";


@Component({
  selector: 'app-agreement-form',
  templateUrl: './agreement-form.component.html',
  styleUrls: ['./agreement-form.component.scss']
})
export class AgreementFormComponent implements OnInit, OnChanges {
  agreementForm!: FormGroup;
  isVisible!: boolean;
  title: string = "";
  agreement!: Agreement;
  @Input() agreementFromParent!: Agreement | null;
  @Input() employeeIdFromParent!: number

  constructor(private router: Router,
              private agreementService: AgreementService,
              private toastr: ToastrService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['agreementFromParent'] && changes['agreementFromParent'].currentValue) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.createForm();

    if (this.agreementFromParent != null) {
      this.agreement = this.agreementFromParent;
      this.setForm(this.agreement);
      this.isVisible = false;

    } else {
      this.agreement = new Agreement("", 0, 0, 0);
      this.title = 'Nieuwe overeenkomst toevoegen'
      this.isVisible = true;
    }
  }


  onSubmit() {

    this.setValues(this.agreement);

    if (this.agreementFromParent != null) {
      this.agreementService.editAgreement(this.agreement).subscribe((res) => {
        //console.log(this.employee);
        this.setForm(this.agreement);
        this.toastr.success("Gegevens succesvol opgeslagen.")
      })
    } else {
      this.agreementService.addAgreement(this.employeeIdFromParent, this.agreement).subscribe((res) => {
        this.toastr.success("Gegevens succesvol opgeslagen.")
        this.agreementForm.reset();
      });
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.agreementForm.controls[controlName].hasError(errorName);
  };

  private createForm() {
    this.agreementForm = new FormGroup({
      workFunction: new FormControl('', [
        Validators.required,
      ]),

      grossSalary: new FormControl('', [
        Validators.required,
      ]),
      employmentHours: new FormControl('', [
        Validators.required,
      ]),
      agreementHours: new FormControl('', [
        Validators.required,
      ]),

    });

  }

  setForm(agreement: Agreement) {
    this.agreementForm.patchValue({
      workFunction: agreement.workFunction,
      grossSalary: agreement.grossSalary,
      employmentHours: agreement.employmentHours,
      agreementHours: agreement.agreementHours,
    });
  }

  private setValues(agreement: Agreement) {
    agreement.workFunction = this.agreementForm.value.workFunction;
    agreement.grossSalary = this.agreementForm.value.grossSalary;
    agreement.employmentHours = this.agreementForm.value.employmentHours;
    agreement.agreementHours = this.agreementForm.value.agreementHours;
  }

}
