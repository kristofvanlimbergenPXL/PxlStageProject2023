import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import { ReviewerDetailComponent } from './reviewer-detail/reviewer-detail.component';
import { ReviewerFormComponent } from './reviewer-form/reviewer-form.component';
import { ReviewerListComponent } from './reviewer-list/reviewer-list.component';

//start route = /reviewers

const routes = [
  { path: '', component: ReviewerListComponent },
  { path: 'detail/:reviewer', component: ReviewerDetailComponent },
];

@NgModule({
  declarations: [
    ReviewerListComponent,
    ReviewerDetailComponent,
    ReviewerFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class ReviewerModule {}
