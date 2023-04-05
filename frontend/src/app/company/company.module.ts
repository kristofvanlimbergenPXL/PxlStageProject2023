import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
];

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class CompanyModule {}
