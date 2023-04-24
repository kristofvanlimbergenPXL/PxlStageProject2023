import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NavToolbarComponent} from './navigation/nav-toolbar/nav-toolbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './material/material.module';
import {environment} from '../environments/environment';
import {SharedModule} from './shared/app.shared.module';
import {ToastrModule} from 'ngx-toastr';
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
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
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
