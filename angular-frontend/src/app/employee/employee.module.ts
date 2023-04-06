import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import {ReviewerDetailComponent} from "../reviewers/reviewer-detail/reviewer-detail.component";


const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent },
];

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeDetailComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class EmployeeModule {}
