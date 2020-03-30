import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateLoader, TranslateStore,
          TranslateCompiler, TranslateParser, MissingTranslationHandler, TranslateModule } from '@ngx-translate/core';
import { AuthServiceMock } from 'src/app/services/mocks/auth.services.mock';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { environment } from 'src/environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        AngularFireModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        FormBuilder,
        AngularFireAuth,
        ToastrService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.example-form')).toBeTruthy();
  });
});
