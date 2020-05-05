import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from 'src/app/app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationListComponent } from './application-list.component';
import { ApplicationService } from 'src/app/services/application.service';
import { ApplicationServiceMock } from 'src/app/services/mocks/application.service.mock';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

describe('ApplicationListComponent', () => {
  let component: ApplicationListComponent;
  let fixture: ComponentFixture<ApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationListComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }}),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        ToastrModule.forRoot(),
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      providers: [ { provide: ApplicationService, useClass: ApplicationServiceMock } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have applications defined', async (done) => {
    fixture.whenStable().then(() => {
      expect(component.applications).toBeDefined();
      done();
    });
  });

  it('should have more than 10 applications', async (done) => {
    fixture.whenStable().then(() => {
      expect(component.applications.length).toBeGreaterThanOrEqual(10);
      done();
    });
  });
});
