
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import { DashBoardComponent } from "./dash-board/dash-board.component";
import { GoogleChartsModule } from "angular-google-charts";


const routes: Routes = [
  { path: '', component: DashBoardComponent },
];

@NgModule({
  declarations: [
   DashBoardComponent
  ],
    imports: [CommonModule, SharedModule,GoogleChartsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class DashboardModule {}
