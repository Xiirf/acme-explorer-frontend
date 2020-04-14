import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { TripListComponent } from './components/trip/trip-list/trip-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslatableComponent } from './components/shared/translatable/translatable.component';
import { RegisterComponent } from './components/security/register/register.component';
import { HeaderComponent } from './components/master/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/security/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { TripService } from './services/trip.service';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/master/footer/footer.component';
import { LocalizedDatePipe } from './components/shared/localized-date.pipe';
import { LocalizedDecimalPipe } from './components/shared/localized-decimal.pipe';
import { DeniedAccessComponent } from './components/security/denied-access/denied-access.component';
import { TripDatatableComponent } from './components/trip/trip-datatable/trip-datatable.component';
import { TermsAndConditionsComponent } from './components/master/terms-and-conditions/terms-and-conditions.component';
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { MessageComponent } from './components/master/message/message.component';
import { TripDisplayComponent } from './components/trip/trip-display/trip-display.component';
import { SponsorshipListComponent } from './components/sponsorship/sponsorship-list/sponsorship-list.component';
import { AuditsListComponent } from './components/audits/audits-list/audits-list.component';
import { AuditsDisplayComponent } from './components/audits/audits-display/audits-display.component';
import { ApplicationListComponent } from './components/application/application-list/application-list.component';
import { DashboardDisplayComponent } from './components/dashboard/dashboard-display/dashboard-display.component';
import { ApplicationDisplayComponent } from './components/application/application-display/application-display.component';
import { ErrorInterceptor } from './services/interceptor/errorInterceptor';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeFr, 'fr');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    HeaderComponent,
    TranslatableComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    LocalizedDatePipe,
    LocalizedDecimalPipe,
    DeniedAccessComponent,
    TripDatatableComponent,
    TermsAndConditionsComponent,
    NotFoundPageComponent,
    MessageComponent,
    TripDisplayComponent,
    SponsorshipListComponent,
    AuditsListComponent,
    AuditsDisplayComponent,
    ApplicationListComponent,
    DashboardDisplayComponent,
    ApplicationDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTabsModule,
    MatExpansionModule,
    FontAwesomeModule,
    AppRoutingModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuth,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [AngularFireAuth,
              TripService,
              { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
