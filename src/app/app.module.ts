import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const firebaseConfig = {
  apiKey: 'AIzaSyC2Qa9uZIjnTJBFYES4BPA5WRj2DMETdHs',
  authDomain: 'acme-explorer-e1ea6.firebaseapp.com',
  databaseURL: 'https://acme-explorer-e1ea6.firebaseio.com',
  projectId: 'acme-explorer-e1ea6',
  storageBucket: 'acme-explorer-e1ea6.appspot.com',
  messagingSenderId: '653865132618',
  appId: '1:653865132618:web:8c9edb6c13ef531f5f3cb3'
};

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    HeaderComponent,
    TranslatableComponent,
    RegisterComponent,
    LoginComponent
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
    AngularFireModule.initializeApp(firebaseConfig),
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
  providers: [AngularFireAuth],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
