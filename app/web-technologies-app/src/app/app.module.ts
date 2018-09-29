import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LodgeIncidentComponent } from './components/lodge-incident/lodge-incident.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LodgeIncidentComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
