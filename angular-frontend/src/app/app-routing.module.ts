import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
/*  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },*/
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'reviewers',
    loadChildren: () =>
      import('./reviewers/reviewer.module').then((m) => m.ReviewerModule),
  },
  {
    path: 'proposals',
    loadChildren: () =>
      import('./proposal/proposal.module').then((m) => m.ProposalModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
