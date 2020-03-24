import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
      HttpClientTestingModule
    ],
    providers: [AuthService, AngularFireAuth],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  beforeEach(() => {
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
