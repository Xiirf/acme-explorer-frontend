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

const appRoutes: Routes = [
  { path: 'trips', children: [
    { path: '', component: TripListComponent },
    { path: 'manage', component: TripDatatableComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Manager'}},
    { path: ':idTrip', component: TripDisplayComponent}
  ]},
  { path: 'sponsorships', children: [
    { path: '', component: SponsorshipListComponent,
      canActivate: [ActorRoleGuard], data: {expectedRole: 'Sponsor'}}
  ]},
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'denied-access', component: DeniedAccessComponent},
  { path: 'not-found', component: NotFoundPageComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent},
  { path: '**', redirectTo: '/not-found' },
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
