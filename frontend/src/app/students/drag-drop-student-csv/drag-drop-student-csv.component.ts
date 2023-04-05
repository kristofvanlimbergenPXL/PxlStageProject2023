import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentCsv } from 'src/app/models/studentCsv';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-drag-drop-student-csv',
  templateUrl: './drag-drop-student-csv.component.html',
  styleUrls: ['./drag-drop-student-csv.component.scss']
})
export class DragDropStudentCsvComponent implements OnInit {
  actualStudentCsv!: StudentCsv;
  actualOrderArray: string[] = [];
  newOrderArray: string[] = [];
  propertyIndexArray: number[] = [];
  actualOrderString!: string;
  newOrderString: string = '';

  //Only used to visualize properties for user in Dutch
  studentProperties = [
    'Familienaam',
    'Voornaam',
    'Straat',
    'Huisnummer',
    'Postcode',
    'Gemeente',
    'Privé E-mail',
    'PXL E-mail',
    'Telefoonnummer',
  ];

  //Only used to visualize Column Order for user
  columnNames = [
    //Overbodig?
    'Kolom A',
    'Kolom B',
    'Kolom C',
    'Kolom D',
    'Kolom E',
    'Kolom F',
    'Kolom G',
    'Kolom H',
    'Kolom I',
  ];

  constructor(
    private service: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getActualCsvOrder();
  }

  getActualCsvOrder() {
    this.service.getActualStudentCsv().subscribe((data) => {
      this.actualStudentCsv = data;
      this.createActualOrderArray(this.actualStudentCsv);
    });
  }

  createActualOrderArray(csvOrder: StudentCsv) {
    // Shows Actual Order to User
    this.actualOrderArray = [];

    // Shows New DragDrop Order to User
    this.newOrderArray = [];

    // Keeps track of DragDrop Order indexes
    this.propertyIndexArray = [];

    // Create string of actualCsvPropertyOrder to facilitate next step (ex: "012345678")
    this.actualOrderString = '';
    for (let [key, value] of Object.entries(csvOrder)) {
      if (key != 'id') {
        this.actualOrderString += value - 1;
      }
    }

    //Fill all arrays with correct properties for DragDrop functionality (visible to user)
    for (
      let position = 0;
      position < this.actualOrderString.length;
      position++
    ) {
      let indexOfValue = this.actualOrderString.indexOf(position.toString());
      this.actualOrderArray.push(this.studentProperties[indexOfValue]);
      this.newOrderArray.push(this.studentProperties[indexOfValue]);
      this.propertyIndexArray.push(indexOfValue);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    //Keeps track of DragDrop movements and re-arranges arrays accordingly
    moveItemInArray(
      this.newOrderArray,
      event.previousIndex,
      event.currentIndex
    );
    moveItemInArray(
      this.propertyIndexArray,
      event.previousIndex,
      event.currentIndex
    );
  }

  saveOrder(): any {
    //Update actualCsvPropertyOrder
    let index = 0;
    for (let item of this.propertyIndexArray) {
      index += 1;
      switch (item) {
        case 0: {
          this.actualStudentCsv.lastNameIndex = index;
          break;
        }
        case 1: {
          this.actualStudentCsv.firstNameIndex = index;
          break;
        }
        case 2: {
          this.actualStudentCsv.streetIndex = index;
          break;
        }
        case 3: {
          this.actualStudentCsv.houseNumberIndex = index;
          break;
        }
        case 4: {
          this.actualStudentCsv.postalCodeIndex = index;
          break;
        }
        case 5: {
          this.actualStudentCsv.townshipIndex = index;
          break;
        }
        case 6: {
          this.actualStudentCsv.privateEmailIndex = index;
          break;
        }
        case 7: {
          this.actualStudentCsv.emailIndex = index;
          break;
        }
        case 8: {
          this.actualStudentCsv.phoneNumberIndex = index;
          break;
        }
        default: {
          this.toastr.error(`Fout bij het verwerken van CSV-file`);
          break;
        }
      }
    }

    //Save actualCsvPropertyOrder in database and re-arrange "Actuele rangschikking" visible to user
    this.service
      .updateStudentCsv(this.actualStudentCsv)
      .subscribe((res) => {
        this.createActualOrderArray(this.actualStudentCsv);
      });

    //Confirm to user that re-arrange of property order has been successfull
    this.toastr.success(`Volgorde van CSV-file aangepast.`);
  }

  goBack() {
    this.router.navigate(['/settings']);
  }
}
