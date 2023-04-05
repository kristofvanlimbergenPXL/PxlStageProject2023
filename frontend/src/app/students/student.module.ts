import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import { StudentListComponent } from './student-list/student-list.component';
import { MatInputModule } from '@angular/material/input';
import { StudentFormComponent } from './student-form/student-form.component';
import { DragDropStudentCsvComponent } from './drag-drop-student-csv/drag-drop-student-csv.component';

//start route = /students

const routes = [
  { path: '', component: StudentListComponent },
  { path: 'add', component: StudentFormComponent },
  { path: 'csv/sort', component: DragDropStudentCsvComponent },
  { path: 'csv/import', component: StudentListComponent  },
  { path: 'csv/:id', component: DragDropStudentCsvComponent },
  { path: ':id', component: StudentFormComponent },
];

@NgModule({
  declarations: [StudentListComponent, StudentFormComponent, DragDropStudentCsvComponent],
  imports: [CommonModule, SharedModule, MatInputModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class StudentModule {}
