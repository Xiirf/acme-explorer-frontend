import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDatatableComponent } from './trip-datatable.component';

describe('TripDatatableComponent', () => {
  let component: TripDatatableComponent;
  let fixture: ComponentFixture<TripDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripDatatableComponent ]
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
});
