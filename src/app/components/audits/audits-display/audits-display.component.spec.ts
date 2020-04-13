import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsDisplayComponent } from './audits-display.component';

describe('AuditsDisplayComponent', () => {
  let component: AuditsDisplayComponent;
  let fixture: ComponentFixture<AuditsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditsDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
