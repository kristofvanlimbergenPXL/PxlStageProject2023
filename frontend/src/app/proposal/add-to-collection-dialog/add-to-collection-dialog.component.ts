import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, startWith } from 'rxjs';
import { Reviewer } from 'src/app/models/reviewer';

@Component({
  selector: 'app-add-to-collection-dialog',
  templateUrl: './add-to-collection-dialog.component.html',
  styleUrls: ['./add-to-collection-dialog.component.scss'],
})
export class AddToCollectionDialogComponent implements OnInit {
  typeOfPerson!: string;
  persons!: any;
  selectedPerson!: FormControl;
  filteredPersons!: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<AddToCollectionDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    this.selectedPerson = new FormControl(null, Validators.required);
    this.typeOfPerson = this.data.typeOfPerson ?? '';
    this.persons = this.data.persons ?? new Array<Reviewer[]>();
    if (this.persons.length < 1) {
      this.toastr.warning(
        `Geen vrije ${this.typeOfPerson.toLowerCase()}${
          this.typeOfPerson === 'Reviewer' ? 's' : 'en'
        } gevonden`
      );
    }
    this.filteredPersons = this.selectedPerson.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: any): any[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      return this.persons.filter((pers: any) => {
        const fullName = `${pers.firstName} ${pers.lastName}`.toLowerCase();
        return fullName.includes(filterValue);
      });
    } else {
      return this.persons.filter((person: any) => {
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        const selectedFullName =
          `${value.firstName} ${value.lastName}`.toLowerCase();
        return fullName === selectedFullName;
      });
    }
  }

  displayPerson(person: any): string {
    if (person) {
      return `${person.firstName} ${person.lastName}`;
    } else {
      return '';
    }
  }

  close(confirmed: boolean) {
    if (confirmed)
      this.dialogRef.close({
        confirm: true,
        person: this.selectedPerson.value,
      });
    else this.dialogRef.close({ confirm: false });
  }
}
