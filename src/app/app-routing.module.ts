import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { RegisterComponent } from './components/security/register/register.component';
import { LoginComponent } from './components/security/login/login.component';
import { DeniedAccessComponent } from './components/security/denied-access/denied-access.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { TripDatatableComponent } from './components/trip/trip-datatable/trip-datatable.component';
import { ActorRoleGuard } from './guards/actor-role.guard';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';

const appRoutes: Routes = [
  { path: 'trips', children: [
    { path: '', component: TripListComponent },
    { path: 'manage', component: TripDatatableComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}}
  ]},
  { path: 'applications', children: [
    { path: '', component: ApplicationListComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}},
    { path: ':idApplication', component: ApplicationDisplayComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}}
  ]},
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'denied-access', component: DeniedAccessComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'dashboard', component: DashboardDisplayComponent,
    canActivate: [ActorRoleGuard], data: {expectedRole: 'Administrator'}},
  { path: '**', redirectTo: '/not-found' }
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
