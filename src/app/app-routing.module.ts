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
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { AuditsListComponent } from './components/audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from './components/audits/audits-display/audits-display.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { TripComponent } from './components/trip/trip/trip.component';
import { UserDatatableComponent } from './components/user/user-datatable/user-datatable.component';
import { AuditsFormComponent } from './components/audits/audits-form/audits-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CanDeactivateGuard } from './guards/can-deactivate.service';
import { SponsorshipFormComponent } from './components/sponsorship/sponsorship-form/sponsorship-form.component';
import { ApplicationComponent } from './components/application/application/application.component';
import { ProfileComponent } from './components/security/profile/profile.component';
import { GlobalVariablesComponent } from './components/global-variables/global-variables.component';
import { FinderComponent } from './components/finder/finder.component';

const appRoutes: Routes = [
  { path: 'trips', children: [
    { path: '', component: TripListComponent },
    { path: 'manage', component: TripDatatableComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}},
    { path: 'create', component: TripComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}},
    { path: 'update/:idTrip', component: TripComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}},
    { path: ':idTrip', component: TripDisplayComponent}
  ]},
  { path: 'users', children: [
    { path: '', component: UserDatatableComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Administrator'}}
  ]},
  { path: 'sponsorships', children: [
    { path: '', component: SponsorshipListComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Sponsor'}},
    { path: 'create', component: SponsorshipFormComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Sponsor'}},
    { path: 'update/:idSponsorship', component: SponsorshipFormComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Sponsor'}},
  ]},
  { path: 'audits', children: [
    { path: '', component: AuditsListComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Auditor'}},
    { path: 'create', component: AuditsFormComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Auditor'}},
    { path: ':idAudit', component: AuditsDisplayComponent}
  ]},
  { path: 'applications', children: [
    { path: '', component: ApplicationListComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Explorer, Manager'}},
    { path: ':idApplication', component: ApplicationDisplayComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Explorer, Manager'}},
    { path: 'create/:idTrip', component: ApplicationComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Explorer'}},
    { path: 'update/:idApplication', component: ApplicationComponent, canDeactivate: [CanDeactivateGuard],
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Explorer, Manager'}}
  ]},
  {
    path: 'checkout', component: CheckoutComponent,
    canActivate: [ActorRoleGuard],
    data: { expectedRole: 'Explorer, Sponsor'}
  },
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'login', component: LoginComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'profile', component: ProfileComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'denied-access', component: DeniedAccessComponent },
  { path: 'not-found', component: NotFoundPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'finder', component: FinderComponent,
    canActivate: [ActorRoleGuard], data: {expectedRole: 'Explorer'}},
  { path: 'dashboard', component: DashboardDisplayComponent,
    canActivate: [ActorRoleGuard], data: {expectedRole: 'Administrator'}},
  { path: 'global-variables', component: GlobalVariablesComponent, canDeactivate: [CanDeactivateGuard],
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
