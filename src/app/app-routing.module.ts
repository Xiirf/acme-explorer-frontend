import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { DeniedAccessComponent } from './components/security/denied-access/denied-access.component';

const appRoutes: Routes = [
  { path: 'tripList', component: TripListComponent },
  { path: '', redirectTo: '/tripList', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'denied-access', component: DeniedAccessComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
