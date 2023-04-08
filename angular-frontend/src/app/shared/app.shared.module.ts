import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './confirm-dialog/dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ToastrModule } from 'ngx-toastr';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

//This module can be used to import modules that are shared troughout the application
//Ex. Material Components, Formmodules, ...

@NgModule({
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      progressBar: true,
      timeOut: 5000,
    }),
    DragDropModule,
  ],
  providers: [],
  declarations: [ConfirmDialogComponent],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    DragDropModule,
  ],
})
export class SharedModule {}
