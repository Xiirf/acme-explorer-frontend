import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { NotFoundPageComponent } from './components/shared/not-found-page/not-found-page.component';
import { MessageComponent } from './components/master/message/message.component';

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
    NotFoundPageComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
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
    ToastrModule.forRoot()
  ],
  providers: [AngularFireAuth, TripService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
