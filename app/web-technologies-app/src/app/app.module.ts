import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LodgeIncidentComponent } from './components/lodge-incident/lodge-incident.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { routing } from './app.routing';
import { AuthGuard } from './auth.guard';

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
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3WcMmbKLsf8BVqZDhnj56Gxak1JsKGsg',
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        }
      }
    })
  ],
  providers: [AuthService, RequestService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
