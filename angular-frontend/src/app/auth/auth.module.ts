import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/app.shared.module';

import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [],
})
export class AuthModule {}
