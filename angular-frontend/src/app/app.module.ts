import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from './navigation/nav-menu/nav-menu.component';
import { NavToolbarComponent } from './navigation/nav-toolbar/nav-toolbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material/material.module';

import { SettingsState } from './settings/settings.state';

import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth/auth.state';

import { environment } from '../environments/environment';
import { SharedModule } from './shared/app.shared.module';
import { AccountComponent } from './auth/account/account.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    NavToolbarComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutingModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule,
    NgxsModule.forRoot([AuthState, SettingsState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
