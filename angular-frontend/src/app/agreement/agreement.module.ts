import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/app.shared.module';
import {AgreementFormComponent} from "./agreement-form/agreement-form.component";



const routes: Routes = [
  {path:'createAgreement',component:AgreementFormComponent},
];

@NgModule({
  declarations: [
    AgreementFormComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [
    AgreementFormComponent
  ],
})
export class AgreementModule {
}
