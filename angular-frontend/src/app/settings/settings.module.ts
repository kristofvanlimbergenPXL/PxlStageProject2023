import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';
import { SettingsComponent } from './settings-overview/settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
];

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class SettingsModule {}