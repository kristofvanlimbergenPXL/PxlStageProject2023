import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./employee/employee.module').then((m) => m.EmployeeModule),
  },

  {
    path: 'companies',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
  },

  {path: '', redirectTo: 'employees', pathMatch: 'full'},
  {path: '**', redirectTo: 'employees', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {
}
