import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDisplayComponent } from './trip-display.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { TripService } from 'src/app/services/trip.service';
import { TripServiceMock } from 'src/app/services/mocks/trip.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth.service';
import { AuthServiceMock } from 'src/app/services/mocks/auth.services.mock';

describe('TripDisplayComponent', () => {
  let component: TripDisplayComponent;
  let fixture: ComponentFixture<TripDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDisplayComponent ],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }),
        HttpClientTestingModule
      ],
      providers: [  { provide: TripService, useClass: TripServiceMock },
                    { provide: AuthService, useClass: AuthServiceMock } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trip should be defined', async (done) => {
    fixture.whenStable().then(() => {
      expect(component.trip).toBeDefined();
      done();
    });
  });

  it('array should be sort', () => {
    const arrayTest = [
      {
        label: 1, createdAt: new Date('04/22/2020')
      },
      {
        label: 2, createdAt:  new Date('04/14/2020')
      },
      {
        label: 3, createdAt:  new Date('04/20/2020')
      }
    ];
    arrayTest.sort(component.sortByDate);
    console.log(arrayTest);
    expect(arrayTest[0].label).toEqual(2);
    expect(arrayTest[1].label).toEqual(3);
    expect(arrayTest[2].label).toEqual(1);
  });

  it('test getStartComment', () => {
    const comment = 'Word1 Word2 Word3 Word4 Word5 Word6';
    const comment2 = 'Word1 Word2';
    expect(component.getStartComment(comment)).toEqual('Word1 Word2 Word3');
    expect(component.getStartComment(comment2)).toEqual('Word1 Word2');
  });
});
