import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateExperienceComponent } from './rate-experience.component';

describe('RateExperienceComponent', () => {
  let component: RateExperienceComponent;
  let fixture: ComponentFixture<RateExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
