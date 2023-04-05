import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import {EmployeeListComponent} from "./employee-list/employee-list.component";


const routes: Routes = [
  { path: '', component: EmployeeListComponent },
];

@NgModule({
  declarations: [
    EmployeeListComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class EmployeeModule {}
