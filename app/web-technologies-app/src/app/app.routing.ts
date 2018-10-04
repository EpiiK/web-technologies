import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { LodgeIncidentComponent } from './components/lodge-incident/lodge-incident.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { RegisterComponent } from './components/register/register.component';

const appRoutes: Routes = [
  { path: '', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'incident', component: LodgeIncidentComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(appRoutes);
