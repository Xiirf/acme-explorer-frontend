import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDatatableComponent } from './trip-datatable.component';
import { TripServiceMock } from 'src/app/services/mocks/trip.service.mock';
import { TripService } from 'src/app/services/trip.service';
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

describe('TripDatatableComponent', () => {
  let component: TripDatatableComponent;
  let fixture: ComponentFixture<TripDatatableComponent>;

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
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        BrowserModule,
      ],
      providers: [ { provide: TripService, useClass: TripServiceMock } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have more/equal than 10 trips', (done) => {
    component.initialize()
      .then(() => {
        expect(component.trips.length).toBeGreaterThanOrEqual(10);
        done();
      });
  });
});
