import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripListComponent } from './trip-list.component';
import { TripService } from 'src/app/services/trip.service';
import { TripServiceMock } from 'src/app/services/mocks/trip.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TripDatatableComponent } from '../trip-datatable/trip-datatable.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TripListComponent', () => {
  let component: TripListComponent;
  let fixture: ComponentFixture<TripListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDatatableComponent ],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }}),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      providers: [ { provide: TripService, useClass: TripServiceMock } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trips should be defined', async (done) => {
    fixture.whenStable().then(() => {
      expect(component.trips).toBeDefined();
      done();
    });
  });

  it('trip should have more than 5 trips', async (done) => {
    fixture.whenStable().then(() => {
      expect(component.trips.length).toBeGreaterThanOrEqual(5);
      done();
    });
  });

  it('trip should have more than 10 trips', async (done) => {
    fixture.whenStable().then(() => {
      component.onScrollDown()
        .then(() => {
          expect(component.trips.length).toBeGreaterThanOrEqual(10);
          done();
        });
    });
  });
});
